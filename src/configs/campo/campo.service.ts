import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Campo } from './campo.entity';
import { EntityManager, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CampoDTO } from './campo.dto';
import { HerramientaAnalisisCriticidad } from '../herramienta-analisis-criticidad/herrramienta-analisis-criticidad.entity';
import { UpdateCampoDTO } from './update-campo.dto';
import { ApiPaginatedResponse } from 'src/utils/api-response';
import { CampoSerializable } from './serializable/campo.serializable';

@Injectable()
export class CampoService {
  constructor(
    @InjectRepository(Campo) private campoRepository: Repository<Campo>,
  ) {}

  //Método para obtener todos los campos de la base de datos de acuerdo a los parámetros de búsqueda
  public async getAllCampos(
    nombre: String,
    importancia: number,
    idHerramienta: number,
  ): Promise<ApiPaginatedResponse<Campo[]>> {
    return {
      data: await this.campoRepository.find({
        where: {
          nombre: nombre ? Like(`%${nombre}%`) : nombre,
          nivelImportancia: importancia,
          herramientaAnalisisCriticidadId: idHerramienta,
        },
      }),
    };
  }

  // Metodo para crear un nuevo Campo
  public async createCampo(campoDTO: CampoDTO, entityManager?: EntityManager) {
    // si no existe un campo con el mismo nombre
    if (
      !(await this.getCampo(
        undefined,
        campoDTO.nombre,
        undefined,
        campoDTO.herramientaAnalisisCriticidad.id,
      ))
    ) {
      if (!entityManager)
        // No se trata de una llamada con una transacción heredada
        await this.campoRepository.manager.transaction(
          async (trasactionManager: EntityManager) => {
            // Se crea una trascaccion para este procedimiento
            await this.createCampoWithEntityManager(
              campoDTO,
              trasactionManager,
            );
          },
        );
      // se continua con la transacción heredada
      else await this.createCampoWithEntityManager(campoDTO, entityManager);
    } else
      throw new HttpException(
        'Ya existe un campo con ese nombre',
        HttpStatus.BAD_REQUEST,
      );
  }
  // Metodo auxiliar para crear un campo con la entityManager correspondiente
  private async createCampoWithEntityManager(
    campoDTO: CampoDTO,
    entityManager?: EntityManager,
  ) {
    const campo: Campo = new Campo(
      campoDTO.nombre,
      campoDTO.nivelImportancia,
      campoDTO.configVersion,
      campoDTO.herramientaAnalisisCriticidad instanceof
      HerramientaAnalisisCriticidad
        ? campoDTO.herramientaAnalisisCriticidad
        : new HerramientaAnalisisCriticidad(
            campoDTO.herramientaAnalisisCriticidad.id,
          ),
    ); // se crea el campo

    const campoInsertado: Campo = await entityManager.save(campo); // se almacena el campo en la base de datos
  }

  // Metodo para buscar un campo que pertenezca a una configuración con un nombre en especifico
  public async getCampo(
    idCampo: number,
    nombre?: String,
    configVersion?: number,
    idHerramientaAnalisisCriticidad?: number,
  ) {
    return await this.campoRepository.findOne({
      where: {
        id: idCampo,
        configVersion: configVersion,
        nombre: nombre,
        herramientaAnalisisCriticidadId: idHerramientaAnalisisCriticidad,
      },
    });
  }

  // Método para actualizar la información de un campo en específico
  public async updateCampo(idCampo: number, updateCampoDTO: UpdateCampoDTO) {
    // se obtiene el registro de campo a modificar
    const campoUpdate: Campo = await this.getCampo(idCampo);
    // se verifica si existe un campo ya con ese nombre
    const campoExistente: Campo = await this.getCampo(
      undefined,
      updateCampoDTO.nombre,
      undefined,
      campoUpdate.herramientaAnalisisCriticidadId,
    );
    // Si no existe un campo con el mismo nombre o si el encontrado es el mismo
    if (!campoExistente || campoExistente.id === idCampo) {
      // Se actualiza la información del campo
      campoUpdate.nombre = updateCampoDTO.nombre; // se actualiza el nombre del campo
      campoUpdate.nivelImportancia = updateCampoDTO.nivelImportancia; // se actualiza el nivel de importancia

      // Se actualizan los cambios de ese registro en la base de datos
      await this.campoRepository.save(campoUpdate);
    } else
      throw new HttpException(
        'Ya existe un campo con ese nombre',
        HttpStatus.BAD_REQUEST,
      );
  }

  // Método para eliminar un campo con una id en específico
  public async deleteCampo(idCampo: number) {
    await this.campoRepository.delete({ id: idCampo });
  }
}

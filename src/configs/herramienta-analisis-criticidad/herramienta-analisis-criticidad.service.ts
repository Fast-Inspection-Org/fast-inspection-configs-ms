import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HerramientaAnalisisCriticidad } from './herrramienta-analisis-criticidad.entity';
import { EntityManager, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HerramientaDTO } from '../herramientas/herramienta.dto';
import { Config } from '../config.entity';
import { CampoDTO } from '../campo/campo.dto';
import { CampoService } from '../campo/campo.service';
import { HerramientasService } from '../herramientas/herramientas.service';
import { UpdateHerramientaAnalisisCriticidadDTO } from './update-herramienta-analisis-criticidad.dto';
import { Campo } from '../campo/campo.entity';
import { ApiPaginatedResponse } from 'src/utils/api-response';

@Injectable()
export class HerramientaAnalisisCriticidadService {
  constructor(
    @InjectRepository(HerramientaAnalisisCriticidad)
    private herramientaAnalisisCriticidadRepository: Repository<HerramientaAnalisisCriticidad>,
    private campoService: CampoService,
    private herramientaService: HerramientasService,
  ) {}

  // Método para obtener una herramienta análisis criticidad
  public async getHerramientaAnalisisCriticdad(
    idHerramienta?: number,
    nombre?: string,
  ) {
    return await this.herramientaAnalisisCriticidadRepository.findOne({
      where: {
        id: idHerramienta,
        nombre: nombre,
      },
    });
  }

  // Metodo para crear una nueva herramienta Analisis de Criticidad
  public async createHerramientaAnalisisCriticidad(
    herramientaAnalisisCriticidadDTO: HerramientaDTO,
    entityManager?: EntityManager,
  ) {
    if (
      !(await this.herramientaService.getHerramienta(
        herramientaAnalisisCriticidadDTO.nombre,
        undefined,
        herramientaAnalisisCriticidadDTO.config.version,
      ))
    ) {
      // si no existe esa herrramienta en la base de datos

      if (!entityManager)
        // No se trata de una llamada con una transacción heredada
        await this.herramientaAnalisisCriticidadRepository.manager.transaction(
          async (trasactionManager: EntityManager) => {
            // se crea una transacción para este procedimiento
            await this.createHerramientaAnalisisCriticidadWithEntity(
              herramientaAnalisisCriticidadDTO,
              trasactionManager,
            );
          },
        );
      // se continua con la transacción heredada
      else
        await this.createHerramientaAnalisisCriticidadWithEntity(
          herramientaAnalisisCriticidadDTO,
          entityManager,
        );
    } // si existe en la base de datos
    else
      throw new HttpException(
        'Ya existe una herramienta con ese nombre en la base de datos',
        HttpStatus.BAD_REQUEST,
      );
  }

  // Metodo para obtener todas las herramientas de analisis de criticidad
  public async getAllHerrramientasAnalisisCriticidad(
    versionConfig?: number,
    nombre?: String,
  ): Promise<ApiPaginatedResponse<HerramientaAnalisisCriticidad[]>> {
    return {
      data: await this.herramientaAnalisisCriticidadRepository.find({
        where: {
          configVersion: versionConfig,
          nombre: nombre ? Like(`%${nombre}%`) : nombre,
        },
      }),
    };
  }

  // Metodo auxiliar para crear una herramienta analisis de criticidad con la entityManager correspondiente
  private async createHerramientaAnalisisCriticidadWithEntity(
    herramientaAnalisisCriticidadDTO: HerramientaDTO,
    entityManager: EntityManager,
  ) {
    const herramientaAnalisisCriticidad: HerramientaAnalisisCriticidad =
      new HerramientaAnalisisCriticidad(
        undefined,
        herramientaAnalisisCriticidadDTO.nombre,
        herramientaAnalisisCriticidadDTO.tipo,
        herramientaAnalisisCriticidadDTO.config instanceof Config
          ? herramientaAnalisisCriticidadDTO.config
          : new Config(herramientaAnalisisCriticidadDTO.config.version),
      ); // se obtiene una instancia de la herramienta entity para ser almacenada

    const herramientaAnalisisCriticidadInsertada: HerramientaAnalisisCriticidad =
      await entityManager.save(
        HerramientaAnalisisCriticidad,
        herramientaAnalisisCriticidad,
      ); // se alamacena la herramienta en la base de datos

    if (herramientaAnalisisCriticidadDTO.campos)
      await this.saveCamposHerramientaAnalisisCriticidad(
        herramientaAnalisisCriticidadDTO.campos,
        herramientaAnalisisCriticidadInsertada,
        entityManager,
      ); /* se inserta en la base de datos
         los campos como parte de esta herramienta*/
    //Ademas se utiliza await para que la transacción espere a que se realicen todas las operaciones en los demás servicios
  }

  // Metodo para insertar en la base de datos los campos de la herramienta analisis de criticidad
  private async saveCamposHerramientaAnalisisCriticidad(
    camposDTO: Array<CampoDTO>,
    herramientaAnalisisCriticidadInsertada: HerramientaAnalisisCriticidad,
    entityManager: EntityManager,
  ) {
    for (let index = 0; index < camposDTO.length; index++) {
      camposDTO[index].herramientaAnalisisCriticidad =
        herramientaAnalisisCriticidadInsertada; // se asigna al campo la herramienta a la cual pertenece
      camposDTO[index].configVersion =
        herramientaAnalisisCriticidadInsertada.configVersion; // se registra ademas la version de la configuración a la cual pertenece el campo
      await this.campoService.createCampo(camposDTO[index], entityManager); // se manda a crear el campo al servicio de campo
    }
  }

  // Método para modificar la información de una herramienta análisis de critcidad en específico
  public async updateHerramientaAnalisisCriticidad(
    idHerramienta: number,
    updateHerramientaAnalisisCriticidad: UpdateHerramientaAnalisisCriticidadDTO,
  ) {
    // se obtiene la herramienta análisis de criticidad a modificar
    const herramientaAnalisisCricidadModificar: HerramientaAnalisisCriticidad =
      await this.getHerramientaAnalisisCriticdad(idHerramienta);

    // se comprueba que no exista una herramienta con el mismo nombre
    const herramientaAnalisisCriticidad =
      await this.herramientaService.getHerramienta(
        updateHerramientaAnalisisCriticidad.nombre,
        undefined,
        herramientaAnalisisCricidadModificar.configVersion,
      );
console.log(herramientaAnalisisCriticidad)
console.log(idHerramienta)
    if (
      !herramientaAnalisisCriticidad ||
      herramientaAnalisisCriticidad.id === idHerramienta
    ) {
      await this.herramientaAnalisisCriticidadRepository.manager.transaction(
        async (trasactionManager: EntityManager) => {
          // se crea una transacción para este procedimiento
          herramientaAnalisisCricidadModificar.nombre =
            updateHerramientaAnalisisCriticidad.nombre; // se modifica el nombre de la herramienta análisis de criticidad
          await this.actualizarCamposHerramientaAnalisisCriticidad(
            herramientaAnalisisCricidadModificar,
            updateHerramientaAnalisisCriticidad.campos,
            trasactionManager,
          );
          await trasactionManager.save(herramientaAnalisisCricidadModificar); // se guarda la herramienta con los cambios
        },
      );
    } else
      throw new HttpException(
        'Ya existe una herramienta con ese nombre en la base de datos',
        HttpStatus.BAD_REQUEST,
      );
  }

  private async actualizarCamposHerramientaAnalisisCriticidad(
    herramientaAnalisisCriticidadUpdate: HerramientaAnalisisCriticidad,
    campos: Array<CampoDTO>,
    entityManager: EntityManager,
  ) {
    // Lo primero es eliminar todas las causas pertenecientes al tipo de deterioro análisis criticdad
    await this.campoService.deleteCampos(
      herramientaAnalisisCriticidadUpdate.id,
    );
    // Luego se insertan las nuevas causas del tipo de deterioro
    await this.saveCamposHerramientaAnalisisCriticidad(
      campos,
      herramientaAnalisisCriticidadUpdate,
      entityManager,
    );
  }

  // Método para obtener los Campos Afectados definidos en la Herramienta
  public async getCamposAfectados(
    idHerramienta: number,
  ): Promise<Array<Campo>> {
    // Se obtiene la herramienta analisis de criticidad
    const herramientaAnalisisCriticidad: HerramientaAnalisisCriticidad =
      await this.getHerramientaAnalisisCriticdad(idHerramienta);

    return await herramientaAnalisisCriticidad.campos;
  }
}

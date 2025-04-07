import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IndiceCalculableIntervalo } from './indice-calculable-intervalo.entity';
import { EntityManager, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from '../config.entity';
import { IndicadorIntervaloService } from '../indicador-intervalo/indicador-intervalo.service';
import { IndiceCalculableDTO } from '../indice-calculable/indice-calculable.dto';
import { IndicadorDTO } from '../indicador/indicador.dto';
import {
  Calculos,
  IndiceCalculable,
} from '../indice-calculable/indice-calculable.entity';
import { UpdateIndiceCalculableIntervaloDTO } from './update-indice-calculable-intervalo.dto';
import { IndiceCalculableService } from '../indice-calculable/indice-calculable.service';
import { ApiPaginatedResponse } from 'src/utils/api-response';

@Injectable()
export class IndiceCalculableIntervaloService {
  constructor(
    @InjectRepository(IndiceCalculableIntervalo)
    private indiceCalculableIntervalorRepository: Repository<IndiceCalculableIntervalo>,
    private indicadorIntervaloService: IndicadorIntervaloService,
    private indiceCalculableService: IndiceCalculableService,
  ) {}

  public async getAllIndicesCalculablesIntervalos(
    nombre?: String,
    calculo?: Calculos,
    versionConfig?: number,
  ): Promise<ApiPaginatedResponse<IndiceCalculableIntervalo[]>> {
    return {
      data: await this.indiceCalculableIntervalorRepository.find({
        where: {
          nombre: nombre ? Like(`%${nombre}%`) : nombre,
          calculo: calculo,
          configVersion: versionConfig,
        },
      }),
    };
  }

  public async getIndiceCalculableIntervalos(
    idIndiceCalculable: number,
    nombre?: String,
    calculo?: Calculos,
    versionConfig?: number,
  ) {
    return await this.indiceCalculableIntervalorRepository.findOne({
      where: {
        id: idIndiceCalculable,
        nombre: nombre,
        calculo: calculo,
        configVersion: versionConfig,
      },
    });
  }

  // Método para obtener un indice calculable  intervalo con todas sus relaciones
  public async getIndiceCalculableIntervaloWithRelations(
    idIndiceCalculable: number,
  ) {
    // se obtiene el indice deseado de la base de datos del servidor
    const indiceCalculableIntervalo: IndiceCalculableIntervalo =
      await this.indiceCalculableIntervalorRepository.findOne({
        where: {
          id: idIndiceCalculable,
        },
      });
    // si fue encontrado el indice calculable
    if (indiceCalculableIntervalo)
      return {
        id: indiceCalculableIntervalo.id,
        nombre: indiceCalculableIntervalo.nombre,
        calculo: indiceCalculableIntervalo.calculo,
        tipo: indiceCalculableIntervalo.tipo,
        indicadoresIntervalos:
          await indiceCalculableIntervalo.indicadoresIntervalos,
      };
    else
      throw new HttpException(
        'No fue encontrado el indice caclculable',
        HttpStatus.BAD_REQUEST,
      );
  }

  public async createIndiceCalculableIntervalo(
    indiceCalculableIntervaloDTO: IndiceCalculableDTO,
    entityManager?: EntityManager,
  ) {
    // se comprueba que no existe un indice calculable con el mismo nombre y calculo
    // si no existe un indice calculable que tenga el mismo nombre y si no existe un indice calculable con el mismo calculo
    if (
      !(await this.indiceCalculableService.getIndiceCalculable(
        undefined,
        indiceCalculableIntervaloDTO.nombre,
        undefined,
        indiceCalculableIntervaloDTO.config.version,
      ))
    ) {
      if (
        !(await this.indiceCalculableService.getIndiceCalculable(
          undefined,
          undefined,
          indiceCalculableIntervaloDTO.calculo,
          indiceCalculableIntervaloDTO.config.version,
        ))
      ) {
        if (!entityManager)
          // No se trata de una llamada con una transacción heredada
          await this.indiceCalculableIntervalorRepository.manager.transaction(
            async (trasactionManager: EntityManager) => {
              // se crea una transacción para este procedimiento
              await this.createIndiceCalculableIntervaloWithEntity(
                indiceCalculableIntervaloDTO,
                trasactionManager,
              );
            },
          );
        // se continua con la transacción heredada
        else
          await this.createIndiceCalculableIntervaloWithEntity(
            indiceCalculableIntervaloDTO,
            entityManager,
          );
      } // si existe un índice calculable con el mismo calculo
      else
        throw new HttpException(
          'Ya existe un índice calculable con el mismo cálculo',
          HttpStatus.BAD_REQUEST,
        );
    } // si existe un indice calculable con el mismo nombre
    else
      throw new HttpException(
        'Ya existe un índice calculable con el mismo nombre',
        HttpStatus.BAD_REQUEST,
      );
  }

  private async createIndiceCalculableIntervaloWithEntity(
    indiceCalculableIntervaloDTO: IndiceCalculableDTO,
    entityManager: EntityManager,
  ) {
    const indiceCalculableIntervalo: IndiceCalculableIntervalo =
      new IndiceCalculableIntervalo(
        undefined,
        indiceCalculableIntervaloDTO.nombre,
        indiceCalculableIntervaloDTO.config instanceof Config
          ? indiceCalculableIntervaloDTO.config
          : new Config(indiceCalculableIntervaloDTO.config.version),
        indiceCalculableIntervaloDTO.tipo,
        indiceCalculableIntervaloDTO.calculo,
      ); // Se crea el indice para ser añadido

    const indiceCalculableIntervaloInsertado: IndiceCalculableIntervalo =
      await entityManager.save(indiceCalculableIntervalo); // se inserta el indice en la base de datos y se obtiene la instancia insertada

    if (indiceCalculableIntervaloDTO.indicadoresIntervalos)
      await this.saveIndicadoresIntervalosByIndiceCalculableIntervalo(
        indiceCalculableIntervaloDTO.indicadoresIntervalos,
        indiceCalculableIntervaloInsertado,
        entityManager,
      );
  }

  private async saveIndicadoresIntervalosByIndiceCalculableIntervalo(
    indicadoresIntervalosDTO: Array<IndicadorDTO>,
    indiceCalculableIntervaloInsertado: IndiceCalculableIntervalo,
    entityManager: EntityManager,
  ) {
    for (let index = 0; index < indicadoresIntervalosDTO.length; index++) {
      indicadoresIntervalosDTO[index].indiceCalculableIntervalo =
        indiceCalculableIntervaloInsertado; // se le asigna el indice calculable insertado al indicador
      await this.indicadorIntervaloService.createIndicadorIntervalo(
        indicadoresIntervalosDTO[index],
        entityManager,
      ); // se manda a crear al servicio el indicador
    }
  }

  public async updateIndiceCalculableIntervalos(
    idIndiceCalculableIntervalo: number,
    updateIndiceCalculableIntervaloDTO: UpdateIndiceCalculableIntervaloDTO,
  ) {
    // se busca el indice calculable por intervalos a modificar

    const indiceCalculableIntervaloUpdate: IndiceCalculableIntervalo =
      await this.getIndiceCalculableIntervalos(idIndiceCalculableIntervalo);
    // se busca un indice calculable que posea el mismo nombre
    const indiceCalculableIntervalo: IndiceCalculable =
      await this.indiceCalculableService.getIndiceCalculable(
        undefined,
        updateIndiceCalculableIntervaloDTO.nombre,
        undefined,
        indiceCalculableIntervaloUpdate.configVersion,
      );

    // Si no existe un indice calculable intervalo con el mismo nombre o si el encontrado es el mismo
    if (
      !indiceCalculableIntervalo ||
      indiceCalculableIntervalo.id === idIndiceCalculableIntervalo
    ) {
      // se verifica que no exista un indice calculable con el mismo calculo
      const indiceCalculableCalculo: IndiceCalculable =
        await this.indiceCalculableService.getIndiceCalculable(
          undefined,
          undefined,
          updateIndiceCalculableIntervaloDTO.calculo,
          indiceCalculableIntervaloUpdate.configVersion,
        );
      // Si no existe un indice calculable intervalo con el mismo calculo o si el encontrado es el mismo
      if (
        !indiceCalculableCalculo ||
        indiceCalculableCalculo.id === idIndiceCalculableIntervalo
      ) {
        await this.indiceCalculableIntervalorRepository.manager.transaction(
          async (transactionManager: EntityManager) => {
            // se actualiza la información de los atributos del indice calculable
            indiceCalculableIntervaloUpdate.nombre =
              updateIndiceCalculableIntervaloDTO.nombre; // se actualiza el nombre
            indiceCalculableIntervaloUpdate.calculo =
              updateIndiceCalculableIntervaloDTO.calculo; // se actualiza el calculo
            // se actualiza la información de los indicadores intervalo del indice calculable por intervalos
            await this.actualizarIndicadoresIntervalo(
              indiceCalculableIntervaloUpdate,
              updateIndiceCalculableIntervaloDTO.indicadoresIntervalos,
              transactionManager,
            );

            // se actualizan los cambios en la base de datos
            await transactionManager.save(indiceCalculableIntervaloUpdate);
          },
        );
      } // si existe un índice calculable con el mismo calculo
      else
        throw new HttpException(
          'Ya existe un índice calculable con el mismo cálculo',
          HttpStatus.BAD_REQUEST,
        );
    } // si existe un indice calculable con el mismo nombre
    else
      throw new HttpException(
        'Ya existe un índice calculable con el mismo nombre',
        HttpStatus.BAD_REQUEST,
      );
  }

  // Método para actualizar la información de los indicadores intervalos
  private async actualizarIndicadoresIntervalo(
    indiceCalculableIntervaloUpdate: IndiceCalculableIntervalo,
    indicadoresIntervalo: Array<IndicadorDTO>,
    entityManager: EntityManager,
  ) {
    // Lo primero es eliminar todos los indicadores pertenecientes al indice calculable
    await this.indicadorIntervaloService.deleteIndicadores(
      undefined,
      indiceCalculableIntervaloUpdate.id,
      entityManager,
    );

    // Luego se insertan los nuevos indicadores del indice calculable
    await this.saveIndicadoresIntervalosByIndiceCalculableIntervalo(
      indicadoresIntervalo,
      indiceCalculableIntervaloUpdate,
      entityManager,
    );
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityManager, Like, Repository } from 'typeorm';
import { IndiceCalculableSinIntervalo } from './indice-calculable-sin-intervalo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from '../config.entity';
import { IndicadorSinIntervaloService } from '../indicador-sin-intervalo/indicador-sin-intervalo.service';
import { IndiceCalculableDTO } from '../indice-calculable/indice-calculable.dto';
import { IndicadorDTO } from '../indicador/indicador.dto';
import {
  Calculos,
  IndiceCalculable,
  TipoIndiceCalculable,
} from '../indice-calculable/indice-calculable.entity';
import { UpdateIndiceCalculableSinIntervaloDTO } from './update-indice-calculable-sin-intervalo.dto';
import { IndiceCalculableIntervalo } from '../indice-calculable-intervalo/indice-calculable-intervalo.entity';
import { IndiceCalculableService } from '../indice-calculable/indice-calculable.service';
import { ApiPaginatedResponse } from 'src/utils/api-response';

@Injectable()
export class IndiceCalculableSinIntervaloService {
  constructor(
    @InjectRepository(IndiceCalculableSinIntervalo)
    private indiceCalculableSinIntervaloRepository: Repository<IndiceCalculableSinIntervalo>,
    private indicadorSinIntervaloService: IndicadorSinIntervaloService,
    private indiceCalculableService: IndiceCalculableService,
  ) {}

  public async getAllIndicesCalculablesSinIntervalos(
    nombre?: String,
    calculo?: Calculos,
    versionConfig?: number,
  ): Promise<ApiPaginatedResponse<IndiceCalculableSinIntervalo[]>> {
    return {
      data: await this.indiceCalculableSinIntervaloRepository.find({
        where: {
          nombre: nombre ? Like(`%${nombre}%`) : nombre,
          calculo: calculo,
          configVersion: versionConfig,
        },
      }),
    };
  }

  // Método para buscar a un indice calculable sin intervalo que cumpla con cierta restrcciones
  public async getIndiceCalculableSinIntervalo(
    idIndiceCalculable?: number,
    nombre?: String,
    calculo?: Calculos,
    versionConfig?: number,
  ) {
    return await this.indiceCalculableSinIntervaloRepository.findOne({
      where: {
        id: idIndiceCalculable,
        nombre: nombre,
        calculo: calculo,
        configVersion: versionConfig,
      },
    });
  }

  // Método para obtener un indice calculable sin intervalo con todas sus relaciones
  public async getIndiceCalculableSinIntervaloWithRelations(
    idIndiceCalculable: number,
  ) {
    // se obtiene el indice deseado de la base de datos del servidor
    const indiceCalculableSinIntervalo: IndiceCalculableSinIntervalo =
      await this.indiceCalculableSinIntervaloRepository.findOne({
        where: {
          id: idIndiceCalculable,
        },
      });

    // Si fue encontrado el indice calculable
    if (indiceCalculableSinIntervalo)
      return {
        id: indiceCalculableSinIntervalo.id,
        nombre: indiceCalculableSinIntervalo.nombre,
        calculo: indiceCalculableSinIntervalo.calculo,
        tipo: indiceCalculableSinIntervalo.tipo,
        indicadoresSinIntervalos:
          await indiceCalculableSinIntervalo.indicadoresSinIntervalos,
      };
    else
      throw new HttpException(
        'No fue encontrado el indice calculable',
        HttpStatus.BAD_REQUEST,
      );
  }

  public async createIndiceCalculableSinIntervalo(
    indiceCalculableSinIntervaloDTO: IndiceCalculableDTO,
    entityManager?: EntityManager,
  ) {
    // se comprueba que no existe un indice calculable con el mismo nombre y calculo
    // si no existe un indice calculable que tenga el mismo nombre y si no existe un indice calculable con el mismo calculo
    if (
      !(await this.indiceCalculableService.getIndiceCalculable(
        undefined,
        indiceCalculableSinIntervaloDTO.nombre,
        undefined,
        indiceCalculableSinIntervaloDTO.config.version,
      ))
    ) {
      if (
        !(await this.indiceCalculableService.getIndiceCalculable(
          undefined,
          undefined,
          indiceCalculableSinIntervaloDTO.calculo,
          indiceCalculableSinIntervaloDTO.config.version,
        ))
      ) {
        if (!entityManager)
          // No se trata de una llamada con una transacción heredada
          await this.indiceCalculableSinIntervaloRepository.manager.transaction(
            async (trasactionManager: EntityManager) => {
              // se crea una transacción para este procedimiento
              await this.createIndiceCalculableSinIntervaloWithEntity(
                indiceCalculableSinIntervaloDTO,
                trasactionManager,
              );
            },
          );
        // se continua con la transacción heredada
        else
          await this.createIndiceCalculableSinIntervaloWithEntity(
            indiceCalculableSinIntervaloDTO,
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

  private async createIndiceCalculableSinIntervaloWithEntity(
    indiceCalculableSinIntervaloDTO: IndiceCalculableDTO,
    entityManager: EntityManager,
  ) {
    const indiceCalculableSinIntervalo: IndiceCalculableSinIntervalo =
      new IndiceCalculableSinIntervalo(
        undefined,
        indiceCalculableSinIntervaloDTO.nombre,
        indiceCalculableSinIntervaloDTO.config instanceof Config
          ? indiceCalculableSinIntervaloDTO.config
          : new Config(indiceCalculableSinIntervaloDTO.config.version),
        TipoIndiceCalculable.IndiceCalcuableSinIntervalo,
        indiceCalculableSinIntervaloDTO.calculo,
      ); // Se crea el indice para ser añadido

    const indiceCalculableSinIntervaloInsertado: IndiceCalculableSinIntervalo =
      await entityManager.save(indiceCalculableSinIntervalo); // se inserta el indice en la base de datos y se obtiene la instancia insertada

    if (indiceCalculableSinIntervaloDTO.indicadoresSinIntervalos)
      await this.saveIndicadoresSinIntervalosByIndiceCalculableIntervalo(
        indiceCalculableSinIntervaloDTO.indicadoresSinIntervalos,
        indiceCalculableSinIntervaloInsertado,
        entityManager,
      ); // se inserta todos los indicadores sin intervalos pertenecientes al indiceCalculable
  }

  // Metodo para insertar todos los indicadores sin intervalos pertenecientes al indiceCalculable
  private async saveIndicadoresSinIntervalosByIndiceCalculableIntervalo(
    indicadoresSinIntervalosDTO: Array<IndicadorDTO>,
    indiceCalculableSinIntervaloInsertado: IndiceCalculableSinIntervalo,
    entityManager: EntityManager,
  ) {
    for (let index = 0; index < indicadoresSinIntervalosDTO.length; index++) {
      indicadoresSinIntervalosDTO[index].indiceCalculableSinIntervalo =
        indiceCalculableSinIntervaloInsertado; // se le asigna el indice calculable insertado al indicador
      await this.indicadorSinIntervaloService.createIndicadorSinIntervalo(
        indicadoresSinIntervalosDTO[index],
        entityManager,
      ); // se manda a crear al servicio el indicador
    }
  }

  // Método para actualizar la información de un indice calculable sin intervalo
  public async updateIndiceCalculableSinIntervalos(
    idIndiceCalculableSinIntervalo: number,
    updateIndiceCalculableSinIntervaloDTO: UpdateIndiceCalculableSinIntervaloDTO,
  ) {
    // se busca el indice calculable sin intervalos a modificar
    const indiceCalculableSinIntervaloUpdate: IndiceCalculableSinIntervalo =
      await this.getIndiceCalculableSinIntervalo(
        idIndiceCalculableSinIntervalo,
      );
    // se busca un indice calculable que posea el mismo nombre
    const indiceCalculableSinIntervalo: IndiceCalculable =
      await this.indiceCalculableService.getIndiceCalculable(
        undefined,
        updateIndiceCalculableSinIntervaloDTO.nombre,
        undefined,
        indiceCalculableSinIntervaloUpdate.configVersion,
      );

    // Si no existe un indice calculable sin intervalo con el mismo nombre o si el encontrado es el mismo
    if (
      !indiceCalculableSinIntervalo ||
      indiceCalculableSinIntervalo.id === idIndiceCalculableSinIntervalo
    ) {
      const indiceCalculableCalculo: IndiceCalculable =
        await this.indiceCalculableService.getIndiceCalculable(
          undefined,
          undefined,
          updateIndiceCalculableSinIntervaloDTO.calculo,
          indiceCalculableSinIntervaloUpdate.configVersion,
        );
      // Si no existe un indice calculable intervalo con el mismo calculo o si el encontrado es el mismo
      if (
        !indiceCalculableCalculo ||
        indiceCalculableCalculo.id === idIndiceCalculableSinIntervalo
      ) {
        await this.indiceCalculableSinIntervaloRepository.manager.transaction(
          async (transactionManager: EntityManager) => {
            // se actualiza la información de los atributos del indice calculable
            indiceCalculableSinIntervaloUpdate.nombre =
              updateIndiceCalculableSinIntervaloDTO.nombre; // se actualiza el nombre
            indiceCalculableSinIntervaloUpdate.calculo =
              updateIndiceCalculableSinIntervaloDTO.calculo; // se actualiza el calculo
            // se actualiza la información de los indicadores sin intervalo del indice calculable sin intervalos
            await this.actualizarIndicadoresSinIntervalo(
              indiceCalculableSinIntervaloUpdate,
              updateIndiceCalculableSinIntervaloDTO.indicadoresSinIntervalo,
              transactionManager,
            );

            // se actualizan los cambios en la base de datos
            await transactionManager.save(indiceCalculableSinIntervaloUpdate);
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

  // Método para actualizar la información de los indicadores sin intervalos
  private async actualizarIndicadoresSinIntervalo(
    indiceCalculableSinIntervaloUpdate: IndiceCalculableSinIntervalo,
    indicadoresSinIntervalo: Array<IndicadorDTO>,
    entityManager: EntityManager,
  ) {
    // Lo primero es eliminar todos los indicadores pertenecientes al indice calculable
    await this.indicadorSinIntervaloService.deleteIndicadores(
      undefined,
      indiceCalculableSinIntervaloUpdate.id,
      entityManager,
    );

    // Luego se insertan los nuevos indicadores del indice calculable
    await this.saveIndicadoresSinIntervalosByIndiceCalculableIntervalo(
      indicadoresSinIntervalo,
      indiceCalculableSinIntervaloUpdate,
      entityManager,
    );
  }
}

import { Injectable } from '@nestjs/common';
import { EntityManager, Like, Repository } from 'typeorm';
import { IndiceCalculableSinIntervalo } from './indice-calculable-sin-intervalo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from '../config.entity';
import { IndicadorSinIntervaloService } from '../indicador-sin-intervalo/indicador-sin-intervalo.service';
import { IndiceCalculableDTO } from '../indice-calculable/indice-calculable.dto';
import { IndicadorDTO } from '../indicador/indicador.dto';
import { Calculos } from '../indice-calculable/indice-calculable.entity';

@Injectable()
export class IndiceCalculableSinIntervaloService {

    constructor(@InjectRepository(IndiceCalculableSinIntervalo) private indiceCalculableSinIntervaloRepository: Repository<IndiceCalculableSinIntervalo>,
        private indicadorSinIntervaloService: IndicadorSinIntervaloService) { }

    public async getAllIndicesCalculablesSinIntervalos(nombre?: String, calculo?: Calculos, versionConfig?: number) {
        return await this.indiceCalculableSinIntervaloRepository.find({
            where: {
                nombre: nombre ? Like(`%${nombre}%`) : nombre,
                calculo: calculo,
                configVersion: versionConfig
            }
        })
    }

    public async createIndiceCalculableSinIntervalo(indiceCalculableSinIntervaloDTO: IndiceCalculableDTO, entityManager?: EntityManager) {
        if (!entityManager) // No se trata de una llamada con una transacción heredada
            await this.indiceCalculableSinIntervaloRepository.manager.transaction(async (trasactionManager: EntityManager) => { // se crea una transacción para este procedimiento
                await this.createIndiceCalculableSinIntervaloWithEntity(indiceCalculableSinIntervaloDTO, trasactionManager)
            })
        else // se continua con la transacción heredada
            await this.createIndiceCalculableSinIntervaloWithEntity(indiceCalculableSinIntervaloDTO, entityManager)
    }

    private async createIndiceCalculableSinIntervaloWithEntity(indiceCalculableSinIntervaloDTO: IndiceCalculableDTO, entityManager: EntityManager) {
        const indiceCalculableSinIntervalo: IndiceCalculableSinIntervalo = new IndiceCalculableSinIntervalo(undefined, indiceCalculableSinIntervaloDTO.nombre,
            indiceCalculableSinIntervaloDTO.config instanceof Config ? indiceCalculableSinIntervaloDTO.config : new Config(indiceCalculableSinIntervaloDTO.config.version),
            indiceCalculableSinIntervaloDTO.tipo, indiceCalculableSinIntervaloDTO.calculo) // Se crea el indice para ser añadido

        const indiceCalculableSinIntervaloInsertado: IndiceCalculableSinIntervalo = await entityManager.save(indiceCalculableSinIntervalo) // se inserta el indice en la base de datos y se obtiene la instancia insertada

        if (indiceCalculableSinIntervaloDTO.indicadoresSinIntervalos)
            await this.saveIndicadoresSinIntervalosByIndiceCalculableIntervalo(indiceCalculableSinIntervaloDTO.indicadoresSinIntervalos, indiceCalculableSinIntervaloInsertado, entityManager) // se inserta todos los indicadores sin intervalos pertenecientes al indiceCalculable
    }

    // Metodo para insertar todos los indicadores sin intervalos pertenecientes al indiceCalculable
    private async saveIndicadoresSinIntervalosByIndiceCalculableIntervalo(indicadoresSinIntervalosDTO: Array<IndicadorDTO>,
        indiceCalculableSinIntervaloInsertado: IndiceCalculableSinIntervalo, entityManager: EntityManager) {
        for (let index = 0; index < indicadoresSinIntervalosDTO.length; index++) {
            indicadoresSinIntervalosDTO[index].indiceCalculableSinIntervalo = indiceCalculableSinIntervaloInsertado // se le asigna el indice calculable insertado al indicador
            await this.indicadorSinIntervaloService.createIndicadorSinIntervalo(indicadoresSinIntervalosDTO[index], entityManager) // se manda a crear al servicio el indicador
        }
    }

}

import { Injectable } from '@nestjs/common';
import { IndiceCalculableIntervalo } from './indice-calculable-intervalo.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IndiceCalculableIntervaloDTO } from './indice-calculable-intervalo.dto';
import { Config } from '../config.entity';
import { IndicadorIntervaloDTO } from '../indicador-intervalo/indicador-intervalo.dto';
import { IndicadorIntervaloService } from '../indicador-intervalo/indicador-intervalo.service';

@Injectable()
export class IndiceCalculableIntervaloService {

    constructor(@InjectRepository(IndiceCalculableIntervalo) private indiceCalculableIntervalorRepository: Repository<IndiceCalculableIntervalo>,
        private indicadorIntervaloService: IndicadorIntervaloService) { }

    public async createIndiceCalculableIntervalo(indiceCalculableIntervaloDTO: IndiceCalculableIntervaloDTO, entityManager?: EntityManager) {
        if (!entityManager) // No se trata de una llamada con una transacción heredada
            await this.indiceCalculableIntervalorRepository.manager.transaction(async (trasactionManager: EntityManager) => { // se crea una transacción para este procedimiento
                await this.createIndiceCalculableIntervaloWithEntity(indiceCalculableIntervaloDTO, trasactionManager)
            })
        else // se continua con la transacción heredada
            await this.createIndiceCalculableIntervaloWithEntity(indiceCalculableIntervaloDTO, entityManager)
    }

    private async createIndiceCalculableIntervaloWithEntity(indiceCalculableIntervaloDTO: IndiceCalculableIntervaloDTO, entityManager: EntityManager) {
        const indiceCalculableIntervalo: IndiceCalculableIntervalo = new IndiceCalculableIntervalo(indiceCalculableIntervaloDTO.nombre,
            indiceCalculableIntervaloDTO.config instanceof Config ? indiceCalculableIntervaloDTO.config : undefined) // Se crea el indice para ser añadido

        const indiceCalculableIntervaloInsertado: IndiceCalculableIntervalo = await entityManager.save(indiceCalculableIntervalo) // se inserta el indice en la base de datos y se obtiene la instancia insertada

        if (indiceCalculableIntervaloDTO.indicadoresIntervalos)
            await this.saveIndicadoresIntervalosByIndiceCalculableIntervalo(indiceCalculableIntervaloDTO.indicadoresIntervalos, indiceCalculableIntervaloInsertado, entityManager)
    }


    private async saveIndicadoresIntervalosByIndiceCalculableIntervalo(indicadoresIntervalosDTO: Array<IndicadorIntervaloDTO>,
        indiceCalculableIntervaloInsertado: IndiceCalculableIntervalo, entityManager: EntityManager) {
        for (let index = 0; index < indicadoresIntervalosDTO.length; index++) {
            indicadoresIntervalosDTO[index].indiceCalculableIntervalo = indiceCalculableIntervaloInsertado // se le asigna el indice calculable insertado al indicador
            await this.indicadorIntervaloService.createIndicadorIntervalo(indicadoresIntervalosDTO[index], entityManager) // se manda a crear al servicio el indicador
        }
    }
}

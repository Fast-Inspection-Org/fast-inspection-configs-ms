import { Injectable } from '@nestjs/common';
import { IndiceCalculableIntervalo } from './indice-calculable-intervalo.entity';
import { EntityManager, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from '../config.entity';
import { IndicadorIntervaloService } from '../indicador-intervalo/indicador-intervalo.service';
import { IndiceCalculableDTO } from '../indice-calculable/indice-calculable.dto';
import { IndicadorDTO } from '../indicador/indicador.dto';
import { Calculos } from '../indice-calculable/indice-calculable.entity';

@Injectable()
export class IndiceCalculableIntervaloService {

    constructor(@InjectRepository(IndiceCalculableIntervalo) private indiceCalculableIntervalorRepository: Repository<IndiceCalculableIntervalo>,
        private indicadorIntervaloService: IndicadorIntervaloService) { }


    public async getAllIndicesCalculablesIntervalos(nombre?: String, calculo?: Calculos, versionConfig?: number) {
        return await this.indiceCalculableIntervalorRepository.find({
            where: {
                nombre: nombre ? Like(`%${nombre}%`) : nombre,
                calculo: calculo,
                configVersion: versionConfig
            }
        })
    }

    public async getIndiceCalculableIntervalos(idIndiceCalculable: number, nombre?: String, calculo?: Calculos, versionConfig?: number) {
        return await this.indiceCalculableIntervalorRepository.findOne({
            where: {
                id: idIndiceCalculable,
                nombre: nombre,
                calculo: calculo,
                configVersion: versionConfig
            }
        })
    }

    public async createIndiceCalculableIntervalo(indiceCalculableIntervaloDTO: IndiceCalculableDTO, entityManager?: EntityManager) {
        if (!entityManager) // No se trata de una llamada con una transacción heredada
            await this.indiceCalculableIntervalorRepository.manager.transaction(async (trasactionManager: EntityManager) => { // se crea una transacción para este procedimiento
                await this.createIndiceCalculableIntervaloWithEntity(indiceCalculableIntervaloDTO, trasactionManager)
            })
        else // se continua con la transacción heredada
            await this.createIndiceCalculableIntervaloWithEntity(indiceCalculableIntervaloDTO, entityManager)
    }

    private async createIndiceCalculableIntervaloWithEntity(indiceCalculableIntervaloDTO: IndiceCalculableDTO, entityManager: EntityManager) {
        const indiceCalculableIntervalo: IndiceCalculableIntervalo = new IndiceCalculableIntervalo(undefined, indiceCalculableIntervaloDTO.nombre,
            indiceCalculableIntervaloDTO.config instanceof Config ? indiceCalculableIntervaloDTO.config : new Config(indiceCalculableIntervaloDTO.config.version),
            indiceCalculableIntervaloDTO.tipo, indiceCalculableIntervaloDTO.calculo) // Se crea el indice para ser añadido

        const indiceCalculableIntervaloInsertado: IndiceCalculableIntervalo = await entityManager.save(indiceCalculableIntervalo) // se inserta el indice en la base de datos y se obtiene la instancia insertada

        if (indiceCalculableIntervaloDTO.indicadoresIntervalos)
            await this.saveIndicadoresIntervalosByIndiceCalculableIntervalo(indiceCalculableIntervaloDTO.indicadoresIntervalos, indiceCalculableIntervaloInsertado, entityManager)
    }


    private async saveIndicadoresIntervalosByIndiceCalculableIntervalo(indicadoresIntervalosDTO: Array<IndicadorDTO>,
        indiceCalculableIntervaloInsertado: IndiceCalculableIntervalo, entityManager: EntityManager) {
        for (let index = 0; index < indicadoresIntervalosDTO.length; index++) {
            indicadoresIntervalosDTO[index].indiceCalculableIntervalo = indiceCalculableIntervaloInsertado // se le asigna el indice calculable insertado al indicador
            await this.indicadorIntervaloService.createIndicadorIntervalo(indicadoresIntervalosDTO[index], entityManager) // se manda a crear al servicio el indicador
        }
    }

    public async updateIndiceCalculableIntervalos () {

    }
}

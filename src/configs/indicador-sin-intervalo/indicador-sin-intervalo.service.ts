import { Injectable } from '@nestjs/common';
import { IndicadorSinIntervalo } from './indicador-sin-intervalo.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IndiceCalculableSinIntervalo } from '../indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.entity';
import { IndicadorDTO } from '../indicador/indicador.dto';
import { TipoIndicador } from '../indicador/indicador.entity';

@Injectable()
export class IndicadorSinIntervaloService {

    constructor(@InjectRepository(IndicadorSinIntervalo) private indicadorSinIntervaloRepository: Repository<IndicadorSinIntervalo>) { }

    public async createIndicadorSinIntervalo(indicadorSinIntervaloDTO: IndicadorDTO, entityManager?: EntityManager) {
        if (!entityManager) // No se trata de una llamada con una transacción heredada
            await this.indicadorSinIntervaloRepository.manager.transaction(async (trasactionManager: EntityManager) => { // se crea una transacción para este procedimiento
                await this.createIndicadorSinIntervaloWithEntity(indicadorSinIntervaloDTO, trasactionManager)
            })
        else // se continua con la transacción heredada
            await this.createIndicadorSinIntervaloWithEntity(indicadorSinIntervaloDTO, entityManager)
    }

    public async createIndicadorSinIntervaloWithEntity(indicadorSinIntervaloDTO: IndicadorDTO, entityManager: EntityManager) {
        const indicadorSinIntervalo: IndicadorSinIntervalo = new IndicadorSinIntervalo(undefined, indicadorSinIntervaloDTO.nombre, indicadorSinIntervaloDTO.valor, TipoIndicador.IndicadorSinIntervalo,
            indicadorSinIntervaloDTO.indiceCalculableSinIntervalo instanceof
                IndiceCalculableSinIntervalo ? indicadorSinIntervaloDTO.indiceCalculableSinIntervalo :
                new IndiceCalculableSinIntervalo(indicadorSinIntervaloDTO.indiceCalculableSinIntervalo.id)) // se crea un objeto de la entidad con los datos propocionados

        await entityManager.save(indicadorSinIntervalo) // se inserta el indicador sin intervalo en la base de datos
    }

       // Método para eliminar indicadores sin intervalo
       public async deleteIndicadores(idIndicador?: number, idIndiceCalculable?: number, entityManager?: EntityManager) {
        // si se trata de una transacción heredada
        if (entityManager) {
            await entityManager.delete(IndicadorSinIntervalo, { indiceCalculableSinIntervaloId: idIndiceCalculable })
        }
        else {
            await this.indicadorSinIntervaloRepository.delete({ indiceCalculableSinIntervaloId: idIndiceCalculable })
        }
    }
}

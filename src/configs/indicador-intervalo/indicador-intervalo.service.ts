import { Injectable } from '@nestjs/common';
import { IndicadorIntervalo } from './indicador-intervalo.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IndiceCalculableIntervalo } from '../indice-calculable-intervalo/indice-calculable-intervalo.entity';
import { IndicadorDTO } from '../indicador/indicador.dto';
import { TipoIndicador } from '../indicador/indicador.entity';

@Injectable()
export class IndicadorIntervaloService {

    constructor(@InjectRepository(IndicadorIntervalo) private indicadorIntervaloRepository: Repository<IndicadorIntervalo>) { }

    public async createIndicadorIntervalo(indicadorIntervaloDTO: IndicadorDTO, entityManager?: EntityManager) {
        if (!entityManager) // No se trata de una llamada con una transacción heredada
            await this.indicadorIntervaloRepository.manager.transaction(async (trasactionManager: EntityManager) => { // se crea una transacción para este procedimiento
                await this.createIndicadorIntervaloWithEntity(indicadorIntervaloDTO, trasactionManager)
            })
        else // se continua con la transacción heredada
            await this.createIndicadorIntervaloWithEntity(indicadorIntervaloDTO, entityManager)
    }

    private async createIndicadorIntervaloWithEntity(indicadorIntervaloDTO: IndicadorDTO, entityManager: EntityManager) {
        const indicadorIntervalo: IndicadorIntervalo = new IndicadorIntervalo(undefined, indicadorIntervaloDTO.nombre, indicadorIntervaloDTO.valor, TipoIndicador.IndicadorIntervalo,
            indicadorIntervaloDTO.limiteInferior, indicadorIntervaloDTO.limiteSuperior, indicadorIntervaloDTO.indiceCalculableIntervalo instanceof IndiceCalculableIntervalo ?
            indicadorIntervaloDTO.indiceCalculableIntervalo : new IndiceCalculableIntervalo(indicadorIntervaloDTO.indiceCalculableIntervalo.id)) // Se crea un indicador Intervalo apartir de la información del objeto DTO

        const indicadorIntervaloInsertado: IndicadorIntervalo = await entityManager.save(indicadorIntervalo) // se inserta el indicador en la base de datos y se obtiene la instancia insertada
    }

    // Método para eliminar indicadores tipo intervalo
    public async deleteIndicadores(idIndicador?: number, idIndiceCalculable?: number, entityManager?: EntityManager) {
        // si se trata de una transacción heredada
        if (entityManager) {
            await entityManager.delete(IndicadorIntervalo, { indiceCalculableIntervaloId: idIndiceCalculable })
        }
        else {
            await this.indicadorIntervaloRepository.delete({ indiceCalculableIntervaloId: idIndiceCalculable })
        }
    }

}

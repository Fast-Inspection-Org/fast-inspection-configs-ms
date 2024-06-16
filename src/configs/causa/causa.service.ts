import { Injectable } from '@nestjs/common';
import { Causa } from './causa.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CausaDTO } from './causa.dto';
import { TipoDeterioroConfig, TipoTipoDeterioro } from '../tipo-deterioros-config/tipo-deterioro-config.entity';
import { TipoDeterioroAnalisisCriticidadConfig } from '../tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.entity';

@Injectable()
export class CausaService {
    constructor(@InjectRepository(Causa) private causaRepository: Repository<Causa>) { }


    public async createCausa(causaDTO: CausaDTO, entityManager?: EntityManager) {
        if (!entityManager) // No se trata de una llamada con una transacción heredada
            await this.causaRepository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
                await this.createCausaWithEntity(causaDTO, transactionManager)
            })
        else // se continua con la transacción heredada
            await this.createCausaWithEntity(causaDTO, entityManager)

    }

    private async createCausaWithEntity(causaDTO: CausaDTO, entityManager: EntityManager) {
        const causa: Causa = new Causa(undefined, causaDTO.nombre, causaDTO.tipoDeterioroConfig instanceof TipoDeterioroConfig ? causaDTO.tipoDeterioroConfig :
            function () {
                if (causaDTO.tipoDeterioroConfig.tipo === TipoTipoDeterioro.TipoDeterioroAnalisisCriticidad) // si es un tipo de deterioro analisis de criticidad
                    return new TipoDeterioroAnalisisCriticidadConfig(causaDTO.tipoDeterioroConfig.id)
            }()) // se crea una cuasa para insertar en la base de datos

        await entityManager.save(causa) // se inserta en la base de datos la cuasa 
    }

    // Método para eliminar causas
    public async deleteCausas(idTipoDeterioro: number, entityManager?: EntityManager) {
        if (entityManager) { // si se trata de una transacción heredada
            await entityManager.delete(Causa, {
                tipoDeterioroConfigId: idTipoDeterioro
            })
        }
        else {
            await this.causaRepository.delete({
                tipoDeterioroConfigId: idTipoDeterioro
            })
        }

    }
}

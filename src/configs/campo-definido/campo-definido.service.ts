import { Injectable } from '@nestjs/common';
import { CampoDefinido } from './campo-definido.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CampoDefinidoDTO } from './campo-definido.dto';
import { TipoDeterioroConfig, TipoTipoDeterioro } from '../tipo-deterioros-config/tipo-deterioro-config.entity';
import { TipoDeterioroAnalisisCriticidadConfig } from '../tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.entity';

@Injectable()
export class CampoDefinidoService {

    constructor(@InjectRepository(CampoDefinido) private campoDefinidoRepository: Repository<CampoDefinido>) { }

    public async createCampoDefinido(campoDefinidoDTO: CampoDefinidoDTO, entityManager?: EntityManager) {
        if (!entityManager) // No se trata de una llamada con una transacción heredada
            await this.campoDefinidoRepository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
                await this.createCampoDefinidoWithEntity(campoDefinidoDTO, transactionManager)
            })
        else // se continua con la transacción heredada
            await this.createCampoDefinidoWithEntity(campoDefinidoDTO, entityManager)

    }


    private async createCampoDefinidoWithEntity(campoDefinidoDTO: CampoDefinidoDTO, entityManager: EntityManager) {
        const campoDefinido: CampoDefinido = new CampoDefinido(undefined, campoDefinidoDTO.nombre, campoDefinidoDTO.tipo, campoDefinidoDTO.tipoDeterioroConfig
            instanceof TipoDeterioroConfig ? campoDefinidoDTO.tipoDeterioroConfig : function () {
                if (campoDefinidoDTO.tipoDeterioroConfig.tipo === TipoTipoDeterioro.TipoDeterioroAnalisisCriticidad) // si es un tipo de deterioro analisis de criticidad
                    return new TipoDeterioroAnalisisCriticidadConfig(campoDefinidoDTO.tipoDeterioroConfig.id)
            }()) // se crea un campo definido para ser insertado en la base de datos

            await entityManager.save(campoDefinido) /*Se inserta el campo definido en la base de datos*/
    }

}

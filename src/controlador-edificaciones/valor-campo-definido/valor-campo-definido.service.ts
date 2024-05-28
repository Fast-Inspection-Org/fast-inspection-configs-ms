import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValorCampoDefinido } from './valor-campo-definido.entity';
import { EntityManager, Repository } from 'typeorm';
import { ValorCampoDefinidoDTO } from './valor-campo-definido.dto';

@Injectable()
export class ValorCampoDefinidoService {
    constructor(@InjectRepository(ValorCampoDefinido) private valorCampoDefinidoRepository: Repository<ValorCampoDefinido>) { }

    // Metodo para insertar un nuevo valor campo definido en la base de datos
    public async createDeterioro(valorCampoDefinidoDTO: ValorCampoDefinidoDTO, entityManager?: EntityManager) {
        if (!entityManager) // No se trata de una llamada con una transacción heredada
            await this.valorCampoDefinidoRepository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
                await this.createValorCampoDefinidoWithEntityManager(valorCampoDefinidoDTO, transactionManager)
            })
        else // se continua con la transacción heredada
            await this.createValorCampoDefinidoWithEntityManager(valorCampoDefinidoDTO, entityManager)
    }

    // Metodo auxiliar para crear un valor campo definido con la entityManager correspondiente
    private async createValorCampoDefinidoWithEntityManager(valorCampoDefinidoDTO: ValorCampoDefinidoDTO, entityManager: EntityManager) {

        await entityManager.save(new ValorCampoDefinido(valorCampoDefinidoDTO.id, valorCampoDefinidoDTO.valor,
            valorCampoDefinidoDTO.campoDefinido, valorCampoDefinidoDTO.deterioro
        )) // Se almacena en la base de datos el valor campos definido
    }
}

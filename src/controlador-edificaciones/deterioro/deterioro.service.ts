import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Deterioro } from './deterioro.entity';
import { EntityManager, Repository } from 'typeorm';
import { DeterioroDTO } from './deterioro.dto';
import { ValorCampoDefinidoDTO } from '../valor-campo-definido/valor-campo-definido.dto';
import { ValorCampoDefinidoService } from '../valor-campo-definido/valor-campo-definido.service';

@Injectable()
export class DeterioroService {
    constructor(@InjectRepository(Deterioro) private deterioroRespository: Repository<Deterioro>,
        private valorCampoDefinidoService: ValorCampoDefinidoService) { }


    // Metodo para insertar un nuevo deteioro en la base de datos
    public async createDeterioro(deterioroDTO: DeterioroDTO, entityManager?: EntityManager) {
        if (!entityManager) // No se trata de una llamada con una transacción heredada
            await this.deterioroRespository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
                await this.createDeterioroWithEntityManager(deterioroDTO, transactionManager)
            })
        else // se continua con la transacción heredada
            await this.createDeterioroWithEntityManager(deterioroDTO, entityManager)
    }

    // Metodo auxiliar para crear un deterioro con la entityManager correspondiente
    private async createDeterioroWithEntityManager(deterioroDTO: DeterioroDTO, entityManager: EntityManager) {

        const deterioroInsertado: Deterioro = await entityManager.save(new Deterioro(deterioroDTO.id, deterioroDTO.idSistema, deterioroDTO.idSubSistema,
            deterioroDTO.idMaterial, deterioroDTO.idTipoDeterioro, deterioroDTO.levantamiento
        )) // Se almacena en la base de datos el deterioro y se obtiene con su id

        if (deterioroDTO.valorCamposDefinidos)
            await this.saveValorCamposDefinidos(deterioroDTO.valorCamposDefinidos, deterioroInsertado, entityManager) // se insertan en la base de datos los valores de los campos definidos del deterioro

        //Además se utiliza await para que la transacción espere a que se realicen todas las operaciones en los demás servicios

    }

    private async saveValorCamposDefinidos(valorCamposDefinidosDTO: Array<ValorCampoDefinidoDTO>, deterioroInsertado: Deterioro, entityManager: EntityManager) {

        for (let index = 0; index < valorCamposDefinidosDTO.length; index++) {
            const valorCampoDefinidoDTO: ValorCampoDefinidoDTO = valorCamposDefinidosDTO[index]
            // se crea un deterioroDTO para ser marcado con el id generado
            const deterioroDTO: DeterioroDTO = new DeterioroDTO()
            deterioroDTO.id = deterioroInsertado.id // se marca el deterioro dto con el id generado
            valorCampoDefinidoDTO.deterioro = deterioroDTO // se le asigna el deterioro dto con el id generado para poder trazar la relación
            await this.valorCampoDefinidoService.createDeterioro(valorCampoDefinidoDTO, entityManager)
        }
    }

}

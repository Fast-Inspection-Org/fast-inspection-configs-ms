import { Injectable } from '@nestjs/common';
import { CreateCampoDefinidoTextoDto } from './dto/create-campo-definido-texto.dto';
import { UpdateCampoDefinidoTextoDto } from './dto/update-campo-definido-texto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CampoDefinidoTexto } from './entities/campo-definido-texto.entity';
import { EntityManager, Repository } from 'typeorm';
import { CampoDefinidoDTO } from '../campo-definido/campo-definido.dto';
import { TipoDeterioroConfig, TipoTipoDeterioro } from '../tipo-deterioros-config/tipo-deterioro-config.entity';
import { TipoDeterioroAnalisisCriticidadConfig } from '../tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.entity';

@Injectable()
export class CampoDefinidoTextoService {
  constructor(@InjectRepository(CampoDefinidoTexto) private campoDefinidoTextoRepository: Repository<CampoDefinidoTexto>) { }

  public async createCampoDefinido(campoDefinidoDTO: CampoDefinidoDTO, entityManager?: EntityManager) {
    if (!entityManager) // No se trata de una llamada con una transacción heredada
        await this.campoDefinidoTextoRepository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
            await this.createCampoDefinidoWithEntity(campoDefinidoDTO, transactionManager)
        })
    else // se continua con la transacción heredada
        await this.createCampoDefinidoWithEntity(campoDefinidoDTO, entityManager)

}


private async createCampoDefinidoWithEntity(campoDefinidoDTO: CampoDefinidoDTO, entityManager: EntityManager) {
    const campoDefinido: CampoDefinidoTexto = new CampoDefinidoTexto(undefined, campoDefinidoDTO.nombre, campoDefinidoDTO.tipo, campoDefinidoDTO.tipoDeterioroConfig
        instanceof TipoDeterioroConfig ? campoDefinidoDTO.tipoDeterioroConfig : function () {
            if (campoDefinidoDTO.tipoDeterioroConfig.tipo === TipoTipoDeterioro.TipoDeterioroAnalisisCriticidad) // si es un tipo de deterioro analisis de criticidad
                return new TipoDeterioroAnalisisCriticidadConfig(campoDefinidoDTO.tipoDeterioroConfig.id)
        }()) // se crea un campo definido para ser insertado en la base de datos

        await entityManager.save(campoDefinido) /*Se inserta el campo definido en la base de datos*/
}

  findAll() {
    return `This action returns all campoDefinidoTexto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campoDefinidoTexto`;
  }

  update(id: number, updateCampoDefinidoTextoDto: UpdateCampoDefinidoTextoDto) {
    return `This action updates a #${id} campoDefinidoTexto`;
  }

  remove(id: number) {
    return `This action removes a #${id} campoDefinidoTexto`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateCampoDefinidoSeleccionDto } from './dto/create-campo-definido-seleccion.dto';
import { UpdateCampoDefinidoSeleccionDto } from './dto/update-campo-definido-seleccion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CampoDefinidoSeleccion } from './entities/campo-definido-seleccion.entity';
import { EntityManager, Repository } from 'typeorm';
import { CampoDefinidoDTO } from '../campo-definido/campo-definido.dto';
import { TipoDeterioroConfig, TipoTipoDeterioro } from '../tipo-deterioros-config/tipo-deterioro-config.entity';
import { TipoDeterioroAnalisisCriticidadConfig } from '../tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.entity';

@Injectable()
export class CampoDefinidoSeleccionService {

  constructor(@InjectRepository(CampoDefinidoSeleccion) private campoDefinidoSeleccionRepository: Repository<CampoDefinidoSeleccion>) { }

  public async createCampoDefinido(campoDefinidoDTO: CampoDefinidoDTO, entityManager?: EntityManager) {
    if (!entityManager) // No se trata de una llamada con una transacción heredada
      await this.campoDefinidoSeleccionRepository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
        await this.createCampoDefinidoWithEntity(campoDefinidoDTO, transactionManager)
      })
    else // se continua con la transacción heredada
      await this.createCampoDefinidoWithEntity(campoDefinidoDTO, entityManager)

  }


  private async createCampoDefinidoWithEntity(campoDefinidoDTO: CampoDefinidoDTO, entityManager: EntityManager) {
    const campoDefinido: CampoDefinidoSeleccion = new CampoDefinidoSeleccion(undefined, campoDefinidoDTO.nombre, campoDefinidoDTO.tipo, campoDefinidoDTO.tipoDeterioroConfig
      instanceof TipoDeterioroConfig ? campoDefinidoDTO.tipoDeterioroConfig : function () {
        if (campoDefinidoDTO.tipoDeterioroConfig.tipo === TipoTipoDeterioro.TipoDeterioroAnalisisCriticidad) // si es un tipo de deterioro analisis de criticidad
          return new TipoDeterioroAnalisisCriticidadConfig(campoDefinidoDTO.tipoDeterioroConfig.id)
      }(), campoDefinidoDTO.opciones) // se crea un campo definido para ser insertado en la base de datos

    await entityManager.save(campoDefinido) /*Se inserta el campo definido en la base de datos*/
  }

  findAll() {
    return `This action returns all campoDefinidoSeleccion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campoDefinidoSeleccion`;
  }

  update(id: number, updateCampoDefinidoSeleccionDto: UpdateCampoDefinidoSeleccionDto) {
    return `This action updates a #${id} campoDefinidoSeleccion`;
  }

  remove(id: number) {
    return `This action removes a #${id} campoDefinidoSeleccion`;
  }
}

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



}

import { Injectable } from '@nestjs/common';
import { TipoDeterioroConfig } from './tipo-deterioro-config.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TipoDeteriorosConfigService {
    constructor(@InjectRepository(TipoDeterioroConfig) private tiposDeteriorosRepository: Repository<TipoDeterioroConfig>) { }
    // Método para eliminar un tipo de deterioro en específico
    public async deleteTipoDeterioroConfig(idTipoDeterioroConfig: number) {
        await this.tiposDeteriorosRepository.delete({ id: idTipoDeterioroConfig })
    }

}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TipoDeterioroConfig } from './tipo-deterioro-config.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TipoDeteriorosConfigService {
    constructor(@InjectRepository(TipoDeterioroConfig) private tiposDeteriorosRepository: Repository<TipoDeterioroConfig>, private eventEmitter: EventEmitter2) { }
    // Método para eliminar un tipo de deterioro en específico
    public async deleteTipoDeterioroConfig(idTipoDeterioroConfig: number) {
        // se obtiene primero el tipo de deterioro  antes de eliminarlo
        const tipoDeterioroEliminar: TipoDeterioroConfig | undefined = await this.tiposDeteriorosRepository.findOne({
            where: {
                id: idTipoDeterioroConfig
            },
            relations: ['materialConfig', 'materialConfig.subsistemaConfig', 'materialConfig.subsistemaConfig.sistemaConfig'] // Solo se carga la relación subsistemaConfig
        })

        if (tipoDeterioroEliminar) {
            await this.tiposDeteriorosRepository.delete({ id: idTipoDeterioroConfig })
            // se emite el evento
            await this.eventEmitter.emitAsync("accionCritica", tipoDeterioroEliminar.materialConfig.subsistemaConfig.sistemaConfig.configVersion)
        }
        else
            throw new HttpException("No existe un Tipo de Deterioro config con ese id", HttpStatus.BAD_REQUEST)
    }
}

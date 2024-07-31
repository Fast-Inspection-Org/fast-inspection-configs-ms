import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calculos, IndiceCalculable } from './indice-calculable.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';


@Injectable()
export class IndiceCalculableService {
    constructor(@InjectRepository(IndiceCalculable) private indiceCalculableRepository: Repository<IndiceCalculable>, private eventEmitter: EventEmitter2) { }

    // Método para eliminar un indice caculable en específico
    public async deleteIndiceCalculable(idIndiceCalculable: number) {
        // se obtiene primero el indice calculable  antes de eliminarlo
        const indiceCalculable: IndiceCalculable | undefined = await this.indiceCalculableRepository.findOne({
            where: {
                id: idIndiceCalculable
            }
        })

        if (indiceCalculable) {
            await this.indiceCalculableRepository.delete({ id: idIndiceCalculable })
            // se emite el evento
            await this.eventEmitter.emitAsync("accionCritica", indiceCalculable.configVersion)
        }
        else
            throw new HttpException("No existe un Índice Calculable con ese id", HttpStatus.BAD_REQUEST)
    }

    // Método para obtener un indice calculable segun los filtros
    public async getIndiceCalculable(idIndiceCalculable: number, nombre?: String, calculo?: Calculos, versionConfig?: number) {
        return await this.indiceCalculableRepository.findOne({
            where: {
                id: idIndiceCalculable,
                nombre: nombre,
                calculo: calculo,
                configVersion: versionConfig
            }
        })
    }
}

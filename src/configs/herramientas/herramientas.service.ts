import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Herramienta, TipoHerramienta } from './herramienta.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class HerramientasService {
    constructor(@InjectRepository(Herramienta) private herramientaRepository: Repository<Herramienta>, private eventEmitter: EventEmitter2) { }


    // Método para obtener una herramienta
    public async getHerramienta(nombre?: String, tipo?: TipoHerramienta, versionConfig?: number) {
        return await this.herramientaRepository.findOne({
            where: {
                nombre: nombre,
                tipo: tipo,
                configVersion: versionConfig
            }
        })
    }

    public async getHerramientaById(idHerramienta: number) {
        return await this.herramientaRepository.findOne({
            where: {
                id: idHerramienta
            }
        })
    }

    // Método para eliminar una herramienta en específico
    public async deleteHerramienta(idHerramienta: number) {
         // se obtiene primero la herramienta  antes de eliminarlo
         const herramienta: Herramienta | undefined = await this.herramientaRepository.findOne({
            where: {
                id: idHerramienta
            }
        })

        if (herramienta) {
            await this.herramientaRepository.delete({ id: idHerramienta })
            // se emite el evento
            await this.eventEmitter.emitAsync("accionCritica", herramienta.configVersion)
        }
        else
            throw new HttpException("No existe una Herramienta con ese id", HttpStatus.BAD_REQUEST)
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Herramienta, TipoHerramienta } from './herramienta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HerramientasService {
    constructor(@InjectRepository(Herramienta) private herramientaRepository: Repository<Herramienta>) { }


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
        await this.herramientaRepository.delete({ id: idHerramienta })
    }
}

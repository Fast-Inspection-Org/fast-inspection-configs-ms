import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Herramienta } from './herramienta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HerramientasService {
    constructor(@InjectRepository(Herramienta) private herramientaRepository: Repository<Herramienta>) { }

    // Método para obtener todas las herramientas pertencientes a una configuración en específico
    public async getAllHerramientasBelongConfig(verionConfig: number): Promise<Array<Herramienta>> {
        const herramientas: Array<Herramienta> = await this.herramientaRepository.find({
            where: {
                configVersion: verionConfig
            }
        })

        return herramientas

    }

    public async getHerramientaById(idHerramienta: number) {
       return await this.herramientaRepository.findOne({
        where: {
            id: idHerramienta
        }
       })
    }
}

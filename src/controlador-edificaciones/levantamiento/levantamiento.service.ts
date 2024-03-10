import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Levantamiento } from './levantamiento.entity';
import { Repository } from 'typeorm';
import { LevantamientoDTO } from './levantamiento.dto';
import { LevantamientoDomain } from './estructura-levantamiento/levantamiento.domain';
import { ConfigService } from '@nestjs/config';
import { ConfigsService } from 'src/configs/configs.service';

@Injectable()
export class LevantamientoService {
    constructor(@InjectRepository(Levantamiento) private levantamientoRepository: Repository<Levantamiento>) { }

    // Metodo para obtener todos los levantamientos registrados
    public async getAllLevantamientos() {
        return await this.levantamientoRepository.find()
    }

    // Metodo para insertar un nuevo levantamiento a la base de datos
    public async createLevantamiento(letantamientoDTO: LevantamientoDTO) {
        await this.levantamientoRepository.save(this.levantamientoRepository.create(letantamientoDTO))
    }

    //Metodo para eliminar un levantamiento
    public async deleteLevantamiento(idLevantamiento: number) {
        await this.levantamientoRepository.delete({ id: idLevantamiento })
    }


    // Metodo obtener todos los levantamientos procesados y estructurados
    public async getAllLevantamientosDomain() {
        const levantamientos: Array<Levantamiento> = await this.getAllLevantamientos();

        return this.createArrayLevantamientosDomain(levantamientos)
    }

    // Metodo para construir una lista de levantamientos domain (levantammientos estructurados y procesados)
    private createArrayLevantamientosDomain(levantamientos: Array<Levantamiento>) {
        const levantamientosDomain: Array<LevantamientoDomain> = new Array<LevantamientoDomain>()
        levantamientos.forEach((levantamiento) => {
            levantamientosDomain.push(new LevantamientoDomain(levantamiento.id, levantamiento.fechaInicio, levantamiento.fechaFinalizado,
                levantamiento.edificacion, levantamiento.config, levantamiento.deterioros))
        })

        return levantamientosDomain
    }

    // Metodo para obtener los levantamientos de un edificio en especifico

    public async getLevantamientosByEdificacion(idEdificacion: number) {
        const levantamientos: Array<Levantamiento> = await this.levantamientoRepository.find({
            where: {
                edificacionId: idEdificacion
            }
        })
    }

    // Metodo para obtener un Levantamiento estrcuturado con un id en especifico
    public async getLevantamiento(id: number) {
        let levantamienoDomain: LevantamientoDomain | undefined = undefined
        const levantamiento: Levantamiento = await this.levantamientoRepository.findOne({ // se obtiene al levantamiento desde la base de datos
            where: {
                id: id
            }
        })

        if (levantamiento)
            levantamienoDomain = new LevantamientoDomain(levantamiento.id, levantamiento.fechaInicio, levantamiento.fechaFinalizado,
                levantamiento.edificacion, levantamiento.config, levantamiento.deterioros) // se crea un levantamiento estrcuturado para ser mostrado

        return levantamienoDomain


    }

}

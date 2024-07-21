import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Calculos, IndiceCalculable } from './indice-calculable.entity';
import { Repository } from 'typeorm';


@Injectable()
export class IndiceCalculableService {
    constructor(@InjectRepository(IndiceCalculable) private indiceCalculableRepository: Repository<IndiceCalculable>) { }

    // Método para eliminar un indice caculable en específico
    public async deleteIndiceCalculable(idIndiceCalculable: number) {
        await this.indiceCalculableRepository.delete({ id: idIndiceCalculable })
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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IndiceCalculable } from './indice-calculable.entity';
import { Repository } from 'typeorm';
import { IndiceCalculableIntervalo } from '../indice-calculable-intervalo/indice-calculable-intervalo.entity';
import { IndiceCalculableSinIntervalo } from '../indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.entity';

@Injectable()
export class IndiceCalculableService {
    constructor(@InjectRepository(IndiceCalculable) private indiceCalculableRepository: Repository<IndiceCalculable>) { }

    // Método para eliminar un indice caculable en específico
    public async deleteIndiceCalculable(idIndiceCalculable: number) {
        await this.indiceCalculableRepository.delete({ id: idIndiceCalculable })
    }

    
}

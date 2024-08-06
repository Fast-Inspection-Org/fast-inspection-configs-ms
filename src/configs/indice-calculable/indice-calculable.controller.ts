import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { IndiceCalculableService } from './indice-calculable.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('indice-calculable')
export class IndiceCalculableController {
    constructor(private indiceCalculableService: IndiceCalculableService) { }

    @MessagePattern('deleteIndiceCalculable')
    public async deleteIndiceCalculable(idIndiceCalculable: number) {
        return await this.indiceCalculableService.deleteIndiceCalculable(idIndiceCalculable)
    }  
}

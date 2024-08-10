import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { IndiceCalculableService } from './indice-calculable.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller('indice-calculable')
export class IndiceCalculableController {
    constructor(private indiceCalculableService: IndiceCalculableService) { }

    @MessagePattern('deleteIndiceCalculable')
    public async deleteIndiceCalculable(idIndiceCalculable: number) {
        try {
            await this.indiceCalculableService.deleteIndiceCalculable(idIndiceCalculable)
            return { success: true }
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }
}

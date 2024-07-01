import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { IndiceCalculableService } from './indice-calculable.service';

@Controller('indice-calculable')
export class IndiceCalculableController {
    constructor(private indiceCalculableService: IndiceCalculableService) { }


    @Delete("deleteIndiceCalculable/:id")
    public async deleteIndiceCalculable(@Param("id", ParseIntPipe) idIndiceCalculable: number) {
        return await this.indiceCalculableService.deleteIndiceCalculable(idIndiceCalculable)
    }

   
}

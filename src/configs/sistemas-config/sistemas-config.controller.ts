import { Body, Controller, Post } from '@nestjs/common';
import { SistemasConfigService } from './sistemas-config.service';
import { SistemaConfigDTO } from './sistema-config.dto';

@Controller('sistemas-config')
export class SistemasConfigController {
    constructor(private sistemaConfigService: SistemasConfigService) { }

    @Post("createSistemaConfig")
    public createSistemaConfig(@Body() sistemaConfigDTO: SistemaConfigDTO) {
        //this.sistemaConfigService.crearSistemaConfigRepository(sistemaConfigDTO)
    }
}

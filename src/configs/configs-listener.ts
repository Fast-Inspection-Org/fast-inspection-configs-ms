import { OnEvent } from "@nestjs/event-emitter";
import { ConfigsService } from "./configs.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigListener {
    constructor(private configsService: ConfigsService) { }
    @OnEvent('accionCritica', { async: true })
    public async actualizarEstadoConfiguracionEvent(versionConfig: number) {
        await this.configsService.actualizarEstadoConfig(versionConfig)
    }
}
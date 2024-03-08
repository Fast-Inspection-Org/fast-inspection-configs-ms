import { ConfigDTO } from "../config.dto"
import { Config } from "../config.entity"
import { HerramientaDTO } from "../herramientas/herramienta.dto"
import { Herramienta } from "../herramientas/herramienta.entity"
import { SubsistemaConfigDTO } from "../subsistemas-config/subsistema-config.dto"
import { SubsistemaConfig } from "../subsistemas-config/subsistema-config.entity"

export class SistemaConfigDTO {
    id: number
    nombre: String
    subSistemasConfig: Array<SubsistemaConfigDTO>
    herramienta: HerramientaDTO // atributo que define la herramienta a la cual pertenece el sistema
    config: Config | ConfigDTO // atributo que define a la configuracion que pertenece el sistemaConfig
}
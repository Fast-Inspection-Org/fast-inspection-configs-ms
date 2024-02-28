import { Config } from "../config.entity"
import { HerramientaDTO } from "../herramientas/herramienta.dto"
import { Herramienta } from "../herramientas/herramienta.entity"
import { SubsistemaConfig } from "../subsistemas-config/subsistema-config.entity"

export class SistemaConfigDTO {
    nombre: String
    subSistemasConfig?: Array<SubsistemaConfig>
    herramienta: HerramientaDTO // atributo que define la herramienta a la cual pertenece el sistema
    config?: Config // atributo que define a la configuracion que pertenece el sistemaConfig
}
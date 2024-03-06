import { HerramientaAnalisisCriticidad } from "../herramienta-analisis-criticidad/herrramienta-analisis-criticidad.entity"
import { HerramientaDTO } from "../herramientas/herramienta.dto"

export class CampoDTO {
    id: number
    nombre: String
    nivelImportancia: number
    configVersion: number // indica la version a la que pertence el campo
    herramientaAnalisisCriticidad?: HerramientaAnalisisCriticidad | HerramientaDTO // Atributo que define a la herramienta analisis de criticidad que pertenece el campo
}
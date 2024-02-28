import { HerramientaAnalisisCriticidad } from "../herramienta-analisis-criticidad/herrramienta-analisis-criticidad.entity"
import { HerramientaDTO } from "../herramientas/herramienta.dto"

export class CampoDTO {
    nombre: String
    nivelImportancia: number
    herramientaAnalisisCriticidad?: HerramientaAnalisisCriticidad | HerramientaDTO // Atributo que define a la herramienta analisis de criticidad que pertenece el campo
}
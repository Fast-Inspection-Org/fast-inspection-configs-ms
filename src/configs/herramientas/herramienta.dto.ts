import { CampoDTO } from "../campo/campo.dto"
import { ConfigDTO } from "../config.dto"
import { Config } from "../config.entity"


export class HerramientaDTO {
    id?: number
    nombre: String
    tipo: string
    campos?: Array<CampoDTO> // Campos definidos en la herramienta
    config?: ConfigDTO | Config // atributo que representa la configuracion a la que pertenece la herramienta
}
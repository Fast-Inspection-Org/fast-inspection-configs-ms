import { CampoDefinidoDTO } from "../campo-definido/campo-definido.dto"
import { CampoDTO } from "../campo/campo.dto"
import { CausaDTO } from "../causa/causa.dto"


export class UpdateTipoDeterioroAnalisisCriticidadConfigDTO {
    nombre: String
    camposAfectados: Array<CampoDTO>
    causas: Array<CausaDTO>
    camposDefinidos: Array<CampoDefinidoDTO>
    detectabilidad: number
}
import { CampoDTO } from "../campo/campo.dto"
import { CausaDTO } from "../causa/causa.dto"


export class UpdateTipoDeterioroAnalisisCriticidadConfigDTO {
    nombre: String
    camposAfectados: Array<CampoDTO>
    causas: Array<CausaDTO>
}
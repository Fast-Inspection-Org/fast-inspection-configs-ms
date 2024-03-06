import { CampoDefinidoDTO } from "../campo-definido/campo-definido.dto"
import { CampoDTO } from "../campo/campo.dto"
import { CausaDTO } from "../causa/causa.dto"
import { MaterialConfigDTO } from "../materiales-config/material-config.dto"
import { MaterialConfig } from "../materiales-config/material-config.entity"

export class TipoDeterioroConfigDTO {
    id: number
    nombre: String
    tipo: string
    detectabilidad: number
    camposDefinidos: Array<CampoDefinidoDTO> // Atributo que representa los campos definidos para este tipo de deterioro
    causas: Array<CausaDTO> // Atributo que define las causas para este tipo de deterioro
    materialConfig: MaterialConfig | MaterialConfigDTO
    camposAfectados: Array<CampoDTO> // atributo que define los campos afectados por este tipo de deterioro
}
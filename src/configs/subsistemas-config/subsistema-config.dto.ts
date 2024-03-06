import { MaterialConfigDTO } from "../materiales-config/material-config.dto"
import { SistemaConfigDTO } from "../sistemas-config/sistema-config.dto"
import { SistemaConfig } from "../sistemas-config/sistema-config.entity"

export class SubsistemaConfigDTO {
    id: number
    nombre: String
    materialesConfig: Array<MaterialConfigDTO>
    sistemaConfig: SistemaConfig | SistemaConfigDTO
}
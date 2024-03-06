import { SubsistemaConfigDTO } from "../subsistemas-config/subsistema-config.dto"
import { SubsistemaConfig } from "../subsistemas-config/subsistema-config.entity"
import { TipoDeterioroConfigDTO } from "../tipo-deterioros-config/tipo-deterioro-config.dto"

export class MaterialConfigDTO {
    id: number // Atributo unico
    nombre: String
    tiposDeteriorosConfig: Array<TipoDeterioroConfigDTO> // Un material tiene muchos tipos de deterioros asociados
    subsistemaConfig: SubsistemaConfig | SubsistemaConfigDTO
}
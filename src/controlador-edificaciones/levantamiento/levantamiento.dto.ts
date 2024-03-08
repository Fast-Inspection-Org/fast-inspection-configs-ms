import { Config } from "src/configs/config.entity"
import { Deterioro } from "../deterioro/deterioro.entity"
import { Edificacion } from "../edificacion/edificacion.entity"
import { DeterioroDTO } from "../deterioro/deterioro.dto"
import { EdificacionDTO } from "../edificacion/edificacion.dto"
import { ConfigDTO } from "src/configs/config.dto"

export class LevantamientoDTO {
    id: number
    fechaInicio: Date
    fechaFinalizado: Date
    deterioros: Array<DeterioroDTO> // atributo que define a los deterios pertenecientes al levantamiento
    edificacion: EdificacionDTO // Atributo que define la edificacion a la cual pertenece el letantamiento
    config: ConfigDTO // Define la configuración a la cual pertenece el levantamiento
}
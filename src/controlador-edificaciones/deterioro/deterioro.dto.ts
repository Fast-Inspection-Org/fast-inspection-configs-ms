import { LevantamientoDTO } from "../levantamiento/levantamiento.dto"
import { Levantamiento } from "../levantamiento/levantamiento.entity"
import { ValorCampoDefinidoDTO } from "../valor-campo-definido/valor-campo-definido.dto"
import { ValorCampoDefinido } from "../valor-campo-definido/valor-campo-definido.entity"

export class DeterioroDTO {
    id: number
    idSistema: number
    idSubSistema: number
    idMaterial: number
    idTipoDeterioro: number
    levantamiento: LevantamientoDTO
    valorCamposDefinidos: Array<ValorCampoDefinidoDTO> // Atributo que representa los valores seleccionados para ese deterioro *por cada campo definido*
}
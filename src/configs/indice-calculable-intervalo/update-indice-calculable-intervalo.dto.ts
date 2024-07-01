import { IndicadorDTO } from "../indicador/indicador.dto"
import { Calculos } from "../indice-calculable/indice-calculable.entity"

export class UpdateIndiceCalculableIntervaloDTO {
    nombre: String
    calculo: Calculos
    indicadoresIntervalos: Array<IndicadorDTO>
}
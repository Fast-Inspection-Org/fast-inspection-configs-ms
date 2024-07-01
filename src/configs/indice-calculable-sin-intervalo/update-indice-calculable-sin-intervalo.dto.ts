import { IndicadorDTO } from "../indicador/indicador.dto"
import { Calculos } from "../indice-calculable/indice-calculable.entity"

export class UpdateIndiceCalculableSinIntervaloDTO {
    nombre: String
    calculo: Calculos
    indicadoresSinIntervalo: Array<IndicadorDTO>
}
import { IndiceCalculableIntervaloDTO } from "../indice-calculable-intervalo/indice-calculable-intervalo.dto"
import { IndiceCalculableIntervalo } from "../indice-calculable-intervalo/indice-calculable-intervalo.entity"
import { IndiceCalculableSinIntervaloDTO } from "../indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.dto"
import { IndiceCalculableSinIntervalo } from "../indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.entity"

export class IndicadorDTO {
    id: number
    nombre: String
    valor: number
    tipo: string
    limiteInferior: number // Atributo que representa el limite inferior del intervalo
    limiteSuperior: number // Atributo que representa el limite superior del intervalo
    indiceCalculableIntervalo: IndiceCalculableIntervaloDTO | IndiceCalculableIntervalo // Atributo que define el indice calculable por intervalos al que pertenece el indicador
    indiceCalculableSinIntervalo: IndiceCalculableSinIntervaloDTO | IndiceCalculableSinIntervalo // Atributo que define el indiceCalculable sin intervalos al que pertenece el indicador sin intervalos
}
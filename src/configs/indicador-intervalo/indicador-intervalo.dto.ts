import { IndicadorDTO } from "../indicador/indicador.dto"
import { IndiceCalculableIntervaloDTO } from "../indice-calculable-intervalo/indice-calculable-intervalo.dto"
import { IndiceCalculableIntervalo } from "../indice-calculable-intervalo/indice-calculable-intervalo.entity"


export class IndicadorIntervaloDTO extends IndicadorDTO {
    limiteInferior: number // Atributo que representa el limite inferior del intervalo
    limiteSuperior: number // Atributo que representa el limite superior del intervalo
    indiceCalculableIntervalo: IndiceCalculableIntervaloDTO | IndiceCalculableIntervalo // Atributo que define el indice calculable por intervalos al que pertenece el indicador
}
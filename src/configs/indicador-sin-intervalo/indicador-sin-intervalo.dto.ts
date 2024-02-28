import { IndicadorDTO } from "../indicador/indicador.dto";
import { IndiceCalculableSinIntervaloDTO } from "../indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.dto";
import { IndiceCalculableSinIntervalo } from "../indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.entity";


export class IndicadorSinIntervaloDTO extends IndicadorDTO{
    indiceCalculableSinIntervalo: IndiceCalculableSinIntervaloDTO | IndiceCalculableSinIntervalo // Atributo que define el indiceCalculable sin intervalos al que pertenece el indicador sin intervalos
}
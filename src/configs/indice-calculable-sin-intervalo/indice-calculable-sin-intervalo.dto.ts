import { IndicadorSinIntervaloDTO } from "../indicador-sin-intervalo/indicador-sin-intervalo.dto";
import { IndiceCalculableDTO } from "../indice-calculable/indice-calculable.dto";

export class IndiceCalculableSinIntervaloDTO extends IndiceCalculableDTO {
    indicadoresSinIntervalos: Array<IndicadorSinIntervaloDTO> // Atributo que define los indicadores sin intervalos del indice calculable sin intervalos
}
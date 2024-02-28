import { IndicadorIntervaloDTO } from "../indicador-intervalo/indicador-intervalo.dto";
import { IndiceCalculableDTO } from "../indice-calculable/indice-calculable.dto";

export class IndiceCalculableIntervaloDTO extends IndiceCalculableDTO {
    indicadoresIntervalos: Array<IndicadorIntervaloDTO> // Un indice calculable por intervalos puede tener varios indicadores de intervalos
}
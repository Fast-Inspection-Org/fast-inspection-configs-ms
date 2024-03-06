import { ConfigDTO } from "../config.dto"
import { Config } from "../config.entity"
import { IndicadorIntervaloDTO } from "../indicador-intervalo/indicador-intervalo.dto"
import { IndicadorSinIntervaloDTO } from "../indicador-sin-intervalo/indicador-sin-intervalo.dto"

export class IndiceCalculableDTO {
    id: number
    nombre: String
    indicadoresIntervalos: Array<IndicadorIntervaloDTO> // Un indice calculable por intervalos puede tener varios indicadores de intervalos
    indicadoresSinIntervalos: Array<IndicadorSinIntervaloDTO> // Atributo que define los indicadores sin intervalos del indice calculable sin intervalos
    tipo: string
    calculo: number
    config: ConfigDTO | Config // Atributo que representa la configuracion donde esta definido los indices calculables
}
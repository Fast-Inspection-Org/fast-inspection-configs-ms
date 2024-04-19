import { ConfigDTO } from "../config.dto"
import { Config } from "../config.entity"
import { IndicadorIntervalo } from "../indicador-intervalo/indicador-intervalo.entity"
import { IndicadorSinIntervalo } from "../indicador-sin-intervalo/indicador-sin-intervalo.entity"
import { IndicadorDTO } from "../indicador/indicador.dto"
import { Calculos } from "./indice-calculable.entity"

export class IndiceCalculableDTO {
    id: number
    nombre: String
    indicadoresIntervalos?: Array<IndicadorDTO> // Un indice calculable por intervalos puede tener varios indicadores de intervalos
    indicadoresSinIntervalos?: Array<IndicadorDTO> // Atributo que define los indicadores sin intervalos del indice calculable sin intervalos
    tipo: string
    calculo: Calculos
    config: ConfigDTO | Config // Atributo que representa la configuracion donde esta definido los indices calculables

    public constuirDTO(nombre: String, tipo: string, calculo: Calculos, indicadoresIntervalos?: Array<IndicadorIntervalo>,
        indicadoresSinIntervalos?: Array<IndicadorSinIntervalo>) { // Constructor para construir un objeto DTO basado en un Objeto Entity
        this.nombre = nombre
        this.tipo = tipo
        this.calculo = calculo
        if (indicadoresIntervalos)
            this.construirIndicadoresIntervaloDTO(indicadoresIntervalos) // se construyen indicadores intervalos DTO basado de en la información de su representación entity
        if (indicadoresSinIntervalos)
            this.construirIndicadoresSinIntervaloDTO(indicadoresSinIntervalos) // se construyen indicadores sin intervalos DTO basado en la información de su representación entity
    }

    // Metodo para construir indicadores intervalo DTO basado en su representación entity
    public construirIndicadoresIntervaloDTO(indicadoresIntervalos: Array<IndicadorIntervalo>) {
        this.indicadoresIntervalos = new Array<IndicadorDTO>()

        // Se iteran los indicadores intervalo entity para construir indicadores intervalo DTO basados en la información de los mismos
        indicadoresIntervalos.forEach((indicadorIntervalo) => {
            const indicadorIntervaloDTO: IndicadorDTO = new IndicadorDTO() // se crea un indicador intervalo DTO que será la representación de la información del indicador intervalo entity
            indicadorIntervaloDTO.constuirDTO(indicadorIntervalo.nombre, indicadorIntervalo.valor, indicadorIntervalo.tipo, indicadorIntervalo.limiteInferior,
                indicadorIntervalo.limiteSuperior)
            this.indicadoresIntervalos.push(indicadorIntervaloDTO) // se añade el indicador intervalo DTO a la lista de indicadores intervalo DTO
        })
    }

    // Metodo para construir indicadores sin intervalo DTO basado en su representación entity
    public construirIndicadoresSinIntervaloDTO(indicadoresSinIntervalos: Array<IndicadorSinIntervalo>) {
        this.indicadoresSinIntervalos = new Array<IndicadorDTO>
        // Se iteran los indicadores sin intervalo entity para construir indicadores sin intervalo DTO basados en la información de los mismos
        indicadoresSinIntervalos.forEach((indicadorSinIntervalo) => {
            const indicadorSinIntervaloDTO: IndicadorDTO = new IndicadorDTO() // se crea un indicador sin intervalo DTO que será la representación de la información del indicador sin intervalo entity
            indicadorSinIntervaloDTO.constuirDTO(indicadorSinIntervalo.nombre, indicadorSinIntervalo.valor, indicadorSinIntervalo.tipo)
            this.indicadoresSinIntervalos.push(indicadorSinIntervaloDTO) // se añade el indicador sin intervalo DTO a la lista de indicadores sin intervalo DTO
        })
    }
}

import { IndiceCalculableIntervalo } from "../indice-calculable-intervalo/indice-calculable-intervalo.entity"

import { IndiceCalculableSinIntervalo } from "../indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.entity"
import { IndiceCalculableDTO } from "../indice-calculable/indice-calculable.dto"
import { TipoIndicador } from "./indicador.entity"

export class IndicadorDTO {
    id: number
    nombre: String
    valor: number
    tipo: TipoIndicador
    limiteInferior?: number // Atributo que representa el limite inferior del intervalo
    limiteSuperior?: number // Atributo que representa el limite superior del intervalo
    indiceCalculableIntervalo: IndiceCalculableDTO | IndiceCalculableIntervalo // Atributo que define el indice calculable por intervalos al que pertenece el indicador
    indiceCalculableSinIntervalo: IndiceCalculableDTO | IndiceCalculableSinIntervalo // Atributo que define el indiceCalculable sin intervalos al que pertenece el indicador sin intervalos

    public constuirDTO(nombre: String, valor: number, tipo: TipoIndicador, limiteInferior?: number, limiteSuperior?: number) { // Constructor para construir un objeto DTO basado en un Objeto Entity
        this.nombre = nombre
        this.valor = valor
        this.tipo = tipo
        if (limiteInferior)
            this.limiteInferior = limiteInferior
        if (limiteSuperior)
            this.limiteSuperior = limiteSuperior
    }
}
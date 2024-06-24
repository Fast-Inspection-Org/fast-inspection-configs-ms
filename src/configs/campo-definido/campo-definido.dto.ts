import { TipoDeterioroConfigDTO } from "../tipo-deterioros-config/tipo-deterioro-config.dto"
import { TipoDeterioroConfig } from "../tipo-deterioros-config/tipo-deterioro-config.entity"
import { TiposCamposDefinidos } from "./campo-definido.entity"

export class CampoDefinidoDTO {
    id: number // Atributo unico
    nombre: String // Atributo que define el nombre del campo por ejemplo: largo, ancho, profundidad, etc
    tipo: TiposCamposDefinidos //Atributo que define el tipo de campo por ejemplo: texto, numero, fecha etc, esto Sería un Enum
    // atributos del tipo numerico
    inicioIntervalo?: number
    finalIntervalo?: number
    unidadMedida?: String // representa la unidad de medida del campo númerico (en caso de que este tenga)
    // atributos del tipo selección
    opciones?: Array<String> // las opciones de selección
    tipoDeterioroConfig: TipoDeterioroConfig | TipoDeterioroConfigDTO // Atributo que define el tipo de detioro configurado al que pertenece dicho campo



    public constuirDTO(id?: number, nombre?: String, tipo?: TiposCamposDefinidos, inicioIntervalo?: number, finalIntervalo?: number, unidadMedida?: String, opciones?: Array<String>) { // Constructor para construir un objeto DTO basado en un Objeto Entity
        this.id = id
        this.nombre = nombre
        this.tipo = tipo
        this.inicioIntervalo = inicioIntervalo
        this.finalIntervalo = finalIntervalo
        this.unidadMedida = unidadMedida
        this.opciones = opciones
    }
}
import { TipoDeterioroConfigDTO } from "../tipo-deterioros-config/tipo-deterioro-config.dto"
import { TipoDeterioroConfig } from "../tipo-deterioros-config/tipo-deterioro-config.entity"

export class CausaDTO {
    id: number // Atributo unico
    nombre: String // Atributo que define el nombre de la causa
    tipoDeterioroConfig: TipoDeterioroConfig | TipoDeterioroConfigDTO // Atributo que define el tipo de deterioro configurado al que pertenece dicha causa

    public constuirDTO(nombre: String) { // Constructor para construir un objeto DTO basado en un Objeto Entity
        this.nombre = nombre
    }
}
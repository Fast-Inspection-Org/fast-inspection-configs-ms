import { TipoDeterioroConfigDTO } from "../tipo-deterioros-config/tipo-deterioro-config.dto"
import { TipoDeterioroConfig } from "../tipo-deterioros-config/tipo-deterioro-config.entity"

export class CampoDefinidoDTO {
    id: number // Atributo unico
    nombre: String // Atributo que define el nombre del campo por ejemplo: largo, ancho, profundidad, etc
    tipo: String //Atributo que define el tipo de campo por ejemplo: texto, numero, fecha etc, esto Sería un Enum
    tipoDeterioroConfig: TipoDeterioroConfig | TipoDeterioroConfigDTO // Atributo que define el tipo de detioro configurado al que pertenece dicho campo


    
    public constuirDTO(nombre: String, tipo: String) { // Constructor para construir un objeto DTO basado en un Objeto Entity
        this.nombre = nombre
        this.tipo = tipo
    }
}
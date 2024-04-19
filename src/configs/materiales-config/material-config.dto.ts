import { SubsistemaConfigDTO } from "../subsistemas-config/subsistema-config.dto"
import { SubsistemaConfig } from "../subsistemas-config/subsistema-config.entity"
import { TipoDeterioroAnalisisCriticidadConfig } from "../tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.entity"
import { TipoDeterioroConfigDTO } from "../tipo-deterioros-config/tipo-deterioro-config.dto"
import { TipoDeterioroConfig } from "../tipo-deterioros-config/tipo-deterioro-config.entity"

export class MaterialConfigDTO {
    id: number // Atributo unico
    nombre: String
    tiposDeteriorosConfig?: Array<TipoDeterioroConfigDTO> // Un material tiene muchos tipos de deterioros asociados
    subsistemaConfig: SubsistemaConfig | SubsistemaConfigDTO

    public constuirDTO(nombre: String, tiposDeteriorosConfig?: Array<TipoDeterioroConfig>) { // Constructor para construir un objeto DTO basado en un Objeto Entity
        this.nombre = nombre
        if (tiposDeteriorosConfig)
            this.construirTiposDeterioroConfigDTO(tiposDeteriorosConfig) // se construyen tipos de deterioro config DTO y se añaden a la lista de tipos de deterioro config DTO
    }

    // Metodo para construir tipos de deterioro config DTO basadas en tipos de deterioro config entity
    private construirTiposDeterioroConfigDTO(tiposDeteriorosConfig: Array<TipoDeterioroConfig>) {
        this.tiposDeteriorosConfig = new Array<TipoDeterioroConfigDTO>()
        // Se iteran los tipos de deterioro config entity para construir tipos de deterioro config DTO basadas en ellos
        tiposDeteriorosConfig.forEach((tipoDeterioroConfig) => {
            const tipoDeterioroConfigDTO: TipoDeterioroConfigDTO = new TipoDeterioroConfigDTO() // se crea un tipo de deterioro config DTO basasdo en la información del tipo de deterioro config entity
            tipoDeterioroConfigDTO.constuirDTO(tipoDeterioroConfig.nombre, tipoDeterioroConfig.tipo, tipoDeterioroConfig.camposDefinidos,
                tipoDeterioroConfig.causas, tipoDeterioroConfig instanceof TipoDeterioroAnalisisCriticidadConfig ? tipoDeterioroConfig.detectabilidad : undefined,
                tipoDeterioroConfig instanceof TipoDeterioroAnalisisCriticidadConfig ? tipoDeterioroConfig.camposAfectados : undefined
            )
            this.tiposDeteriorosConfig.push(tipoDeterioroConfigDTO) // se añade a la lista de tipo de deterioro config dto el tipo de deterioro config DTO creado
        })
    }
}
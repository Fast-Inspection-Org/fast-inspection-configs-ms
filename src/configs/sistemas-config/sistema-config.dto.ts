import { ConfigDTO } from "../config.dto"
import { Config } from "../config.entity"
import { HerramientaDTO } from "../herramientas/herramienta.dto"
import { Herramienta } from "../herramientas/herramienta.entity"
import { SubsistemaConfigDTO } from "../subsistemas-config/subsistema-config.dto"
import { SubsistemaConfig } from "../subsistemas-config/subsistema-config.entity"

export class SistemaConfigDTO {
    id: number
    nombre: String
    subSistemasConfig?: Array<SubsistemaConfigDTO>
    herramienta: HerramientaDTO // atributo que define la herramienta a la cual pertenece el sistema
    config: Config | ConfigDTO // atributo que define a la configuracion que pertenece el sistemaConfig

    public constuirDTO(nombre: String, herramienta: Herramienta, subSistemasConfig?: Array<SubsistemaConfig>) { // Constructor para construir un objeto DTO basado en un Objeto Entity
        this.nombre = nombre
        this.construirHerramientaDTO(herramienta) // se construye una herramienta DTO basada en la herramienta config entity
        if (SubsistemaConfig)
            this.construirSubSistemasConfigDTO(subSistemasConfig) // se construyen subsistemas config DTO y se añaden a la lista de subsistemas config DTO
    }


    // Metodo para construir subsistemas DTO basadas en subsistemas entity
    private construirSubSistemasConfigDTO(subSistemasConfig: Array<SubsistemaConfig>) {
        this.subSistemasConfig = new Array<SubsistemaConfigDTO>()
        // Se iteran los subSistemasConfig entity para construir subSistemasConfig DTO basadas en ellos
        subSistemasConfig.forEach((subsistemaConfig) => {
            const subSistemaConfigDTO: SubsistemaConfigDTO = new SubsistemaConfigDTO() // se crea un subsistema config DTO basasdo en la información del subsistema config entity
            subSistemaConfigDTO.constuirDTO(subsistemaConfig.nombre, subsistemaConfig.materialesConfig)
            this.subSistemasConfig.push(subSistemaConfigDTO) // se añade a la lista de subsistemas config dto al subsistema config DTO creado
        })
    }

    // Metodo para construir una herramienta DTO basado en una herramienta entity
    private construirHerramientaDTO(herramienta: Herramienta) {
        const herramientaDTO: HerramientaDTO = new HerramientaDTO() // se crea una herramienta DTO basada en la información de la herramienta entity
        herramientaDTO.constuirDTO(herramienta.nombre, herramienta.tipo)
        this.herramienta = herramientaDTO
    }
}
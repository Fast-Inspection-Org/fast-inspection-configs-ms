
import { IsString } from "class-validator"
import { HerramientaDTO } from "./herramientas/herramienta.dto"
import { Herramienta } from "./herramientas/herramienta.entity"
import { IndiceCalculableDTO } from "./indice-calculable/indice-calculable.dto"
import { SistemaConfigDTO } from "./sistemas-config/sistema-config.dto"
import { IndiceCalculable } from "./indice-calculable/indice-calculable.entity"
import { SistemaConfig } from "./sistemas-config/sistema-config.entity"
import { HerramientaAnalisisCriticidad } from "./herramienta-analisis-criticidad/herrramienta-analisis-criticidad.entity"
import { IndiceCalculableIntervalo } from "./indice-calculable-intervalo/indice-calculable-intervalo.entity"
import { IndiceCalculableSinIntervalo } from "./indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.entity"
import { Sistema } from "src/controlador-edificaciones/levantamiento/estructura-levantamiento/sistema.domain"


export class ConfigDTO {
    version?: number
    @IsString()
    nombre: String
    descripcion: String
    herramientas: Array<HerramientaDTO> // Una configuracion puede tener muchas herramientas registradas
    indicesCalculables: Array<IndiceCalculableDTO> // Atributo que representa los indices calculables definidos en la configuracion
    sistemasConfigs: Array<SistemaConfigDTO> // Una configuracion tiene muchos sistemas definidos

    public async constuirDTO(nombre: String, descripcion: String, herramientas?: Array<Herramienta>,
        indicesCalculables?: Array<IndiceCalculable>,
        sistemasConfigs?: Array<SistemaConfig>) { // Constructor para construir un objeto DTO basado en un Objeto Entity
        this.nombre = nombre
        this.descripcion = descripcion
        if (herramientas)
          await  this.construirHerramientas(herramientas) // se construyen las herramientas DTO
        if (indicesCalculables)
           await this.construirIndicesCalculables(indicesCalculables) // se construyen los indices calculables DTO
        if (sistemasConfigs)
           await this.construirSistemasConfig(sistemasConfigs) // se construyen los sistemas config DTO
    }

    // Metodo para construir herramientas DTO basadas en Herramientas entity
    private async construirHerramientas(herramientas: Array<Herramienta>) {
        this.herramientas = new Array<HerramientaDTO>()
        // Se iteran las herramientas entity para construir herramientas DTO basadas en ellas

        for (let index = 0; index < herramientas.length; index++) {
            const herramienta: Herramienta = herramientas[index]
            const herramientaDTO: HerramientaDTO = new HerramientaDTO() // se crea una herramienta DTO que será la representación de la información de la herramienta entity
            herramientaDTO.constuirDTO(herramienta.nombre, herramienta.tipo, herramienta instanceof HerramientaAnalisisCriticidad ? await herramienta.campos : undefined)
            this.herramientas.push(herramientaDTO) // se añade la herramienta DTO a la lista de herramientas DTO
        }
    }

    // Metodo para construir indices calculables DTO basado en indices calculables entity
    private async construirIndicesCalculables(indicesCalculables: Array<IndiceCalculable>) {
        this.indicesCalculables = new Array<IndiceCalculableDTO>()
        // Se iteran los indiceCalculables entity para construir indiceCalculables DTO basadas en ellos
        for (let index = 0; index < indicesCalculables.length; index++) {
            const indiceCalculable: IndiceCalculable = indicesCalculables[index]
            const indiceCalculableDTO: IndiceCalculableDTO = new IndiceCalculableDTO() // se crea un indiceCalculable DTO que será la representación de la información del indiceCalculable entity
            indiceCalculableDTO.constuirDTO(indiceCalculable.nombre, indiceCalculable.tipo, indiceCalculable.calculo,
                indiceCalculable instanceof IndiceCalculableIntervalo ? await indiceCalculable.indicadoresIntervalos : undefined,
                indiceCalculable instanceof IndiceCalculableSinIntervalo ? await indiceCalculable.indicadoresSinIntervalos : undefined
            )
            this.indicesCalculables.push(indiceCalculableDTO) // se añade el indiceCalculable DTO a la lista de indiceCalculables DTO
        }
    }

    // Metodo para construir sistemas config DTO basado en sistemas config entity
    private async construirSistemasConfig(sistemasConfigs: Array<SistemaConfig>) {
        this.sistemasConfigs = new Array<SistemaConfigDTO>()
        // Se iteran los sistemasConfig entity para construir sistemasConfig DTO basadas en ellos
        for (let index = 0; index < sistemasConfigs.length; index++) {
            const sistemaConfig: SistemaConfig = sistemasConfigs[index]
            const sistemaConfigDTO: SistemaConfigDTO = new SistemaConfigDTO() // se crea un sistema config DTO que será la representación de la información del sistema Config Entity
           await sistemaConfigDTO.constuirDTO(sistemaConfig.nombre, await sistemaConfig.herramienta, await sistemaConfig.subSistemasConfig)
            this.sistemasConfigs.push(sistemaConfigDTO) // se añade el sistema config DTO a la lista de sistemas config DTO
        }
    }
}
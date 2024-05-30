import { Herramienta } from "../herramientas/herramienta.entity"
import { HerramientaSerializable } from "../herramientas/herramienta.serializable"

export class SistemaConfigSerializable {
    id: number
    nombre: String
    cantSubsistemas: number
    herramienta: HerramientaSerializable // representa el nombre de la herramienta a la que pertenece el sistema
    configVersion: number // indica la versión de la configuración a la cual pertenece el sistema

    constructor(id: number, nombre: String, cantSubsistemas: number, herramienta: Herramienta, configVersion: number ) {
        this.id = id
        this.nombre = nombre
        this.cantSubsistemas = cantSubsistemas
        this.herramienta = new HerramientaSerializable(herramienta.id, herramienta.nombre, herramienta.tipo)
        this.configVersion = configVersion
    }
}
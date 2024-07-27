export class ConfigSerializable {
    version: number // atributo que representa la version de la configuración y su identificador unico
    nombre: String
    descripcion: String
    state: boolean // Atributo que define el estado de la configuración (true: terminada, false: en progreso)
    porcentajeCompletitud: number

    constructor(version: number, nombre: String, descripcion: String, state: boolean, porcentajeCompletitud: number) {
        this.version = version
        this.nombre = nombre
        this.descripcion = descripcion
        this.state = state
        this.porcentajeCompletitud = porcentajeCompletitud
    }
}
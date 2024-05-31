export class SubsistemaConfigSerializable {
    id: number
    nombre: String
    cantMateriales: number

    constructor(id: number, nombre: String, cantMateriales: number) {
        this.id = id
        this.nombre = nombre
        this.cantMateriales = cantMateriales
    }
}
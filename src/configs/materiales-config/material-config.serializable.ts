export class MaterialConfigSerializable {
    id: number
    nombre: String
    cantTiposDeterioros: number

    constructor(id: number, nombre: String, cantTiposDeterioros: number) {
        this.id = id
        this.nombre = nombre
        this.cantTiposDeterioros = cantTiposDeterioros
    }
}
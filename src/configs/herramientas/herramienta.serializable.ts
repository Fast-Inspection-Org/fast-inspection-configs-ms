export class HerramientaSerializable {
    id: number // Atributo unico
    nombre: String
    tipo: string

    constructor(id: number, nombre: String, tipo: string) {
        this.id = id
        this.nombre = nombre
        this.tipo = tipo
    }
}
export class TipoDeterioroAnalisisCriticidadConfigSerializable {
    id: number
    nombre: String
    cantCamposAfectados: number
    cantCausas: number
    

    constructor(id: number, nombre: String, cantCamposAfectados: number, cantCausas: number) {
        this.id = id
        this.nombre = nombre
        this.cantCamposAfectados = cantCamposAfectados
        this.cantCausas = cantCausas
    }

}
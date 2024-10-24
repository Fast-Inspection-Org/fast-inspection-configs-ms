import { Campo } from "../campo/campo.entity"

export class TipoDeterioroAnalisisCriticidadConfigSerializable {
    id: number
    nombre: String
    detectabilidad: number
    camposAfectados?: Array<Campo>
    cantCamposAfectados: number
    cantCausas: number


    constructor(id: number, nombre: String, cantCamposAfectados: number, cantCausas: number, detectabilidad: number, camposAfectados?: Array<Campo>) {
        this.id = id
        this.nombre = nombre
        this.cantCamposAfectados = cantCamposAfectados
        this.cantCausas = cantCausas
        this.detectabilidad = detectabilidad
        this.camposAfectados = camposAfectados ? camposAfectados : new Array<Campo>()

    }

}
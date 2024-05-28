import { Exclude, Expose } from "class-transformer"
import { LevantamientoDomain } from "../levantamiento/estructura-levantamiento/levantamiento.domain"

export class EdificacionDomain {
    id: number // Atributo único
    nombre: String
    criticidad: number
    direccion: String
    ubicacionX: number
    ubicacionY: number
    @Exclude()
    levantamientos: Array<LevantamientoDomain> // Atributo que define el historial de levantamientos realizados a una edificación

    constructor(id: number, nombre: String, direccion: String, ubicacionX: number, ubicacionY: number, levantamientos: Array<LevantamientoDomain>) {
        this.id = id
        this.nombre = nombre
        this.direccion = direccion
        this.ubicacionX = ubicacionX
        this.ubicacionY = ubicacionY
        this.levantamientos = levantamientos
    }

    // Metodo para obtener la criticidad de la edificación
    
    public async obtenerCriticidad() { // Implementacion temporal
        let criticidad: number = 0;
        if (this.levantamientos.length != 0) // si hay al menos un levantamiento registrado para la edificacion
            criticidad = await this.levantamientos[this.levantamientos.length - 1].obtenerIndiceCriticidad()

        this.criticidad = criticidad // se asigna el resultado del calculo para la serialización

        return criticidad
    }

    // Metodo para obtener la cantidad de deterioros de la edificación
    @Expose()
    public cantDeterioros() { // Implementación temporal
        let cantDeterioros: number = 0
        if (this.levantamientos.length != 0) // si hay al menos un levantamiento registrado para la edificacion
            cantDeterioros = this.levantamientos[this.levantamientos.length - 1].obtenerCantidadDeterioros()
        return cantDeterioros
    }

}
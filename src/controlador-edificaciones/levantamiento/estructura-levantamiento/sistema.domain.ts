
import { SubSistema } from "./subsistema.domain";
import { Herramienta } from "src/configs/herramientas/herramienta.entity";
import { Calculos } from "src/configs/indice-calculable/indice-calculable.entity";
import { SubsistemaConfig } from "src/configs/subsistemas-config/subsistema-config.entity";
import { Deterioro } from "src/controlador-edificaciones/deterioro/deterioro.entity";
import { LevantamientoDomain } from "./levantamiento.domain";

export class Sistema {
    // sistemaConfig: SistemaConfig // referencia de memoria del sistema definido en configuracion
    id: number // atributo que representa el id unico del sistema
    nombre: String
    subSistemas: Array<SubSistema>  // atributo que define La *información* de los subsistemas de un sistema
    herramienta: Herramienta // define la herramienta que va hacer utilizada en el sistema

    constructor(id: number,
        nombre: String,
        subSistemasConfig: Array<SubsistemaConfig>,
        herramienta: Herramienta,
        levantamiento: LevantamientoDomain,
        deteriorosSistema: Array<Deterioro>) {

        this.id = id
        this.nombre = nombre
        this.herramienta = herramienta
        this.cargarSubSistemas(subSistemasConfig, deteriorosSistema, levantamiento) // se cargan los subsistemas pertenecientes al sistema
    }

    // Metodo para estructurar la información de los subsistemas componenetes de un sistema 
    private cargarSubSistemas(subSistemasConfig: Array<SubsistemaConfig>, deteriorosSistema: Array<Deterioro>, levantamiento: LevantamientoDomain) {
        this.subSistemas = new Array<SubSistema>
        subSistemasConfig.forEach((subSistemaConfig) => {
            this.subSistemas.push(new SubSistema(subSistemaConfig.id, subSistemaConfig.nombre, subSistemaConfig.materialesConfig,
                this.determinarDeteriorosSubsistema(deteriorosSistema, subSistemaConfig.id), this, levantamiento))
        })
    }

    // Metodo para obtener todos los deterioros del levantamiento pertenecientes a un subSistemaDado
    private determinarDeteriorosSubsistema(deteriorosSistema: Array<Deterioro>, idSubsistema: number) {
        const deteriorosSubsistemas: Array<Deterioro> = new Array<Deterioro>()
        deteriorosSistema.forEach((deterioro) => {
            if (deterioro.idSubSistema === idSubsistema) // si el deterioro pertenece al sistema
                deteriorosSubsistemas.push(deterioro)
        })

        return deteriorosSubsistemas
    }

    // Operaciones
    public obtenerCantidadDeterioros(): number {
        let cantDeterioros: number = 0

        this.subSistemas.forEach((subsistema) => {
            cantDeterioros += subsistema.obtenerCantidadDeterioros()
        })

        return cantDeterioros
    }
    // Fin Operaciones


}
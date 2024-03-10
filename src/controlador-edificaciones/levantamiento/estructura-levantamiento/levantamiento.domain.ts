import { Edificacion } from "src/controlador-edificaciones/edificacion/edificacion.entity"
import { Sistema } from "./sistema.domain"
import { Config } from "src/configs/config.entity"
import { SistemaConfig } from "src/configs/sistemas-config/sistema-config.entity"
import { Deterioro } from "src/controlador-edificaciones/deterioro/deterioro.entity"
import { Indicador } from "src/configs/indicador/indicador.entity"
import { Calculos } from "src/configs/indice-calculable/indice-calculable.entity"
import { Exclude, Expose } from "class-transformer"

export class LevantamientoDomain {

    id: number
    fechaInicio: Date
    fechaFinalizado: Date
    sistemas: Array<Sistema> // atributo que representa los sistemas del levantamiento
    @Exclude()
    edificacion: Edificacion // Atributo que define la edificacion a la cual pertenece el letantamiento
    @Exclude()
    config: Config


    constructor (id: number,
        fechaInicio: Date,
        fechaFinalizado: Date,
        edificacion: Edificacion,
        config: Config,
        deteriorosLevantamiento: Array<Deterioro>) {
        this.id = id
        this.fechaInicio = fechaInicio
        this.fechaFinalizado = fechaFinalizado
        this.edificacion = edificacion
        this.config = config
        this.cargarSistemas(config.sistemasConfig, deteriorosLevantamiento) // se carga la estructura del levantamiento
        // Despues de cargada toda la inforamción del levantamiento, se procesan los calculos
    }

    // Getters

    @Expose()
    public nombreConfig() {
        return this.config.nombre
    }

    @Expose()
    public versionConfig() {
        return this.config.version
    }


    // Metodo para estructurar la información de los sistemas componenetes de un levantamiento
    private cargarSistemas(sistemasConfig: Array<SistemaConfig>, deteriorosLevantamiento: Array<Deterioro>) {
        this.sistemas = new Array<Sistema>
        sistemasConfig.forEach((sistemaConfig) => {
            this.sistemas.push(new Sistema(sistemaConfig.id, sistemaConfig.nombre, sistemaConfig.subSistemasConfig, sistemaConfig.herramienta, this,
                this.determinarDeteriorosSistema(deteriorosLevantamiento, sistemaConfig.id)))
        })
    }

    // Metodo para obtener todos los deterioros del levantamiento pertenecientes a un sistema dado
    private determinarDeteriorosSistema(deteriorosLevantamiento: Array<Deterioro>, idSistemaConfig: number) {
        const deteriorosSistema: Array<Deterioro> = new Array<Deterioro>()
        deteriorosLevantamiento.forEach((deterioro) => {
            if (deterioro.idSistema === idSistemaConfig) // si el deterioro pertenece al sistema
                deteriorosSistema.push(deterioro)
        })

        return deteriorosSistema
    }


    // Operaciones
  
    // Metodo para obtener el indicador correspondiente a un valor calculado
    public obtenerIndicadorCalculo(valorCalculo: number, calculo: Calculos): Indicador {
        return this.config.obtenerIndicadorCalculo(valorCalculo, calculo) // se obtiene el valor del inidicador necesario
    }

    @Expose()
    public obtenerCantidadDeterioros(): number {
        let cantDeterioros: number = 0

        this.sistemas.forEach((sistema) => {
            cantDeterioros += sistema.obtenerCantidadDeterioros()
        })

        return cantDeterioros
    }

    // Metodo para calcular la criticidad de un sistema
    @Expose()
    public obtenerIndiceCriticidad(): number {
        let criticidad: number = 0
        this.sistemas.forEach((sistema) => {
            criticidad += sistema.obtenerIndiceCriticidad()
        })

        return criticidad
    }
    // Fin de Operaciones

}
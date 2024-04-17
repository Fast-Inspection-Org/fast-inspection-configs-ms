import { Edificacion } from "src/controlador-edificaciones/edificacion/edificacion.entity"
import { Sistema } from "./sistema.domain"
import { Config } from "src/configs/config.entity"
import { SistemaConfig } from "src/configs/sistemas-config/sistema-config.entity"
import { Deterioro } from "src/controlador-edificaciones/deterioro/deterioro.entity"
import { Indicador } from "src/configs/indicador/indicador.entity"
import { Calculos } from "src/configs/indice-calculable/indice-calculable.entity"
import { Exclude, Expose, Transform } from "class-transformer"
import { SubSistema } from "./subsistema.domain"
import { Material } from "./material.domain"
import { TipoDeterioro } from "./tipo-deterioro.domain"

export class LevantamientoDomain {

    id: number
    fechaInicio: Date
    fechaFinalizado: Date
    @Exclude()
    sistemas: Array<Sistema> // atributo que representa los sistemas del levantamiento
    @Exclude()
    edificacion: Edificacion // Atributo que define la edificacion a la cual pertenece el letantamiento
    @Exclude()
    config: Config


    constructor(id: number,
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

    public getSistemas(): Array<Sistema> {
        return this.sistemas;
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

    // Metodo para determinar la cantidad de tipos de deterioro que coinciden con un indicador en específico
    private cantTiposDeterioroWithIndicador(indicador: Indicador) {
        let cant: number = 0
        // se recorren todos los sistemas del levantamiento y se les pregunta por la cantidad de tipos de deteriros que asociados que tienen un indicador en especifico
        this.sistemas.forEach((sistema) => {
            cant += sistema.cantTiposDeterioroWithIndicador(indicador)
        })
        return cant
    }

    // Metodo para obtener la cantidad de tipos de deterioros asociados al sistema
    private obtenerCantidadTiposDeterioros() {
        let cant = 0
        // se recorre la lista de sistemas asociados al levantamiento y se les pregunta por la cantidad de tipos de deterioros asociados
        this.sistemas.forEach((sistema) => {
            cant += sistema.obtenerCantidadTiposDeterioros()
        })

        return cant
    }

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


    // Metodo para buscar un Sistema en especifico
    private getSistema(idSistema: number): Sistema {
        return this.sistemas.find(sistema =>
            sistema.id === idSistema)
    }

    // Metodo para obtener los subsistemas asociados a un sistema en especifico
    public getSubsistemasSistema(idSistema: number) {
        const sistema: Sistema = this.getSistema(idSistema); // se obtiene al sistema
        let subsistemas: Array<SubSistema> | undefined = undefined;

        if (sistema) // se fue encontrado sistema
            subsistemas = sistema.getSubsistemas() // se obtienen los subsistemas asociados al sistema

        return subsistemas

    }

    // Metodo para obtener los materiales asociados a un subsistema en especifico
    public getMaterialesSubsistemaSistema(idSistema: number, idSubsistema: number) {
        const sistema: Sistema = this.getSistema(idSistema); // se obtiene al sistema
        let materiales: Array<Material> | undefined = undefined;

        if (sistema) // se fue encontrado sistema
            materiales = sistema.getMaterialesSubsistema(idSubsistema) // se obtienen los materiales asociados al subsistema

        return materiales

    }

    // Metodo para obtener los tipos de deterioro asociados a un material en especifico
    public getTiposDeteriorosMaterialSubsistemaSistema(idSistema: number, idSubsistema: number, idMaterial: number) {
        const sistema: Sistema = this.getSistema(idSistema); // se obtiene al sistema
        let tiposDeterioros: Array<TipoDeterioro> | undefined = undefined;

        if (sistema) // se fue encontrado sistema
            tiposDeterioros = sistema.getTiposDeteriorosSubsistemaMaterial(idSubsistema, idMaterial) // se obtienen los tipos de deterioro asociados al material

        return tiposDeterioros

    }

    // Metodo para obtener todos los indiadores definidos en el calculo en especifico
    public obtenerIndicadoresByIndiceCalculable(calculo: Calculos): Array<Indicador> | undefined {
        return this.config.obtenerInicadoresByIndiceCalculable(calculo)
    }

    // Metodo para calcular el porcentaje de deterioros que presentan ese indicador
    private obtenerPorcientoIndicador(indicador: Indicador): number {
        let porciento: number = 0
        let totalTipoDeterioros: number = this.obtenerCantidadTiposDeterioros() // se obtiene la cantidad de tipos de deterioro en total
        if (totalTipoDeterioros) // si existe al menos un tipo de deterioro registrado en el levantamiento
            porciento = this.cantTiposDeterioroWithIndicador(indicador) * 100 / totalTipoDeterioros

        return porciento
    }

    // Metodo para obtener el porcentaje de criticidad por indicador
    @Expose()
    public obtenerPorcentajeData() {
        const mapData: Map<String, number> = new Map<String, number>() // se crea un mapa para almacenar la info (la clave representa el inidicador; el valor representa el porcentaje)
        // Obtener los indicadores definidos para el analisis de criticidad
        const indicadoresAnalisisCriticidad: Array<Indicador> | undefined = this.obtenerIndicadoresByIndiceCalculable(Calculos.Criticidad)  // se obtienen los indicadores del indice de criticidad

        if (indicadoresAnalisisCriticidad) // si fue obtenido correctamente los indicadores del calculo
            indicadoresAnalisisCriticidad.forEach((indicador) => { // se recorren los indicadores para por cada uno calcular su porcentaje 
                mapData.set(indicador.nombre, this.obtenerPorcientoIndicador(indicador))
            })

        return Array.from(mapData.entries()) // se convierte en array la info del map para ser serializada correctamente

    }

    // Fin de Operaciones

}
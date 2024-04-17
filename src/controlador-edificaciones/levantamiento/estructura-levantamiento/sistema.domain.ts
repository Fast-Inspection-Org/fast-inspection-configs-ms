
import { SubSistema } from "./subsistema.domain";
import { Herramienta } from "src/configs/herramientas/herramienta.entity";
import { SubsistemaConfig } from "src/configs/subsistemas-config/subsistema-config.entity";
import { Deterioro } from "src/controlador-edificaciones/deterioro/deterioro.entity";
import { LevantamientoDomain } from "./levantamiento.domain";
import { Exclude, Expose } from "class-transformer";
import { Indicador } from "src/configs/indicador/indicador.entity";
import { Calculos } from "src/configs/indice-calculable/indice-calculable.entity";
import { Material } from "./material.domain";
import { TipoDeterioro } from "./tipo-deterioro.domain";

export class Sistema {
    // sistemaConfig: SistemaConfig // referencia de memoria del sistema definido en configuracion
    id: number // atributo que representa el id unico del sistema
    nombre: String
    @Exclude()
    subSistemas: Array<SubSistema>  // atributo que define La *información* de los subsistemas de un sistema
    @Exclude()
    herramienta: Herramienta // define la herramienta que va hacer utilizada en el sistema
    @Exclude()
    levantamiento: LevantamientoDomain

    constructor(id: number,
        nombre: String,
        subSistemasConfig: Array<SubsistemaConfig>,
        herramienta: Herramienta,
        levantamiento: LevantamientoDomain,
        deteriorosSistema: Array<Deterioro>) {

        this.id = id
        this.nombre = nombre
        this.herramienta = herramienta
        this.levantamiento = levantamiento
        this.cargarSubSistemas(subSistemasConfig, deteriorosSistema, levantamiento) // se cargan los subsistemas pertenecientes al sistema
    }


    // Metodo para determinar la cantidad de tipos de deterioro que coinciden con un indicador en específico
    public cantTiposDeterioroWithIndicador(indicador: Indicador) {
        let cant: number = 0
        // se recorren todos los subsistemas del sistema y se les pregunta por la cantidad de tipos de deteriros que asociados que tienen un indicador en especifico
        this.subSistemas.forEach((subsistema) => {
            cant += subsistema.cantTiposDeterioroWithIndicador(indicador)
        })
        return cant
    }

    // Metodo para obtener la cantidad de tipos de deterioros asociados al sistema
    public obtenerCantidadTiposDeterioros() {
        let cant = 0
        // se recorre la lista de subsistemas asociados al sistema y se les pregunta por la cantidad de tipos de deterioros asociados
        this.subSistemas.forEach((subsistema) => {
            cant += subsistema.obtenerCantidadTiposDeterioros()
        })

        return cant
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

    // Getters
    public getSubsistemas(): Array<SubSistema> {
        return this.subSistemas;
    }

    public getSubsistema(idSubsistema: number) {
        return this.subSistemas.find(subsistema => subsistema.id === idSubsistema)
    }

    // Operaciones

    // Metodo para obtener los materiales asociados a un subsistema en especifico
    public getMaterialesSubsistema(idSubsistema: number) {
        const subsistema: SubSistema = this.getSubsistema(idSubsistema); // se obtiene al subsistema
        let materiales: Array<Material> | undefined = undefined;

        if (subsistema) // se fue encontrado el subsistema
            materiales = subsistema.getMateriales() // se obtienen los materiales asociados al subsistema

        return materiales

    }

    // Metodo para obtener los tipos de deteriro asociados a un material en especifico
    public getTiposDeteriorosSubsistemaMaterial(idSubsistema: number, idMaterial: number) {
        const subsistema: SubSistema = this.getSubsistema(idSubsistema); // se obtiene al subsistema
        let tiposDeterioros: Array<TipoDeterioro> | undefined = undefined;

        if (subsistema) // se fue encontrado el subsistema
            tiposDeterioros = subsistema.getTiposDeteriorosMaterial(idMaterial) // se obtienen los tipos de deterioro asociados al material

        return tiposDeterioros

    }



    @Expose()
    public obtenerCantidadDeterioros(): number {
        let cantDeterioros: number = 0

        this.subSistemas.forEach((subsistema) => {
            cantDeterioros += subsistema.obtenerCantidadDeterioros()
        })

        return cantDeterioros
    }
    // Metodo para calcular la criticidad de un sistema
    @Expose()
    public obtenerIndiceCriticidad(): number {
        let criticidad: number = 0
        this.subSistemas.forEach((subsistema) => {
            criticidad += subsistema.obtenerIndiceCriticidad()
        })

        return criticidad
    }

    // Metodo para calcular el porcentaje de deterioros que presentan ese indicador
    private obtenerPorcientoIndicador(indicador: Indicador): number {
        let porciento: number = 0
        let totalTipoDeterioros: number = this.obtenerCantidadTiposDeterioros() // se obtiene la cantidad de tipos de deterioro en total
        if (totalTipoDeterioros) // si existe al menos un tipo de deterioro registrado en el sistema
            porciento = this.cantTiposDeterioroWithIndicador(indicador) * 100 / totalTipoDeterioros

        return porciento
    }

    // Metodo para obtener el porcentaje de criticidad por indicador
    @Expose()
    public obtenerPorcentajeData() {
        const mapData: Map<String, number> = new Map<String, number>() // se crea un mapa para almacenar la info (la clave representa el inidicador; el valor representa el porcentaje)
        // Obtener los indicadores definidos para el analisis de criticidad
        const indicadoresAnalisisCriticidad: Array<Indicador> | undefined = this.levantamiento.obtenerIndicadoresByIndiceCalculable(Calculos.Criticidad)  // se obtienen los indicadores del indice de criticidad

        if (indicadoresAnalisisCriticidad) // si fue obtenido correctamente los indicadores del calculo
            indicadoresAnalisisCriticidad.forEach((indicador) => { // se recorren los indicadores para por cada uno calcular su porcentaje 
                mapData.set(indicador.nombre, this.obtenerPorcientoIndicador(indicador))
            })

        return Array.from(mapData.entries()) // se convierte en array la info del map para ser serializada correctamente

    }
    // Fin Operaciones

}
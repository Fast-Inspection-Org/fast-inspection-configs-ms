
import { TipoDeterioroConfig, TipoTipoDeterioro } from "src/configs/tipo-deterioros-config/tipo-deterioro-config.entity";
import { TipoDeterioro } from "./tipo-deterioro.domain";
import { Deterioro } from "src/controlador-edificaciones/deterioro/deterioro.entity";
import { TipoDeterioroAnalisisCriticidad } from "./tipo-deterioro-analisis-criticidad.domain";
import { Sistema } from "./sistema.domain";
import { TipoDeterioroAnalisisCriticidadConfig } from "src/configs/tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.entity";
import { LevantamientoDomain } from "./levantamiento.domain";
import { Exclude, Expose } from "class-transformer";
import { Indicador } from "src/configs/indicador/indicador.entity";
import { Calculos } from "src/configs/indice-calculable/indice-calculable.entity";

export class Material {
    //materialConfig: MaterialConfig // referencia de memoria del material definido en configuracion
    id: number // Atributo unico
    nombre: String
    @Exclude()
    tiposDeterioros: Array<TipoDeterioro> // atributo que define La *información* de los tipo de deterioro de un material
    @Exclude()
    levantamiento: LevantamientoDomain

    constructor(id: number, nombre: String, tiposDeteriorosConfig: Array<TipoDeterioroConfig>, deteriorosMaterial: Array<Deterioro>, sistema: Sistema, levantamiento: LevantamientoDomain) {
        this.id = id
        this.nombre = nombre
        this.cargarTiposDeterioros(tiposDeteriorosConfig, deteriorosMaterial, sistema, levantamiento) // se cargan los tipos de deterioros pertenecientes al material
        this.levantamiento = levantamiento
    }

    // Getts
    public getTiposDeterioros () {
        return this.tiposDeterioros
    }

    public getTipoDeterioro (idTipoDeterioro: number) {
        return this.tiposDeterioros.find(tipoDeterioro => tipoDeterioro.id === idTipoDeterioro)
    }

    // Metodo para cargar los tipo de deterioro del material
    private cargarTiposDeterioros(tiposDeteriorosConfig: Array<TipoDeterioroConfig>, deteriorosMaterial: Array<Deterioro>, sistema: Sistema, levantamiento: LevantamientoDomain) {
        this.tiposDeterioros = new Array<TipoDeterioro>()
        tiposDeteriorosConfig.forEach((tipoDeterioroConfig) => {
            this.tiposDeterioros.push(this.crearInstanciaTipoDeterioro(tipoDeterioroConfig, deteriorosMaterial, sistema, levantamiento)) /* se crea y se añade a la lista de tipo de deterioros del material 
            los distintos tipos de deterioro que pertenecen al material*/
        })

    }

    private crearInstanciaTipoDeterioro(tipoDeterioroConfig: TipoDeterioroConfig, deteriorosMaterial: Array<Deterioro>, sistema: Sistema, levantamiento: LevantamientoDomain) {
        if (tipoDeterioroConfig.tipo === TipoTipoDeterioro.TipoDeterioroAnalisisCriticidad)
            return new TipoDeterioroAnalisisCriticidad(tipoDeterioroConfig.id, tipoDeterioroConfig.nombre,
                tipoDeterioroConfig.tipo, tipoDeterioroConfig.detectabilidad, sistema, levantamiento, tipoDeterioroConfig.camposDefinidos, tipoDeterioroConfig.causas,
                this.determinarDeteriorosTipoDeterioro(deteriorosMaterial, tipoDeterioroConfig.id), (tipoDeterioroConfig as TipoDeterioroAnalisisCriticidadConfig).camposAfectados)
    }

    // Metodo para obtener todos los deterioros del material pertenecientes al tipo de deterioro
    private determinarDeteriorosTipoDeterioro(deteriorosMaterial: Array<Deterioro>, idTipoDeterioro: number) {
        const deteriorosTipoDeterioro: Array<Deterioro> = new Array<Deterioro>()
        deteriorosMaterial.forEach((deterioro) => {
            if (deterioro.idTipoDeterioro === idTipoDeterioro) // si el deterioro pertenece al tipo de deterioro
                deteriorosTipoDeterioro.push(deterioro)
        })

        return deteriorosTipoDeterioro
    }


    // Operaciones
    // Metodo para determinar la cantidad de tipos de deterioro que coinciden con un indicador en específico
    public cantTiposDeterioroWithIndicador(indicador: Indicador) {
        let cant: number = 0
        this.tiposDeterioros.forEach((tipoDeterioro) => {
            if (tipoDeterioro.obtenerIndiceCriticidad().id === indicador.id) // si el indicador del tipo de deterioro coincide con el indicador deseado
                cant++
        })

        return cant
    }

    public cantTiposDeterioros (): number {
        return this.tiposDeterioros.length
    }

    @Expose()
    public obtenerCantidadDeterioros(): number {
        let cantDeterioros: number = 0

        this.tiposDeterioros.forEach((tipoDeterioro) => {
            cantDeterioros += tipoDeterioro.obtenerCantidadDeterioros()
        })

        return cantDeterioros
    }

    // Metodo para calcular la criticidad de un material
    @Expose()
    public obtenerIndiceCriticidad(): number {
        let criticidad: number = 0
        this.tiposDeterioros.forEach((tipoDeterioro) => {

            criticidad += tipoDeterioro.obtenerIndiceCriticidad().valor
        })

        return criticidad
    }

    // Metodo para calcular el porcentaje de deterioros que presentan ese indicador
    private obtenerPorcientoIndicador(indicador: Indicador): number {
        let porciento: number = 0
        let totalTipoDeterioros: number = this.cantTiposDeterioros() // se obtiene la cantidad de tipos de deterioro en total
        if (totalTipoDeterioros) // si existe al menos un tipo de deterioro registrado en el material
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
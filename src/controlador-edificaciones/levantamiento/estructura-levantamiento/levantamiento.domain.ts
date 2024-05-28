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
    criticidad: number // representa la criticidad del deterioro
    porcentajeData: [String, number][]
    @Exclude()
    sistemas: Array<Sistema> // atributo que representa los sistemas del levantamiento
    @Exclude()
    edificacion: Edificacion // Atributo que define la edificacion a la cual pertenece el letantamiento
    @Exclude()
    config: Config


    private constructor(id: number,
        fechaInicio: Date,
        fechaFinalizado: Date,
        edificacion: Edificacion,
        config: Config,
    ) {
        this.id = id
        this.fechaInicio = fechaInicio
        this.fechaFinalizado = fechaFinalizado
        this.edificacion = edificacion
        this.config = config

    }

    // constructor para cargas asíncronas

    public static async createInstancie(id: number,
        fechaInicio: Date,
        fechaFinalizado: Date,
        edificacion: Edificacion,
        config: Config,
        deteriorosLevantamiento: Array<Deterioro>): Promise<LevantamientoDomain> {

        const levantamientoDomainIntancie: LevantamientoDomain = new LevantamientoDomain(id, fechaInicio, fechaFinalizado, edificacion, config)
        await levantamientoDomainIntancie.cargarSistemas(await config.sistemasConfig, deteriorosLevantamiento)
        // Despues de cargada toda la inforamción del levantamiento, se procesan los calculos
        return levantamientoDomainIntancie
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
    public async cargarSistemas(sistemasConfig: Array<SistemaConfig>, deteriorosLevantamiento: Array<Deterioro>) {
        this.sistemas = new Array<Sistema>
        for (let index = 0; index < sistemasConfig.length; index++) {
            const sistemaConfig = sistemasConfig[index]
            this.sistemas.push(await Sistema.createInstancie(sistemaConfig.id, sistemaConfig.nombre, await sistemaConfig.subSistemasConfig, await sistemaConfig.herramienta, this,
                this.determinarDeteriorosSistema(deteriorosLevantamiento, sistemaConfig.id)))
        }
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
    private async cantTiposDeterioroWithIndicador(indicador: Indicador): Promise<number> {
        let cant: number = 0
        // se recorren todos los sistemas del levantamiento y se les pregunta por la cantidad de tipos de deteriros que asociados que tienen un indicador en especifico
        for (let index = 0; index < this.sistemas.length; index++) {
            const sistema: Sistema = this.sistemas[index]
            cant += await sistema.cantTiposDeterioroWithIndicador(indicador)

        }
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
    public async obtenerIndicadorCalculo(valorCalculo: number, calculo: Calculos): Promise<Indicador> {
        return await this.config.obtenerIndicadorCalculo(valorCalculo, calculo) // se obtiene el valor del inidicador necesario
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

    public async obtenerIndiceCriticidad(): Promise<number> {
        let criticidad: number = 0
        for (let index = 0; index < this.sistemas.length; index++) {
            const sistema = this.sistemas[index]
            criticidad += await sistema.obtenerIndiceCriticidad()
        }

        this.criticidad = criticidad

        return this.criticidad

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
    public async obtenerIndicadoresByIndiceCalculable(calculo: Calculos): Promise<Array<Indicador> | undefined> {
        return await this.config.obtenerInicadoresByIndiceCalculable(calculo)
    }

    // Metodo para calcular el porcentaje de deterioros que presentan ese indicador
    private async obtenerPorcientoIndicador(indicador: Indicador): Promise<number> {
        let porciento: number = 0
        let totalTipoDeterioros: number = this.obtenerCantidadTiposDeterioros() // se obtiene la cantidad de tipos de deterioro en total
        if (totalTipoDeterioros) // si existe al menos un tipo de deterioro registrado en el levantamiento
            porciento = await (this.cantTiposDeterioroWithIndicador(indicador)) * 100 / totalTipoDeterioros

        return porciento
    }

    // Metodo para obtener el porcentaje de criticidad por indicador

    public async obtenerPorcentajeData(): Promise<[String, number][]> {
        const mapData: Map<String, number> = new Map<String, number>() // se crea un mapa para almacenar la info (la clave representa el inidicador; el valor representa el porcentaje)
        // Obtener los indicadores definidos para el analisis de criticidad
        const indicadoresAnalisisCriticidad: Array<Indicador> | undefined = await this.obtenerIndicadoresByIndiceCalculable(Calculos.Criticidad)  // se obtienen los indicadores del indice de criticidad

        if (indicadoresAnalisisCriticidad) // si fue obtenido correctamente los indicadores del calculo
            for (let index = 0; index < indicadoresAnalisisCriticidad.length; index++) {
                const indicador: Indicador = indicadoresAnalisisCriticidad[index]
                mapData.set(indicador.nombre, await this.obtenerPorcientoIndicador(indicador))
            }

        this.porcentajeData = Array.from(mapData.entries()) // se convierte en array la info del map para ser serializada correctamente

        return this.porcentajeData

    }

    // Fin de Operaciones

}

import { Material } from "./material.domain";
import { Deterioro } from "src/controlador-edificaciones/deterioro/deterioro.entity";
import { MaterialConfig } from "src/configs/materiales-config/material-config.entity";
import { Sistema } from "./sistema.domain";
import { LevantamientoDomain } from "./levantamiento.domain";
import { Exclude, Expose } from "class-transformer";
import { Indicador } from "src/configs/indicador/indicador.entity";
import { Calculos } from "src/configs/indice-calculable/indice-calculable.entity";
import { TipoDeterioro } from "./tipo-deterioro.domain";

export class SubSistema {
    //subSistemaConfig: SubsistemaConfig // referencia de memoria del subSistema definido en configuracion
    id: number
    nombre: String
    @Exclude()
    materiales: Array<Material> // atributo que define La *información* de los materiales de un subSistema
    @Exclude()
    levantamiento: LevantamientoDomain

    constructor(id: number,
        nombre: String,
        materialesConfig: Array<MaterialConfig>,
        deteriorosSubsistema: Array<Deterioro>,
        sistema: Sistema,
        levantamiento: LevantamientoDomain) {

        this.id = id
        this.nombre = nombre
        this.levantamiento = levantamiento
        this.cargarMateriales(materialesConfig, deteriorosSubsistema, sistema, levantamiento) // se cargan los materiales pertenecientes al subsistema
    }


    // Getts

    public getMateriales() {
        return this.materiales
    }

    public getMaterial(idMaterial: number) {
        return this.materiales.find(material => material.id === idMaterial)
    }

      // Metodo para obtener los tipos de deteriro asociados a un material en especifico
      public getTiposDeteriorosMaterial(idMaterial: number) {
        const material: Material = this.getMaterial(idMaterial); // se obtiene al material
        let tiposDeterioros: Array<TipoDeterioro> | undefined = undefined;

        if (material) // se fue encontrado el material
        tiposDeterioros = material.getTiposDeterioros() // se obtienen los tipos de deterioro asociados al material

        return tiposDeterioros

    }

    // Metodo para determinar la cantidad de tipos de deterioro que coinciden con un indicador en específico
    public cantTiposDeterioroWithIndicador(indicador: Indicador) {
        let cant: number = 0
        // se recorren todos los materiales del subsistema y se les pregunta por la cantidad de tipos de deteriros que asociados que tienen un indicador en especifico
        this.materiales.forEach((material) => {
            cant += material.cantTiposDeterioroWithIndicador(indicador)
        })
        return cant
    }

    // Metodo para cargar los materiales del subsistema
    public cargarMateriales(materialesConfig: Array<MaterialConfig>, deteriorosSubsistema: Array<Deterioro>, sistema: Sistema, levantamiento: LevantamientoDomain) {
        this.materiales = new Array<Material>
        materialesConfig.forEach((materialConfig) => {
            this.materiales.push(new Material(materialConfig.id, materialConfig.nombre, materialConfig.tiposDeteriorosConfig,
                this.determinarDeteriorosMaterial(deteriorosSubsistema, materialConfig.id), sistema, levantamiento))
        })
    }

    // Metodo para obtener todos los deterioros del subsistema pertenecientes a al material
    private determinarDeteriorosMaterial(deteriorosSubsistema: Array<Deterioro>, idMaterial: number) {
        const deteriorosMaterial: Array<Deterioro> = new Array<Deterioro>()
        deteriorosSubsistema.forEach((deterioro) => {
            if (deterioro.idMaterial === idMaterial) // si el deterioro pertenece al sistema
                deteriorosMaterial.push(deterioro)
        })

        return deteriorosMaterial
    }

    // Metodo para obtener la cantidad de tipos de deterioros asociados al subsistema
    public obtenerCantidadTiposDeterioros() {
        let cant = 0
        // se recorre la lista de materiales asociados al subsistema y se les pregunta por la cantidad de tipos de deterioros asociados
        this.materiales.forEach((material) => {
            cant += material.cantTiposDeterioros()
        })

        return cant
    }

    // Operaciones
    @Exclude()
    public obtenerCantidadDeterioros(): number {
        let cantDeterioros: number = 0

        this.materiales.forEach((material) => {
            cantDeterioros += material.obtenerCantidadDeterioros()
        })

        return cantDeterioros
    }

    // Metodo para calcular la criticidad de un subsistema
    // Metodo para calcular la criticidad de un subsistema
    @Expose()
    public obtenerIndiceCriticidad(): number {
        let criticidad: number = 0
        this.materiales.forEach((material) => {
            criticidad += material.obtenerIndiceCriticidad()
        })

        return criticidad
    }

    // Metodo para calcular el porcentaje de deterioros que presentan ese indicador
    private obtenerPorcientoIndicador(indicador: Indicador): number {
        let porciento: number = 0
        let totalTipoDeterioros: number = this.obtenerCantidadTiposDeterioros() // se obtiene la cantidad de tipos de deterioro en total
        if (totalTipoDeterioros) // si existe al menos un tipo de deterioro registrado en el subsistema
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
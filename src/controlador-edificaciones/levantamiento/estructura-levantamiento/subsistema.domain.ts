
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
    criticidad: number
    porcentajeData: [String, number][]
    @Exclude()
    materiales: Array<Material> // atributo que define La *información* de los materiales de un subSistema
    @Exclude()
    levantamiento: LevantamientoDomain

    private constructor(id: number,
        nombre: String,
        levantamiento: LevantamientoDomain) {

        this.id = id
        this.nombre = nombre
        this.levantamiento = levantamiento
    }

    // constructor para cargas asíncronas
    public static async createInstancie(id: number,
        nombre: String,
        materialesConfig: Array<MaterialConfig>,
        deteriorosSubsistema: Array<Deterioro>,
        sistema: Sistema,
        levantamiento: LevantamientoDomain): Promise<SubSistema> {
        const subSistemaInstancie: SubSistema = new SubSistema(id, nombre, levantamiento)
        await subSistemaInstancie.cargarMateriales(materialesConfig, deteriorosSubsistema, sistema, levantamiento)

        return subSistemaInstancie
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
    public async cantTiposDeterioroWithIndicador(indicador: Indicador): Promise<number> {
        let cant: number = 0
        // se recorren todos los materiales del subsistema y se les pregunta por la cantidad de tipos de deteriros que asociados que tienen un indicador en especifico
        for (let index = 0; index < this.materiales.length; index++) {
            const material: Material = this.materiales[index]
            cant += await material.cantTiposDeterioroWithIndicador(indicador)
        }
        return cant
    }

    // Metodo para cargar los materiales del subsistema
    public async cargarMateriales(materialesConfig: Array<MaterialConfig>, deteriorosSubsistema: Array<Deterioro>, sistema: Sistema, levantamiento: LevantamientoDomain) {
        this.materiales = new Array<Material>
        for (let index = 0; index < materialesConfig.length; index++) {
            const materialConfig: MaterialConfig = materialesConfig[index]
            this.materiales.push(await Material.createInstancie(materialConfig.id, materialConfig.nombre, await materialConfig.tiposDeteriorosConfig,
                this.determinarDeteriorosMaterial(deteriorosSubsistema, materialConfig.id), sistema, levantamiento))
        }
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
    @Expose()
    public obtenerCantidadDeterioros(): number {
        let cantDeterioros: number = 0

        this.materiales.forEach((material) => {
            cantDeterioros += material.obtenerCantidadDeterioros()
        })

        return cantDeterioros
    }

    // Metodo para calcular la criticidad de un subsistema
    // Metodo para calcular la criticidad de un subsistema
  
    public async obtenerIndiceCriticidad(): Promise<number> {
        let criticidad: number = 0
        for (let index = 0; index < this.materiales.length; index++) {
            const material: Material = this.materiales[index]
            criticidad += await material.obtenerIndiceCriticidad()
        }

        this.criticidad = criticidad // se almacena el resultado del cálculo para la serialización

        return criticidad
    }

    // Metodo para calcular el porcentaje de deterioros que presentan ese indicador
    private async obtenerPorcientoIndicador(indicador: Indicador): Promise<number> {
        let porciento: number = 0
        let totalTipoDeterioros: number = this.obtenerCantidadTiposDeterioros() // se obtiene la cantidad de tipos de deterioro en total
        if (totalTipoDeterioros) // si existe al menos un tipo de deterioro registrado en el subsistema
            porciento = await this.cantTiposDeterioroWithIndicador(indicador) * 100 / totalTipoDeterioros

        return porciento
    }

    // Metodo para obtener el porcentaje de criticidad por indicador
    
    public async obtenerPorcentajeData() {
        const mapData: Map<String, number> = new Map<String, number>() // se crea un mapa para almacenar la info (la clave representa el inidicador; el valor representa el porcentaje)
        // Obtener los indicadores definidos para el analisis de criticidad
        const indicadoresAnalisisCriticidad: Array<Indicador> | undefined = await this.levantamiento.obtenerIndicadoresByIndiceCalculable(Calculos.Criticidad)  // se obtienen los indicadores del indice de criticidad

        if (indicadoresAnalisisCriticidad) // si fue obtenido correctamente los indicadores del calculo
            for (let index = 0; index < indicadoresAnalisisCriticidad.length; index++) {
                const indicador: Indicador = indicadoresAnalisisCriticidad[index]
                mapData.set(indicador.nombre, await this.obtenerPorcientoIndicador(indicador))
            }

            this.porcentajeData = Array.from(mapData.entries()) // se almacena el resultado del cálculo para la serialización

        return Array.from(mapData.entries()) // se convierte en array la info del map para ser serializada correctamente

    }
    // Fin Operaciones


}
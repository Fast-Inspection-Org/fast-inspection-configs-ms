import { CampoDefinido } from "src/configs/campo-definido/campo-definido.entity";
import { Causa } from "src/configs/causa/causa.entity";
import { Deterioro } from "src/controlador-edificaciones/deterioro/deterioro.entity";
import { Sistema } from "./sistema.domain";
import { LevantamientoDomain } from "./levantamiento.domain";
import { Indicador } from "src/configs/indicador/indicador.entity";
import { Exclude, Expose } from "class-transformer";

export abstract class TipoDeterioro {
    //tipoDeterioroConfig: TipoDeterioroConfig // referencia de memoria del tipo de deterioro definido en configuracion
    id: number
    nombre: String
    criticidad: String
    @Exclude()
    tipo: String
    @Exclude()
    detectabilidad: number
    @Exclude()
    sistema: Sistema // referencia al sistema al cual forma parte del tipo de deterioro (Para ralización de los calculos)
    @Exclude()
    levantamiento: LevantamientoDomain // referencia al levantamiento al cual pertenece ( para la realización de los calculos)
    @Exclude()
    camposDefinidos: Array<CampoDefinido> // Atributo que representa los campos definidos para este tipo de deterioro
    @Exclude()
    causas: Array<Causa> // Atributo que define las causas para este tipo de deterioro
    @Exclude()
    deterioros: Array<Deterioro> // atributo que define La *información* de los deterioros asociados a un tipo de material


    constructor(id: number,
        nombre: String,
        tipo: String,
        detectabilidad: number,
        sistema: Sistema,
        levantamiento: LevantamientoDomain,
        camposDefinidos: Array<CampoDefinido>,
        causas: Array<Causa>,
        deterioros: Array<Deterioro>) {

        this.id = id
        this.nombre = nombre
        this.tipo = tipo
        this.detectabilidad = detectabilidad
        this.sistema = sistema
        this.levantamiento = levantamiento
        this.camposDefinidos = camposDefinidos
        this.causas = causas
        this.deterioros = deterioros
    }

    // Operaciones
    // Método para obtener la criticidad del tipo de deterioro
   
    public async obtenerCriticidad(): Promise<String> {
        const indicadorCriticidad: Indicador = await this.obtenerIndiceCriticidad()
        this.criticidad = indicadorCriticidad.nombre // se almacena el resultado cálculo para su posterior serialización
        return indicadorCriticidad.nombre
    }
    public abstract obtenerIndiceCriticidad(): Promise<Indicador>;

    // Método para obtener la cantidad de deterioros asociados a este tipo de deterioro
    @Expose()
    public obtenerCantidadDeterioros(): number {
        return this.deterioros.length
    }

}
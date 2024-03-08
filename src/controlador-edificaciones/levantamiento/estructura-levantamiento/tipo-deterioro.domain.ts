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
    tipo: string
    detectabilidad: number
    @Exclude()
    sistema: Sistema // referencia al sistema al cual forma parte del tipo de deterioro (Para ralización de los calculos)
    @Exclude()
    levantamiento: LevantamientoDomain // referencia al levantamiento al cual pertenece ( para la realización de los calculos)
    camposDefinidos: Array<CampoDefinido> // Atributo que representa los campos definidos para este tipo de deterioro
    causas: Array<Causa> // Atributo que define las causas para este tipo de deterioro
    deterioros: Array<Deterioro> // atributo que define La *información* de los deterioros asociados a un tipo de material


    constructor(id: number,
        nombre: String,
        tipo: string,
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

    public abstract obtenerIndiceCriticidad(): Indicador;



    // Metodo para obtener la cantidad de deterioros asociados a este tipo de deterioro
    @Expose()
    public obtenerCantidadDeterioros(): number {
        return this.deterioros.length
    }


}
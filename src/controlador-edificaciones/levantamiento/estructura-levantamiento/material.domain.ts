
import { TipoDeterioroConfig, TipoTipoDeterioro } from "src/configs/tipo-deterioros-config/tipo-deterioro-config.entity";
import { TipoDeterioro } from "./tipo-deterioro.domain";
import { Deterioro } from "src/controlador-edificaciones/deterioro/deterioro.entity";
import { TipoDeterioroAnalisisCriticidad } from "./tipo-deterioro-analisis-criticidad.domain";
import { Sistema } from "./sistema.domain";
import { TipoDeterioroAnalisisCriticidadConfig } from "src/configs/tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.entity";
import { LevantamientoDomain } from "./levantamiento.domain";

export class Material {
    //materialConfig: MaterialConfig // referencia de memoria del material definido en configuracion
    id: number // Atributo unico
    nombre: String
    tiposDeterioros: Array<TipoDeterioro> // atributo que define La *información* de los tipo de deterioro de un material

    constructor(id: number, nombre: String, tiposDeteriorosConfig: Array<TipoDeterioroConfig>, deteriorosMaterial: Array<Deterioro>, sistema: Sistema, levantamiento: LevantamientoDomain) {
        this.id = id
        this.nombre = nombre
        this.cargarTiposDeterioros(tiposDeteriorosConfig, deteriorosMaterial, sistema, levantamiento) // se cargan los tipos de deterioros pertenecientes al material
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
    public obtenerCantidadDeterioros(): number {
        let cantDeterioros: number = 0

        this.tiposDeterioros.forEach((tipoDeterioro) => {
            cantDeterioros += tipoDeterioro.obtenerCantidadDeterioros()
        })

        return cantDeterioros
    }
    // Fin Operaciones

}
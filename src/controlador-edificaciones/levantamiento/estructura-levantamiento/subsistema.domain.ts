
import { Material } from "./material.domain";
import { Deterioro } from "src/controlador-edificaciones/deterioro/deterioro.entity";
import { MaterialConfig } from "src/configs/materiales-config/material-config.entity";
import { Sistema } from "./sistema.domain";
import { LevantamientoDomain } from "./levantamiento.domain";

export class SubSistema {
    //subSistemaConfig: SubsistemaConfig // referencia de memoria del subSistema definido en configuracion
    id: number
    nombre: String
    materiales: Array<Material> // atributo que define La *información* de los materiales de un subSistema

    constructor(id: number,
        nombre: String,
        materialesConfig: Array<MaterialConfig>,
        deteriorosSubsistema: Array<Deterioro>,
        sistema: Sistema,
        levantamiento: LevantamientoDomain) {

        this.id = id
        this.nombre = nombre
        this.cargarMateriales(materialesConfig, deteriorosSubsistema, sistema, levantamiento) // se cargan los materiales pertenecientes al subsistema
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

       // Operaciones
       public obtenerCantidadDeterioros(): number {
        let cantDeterioros: number = 0

        this.materiales.forEach((material) => {
            cantDeterioros += material.obtenerCantidadDeterioros()
        })

        return cantDeterioros
    }
    // Fin Operaciones


}
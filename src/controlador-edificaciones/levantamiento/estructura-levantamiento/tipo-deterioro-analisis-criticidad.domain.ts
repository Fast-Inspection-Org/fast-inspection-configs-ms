import { Campo } from "src/configs/campo/campo.entity";
import { TipoDeterioro } from "./tipo-deterioro.domain";
import { Sistema } from "./sistema.domain";
import { CampoDefinido } from "src/configs/campo-definido/campo-definido.entity";
import { Causa } from "src/configs/causa/causa.entity";
import { Deterioro } from "src/controlador-edificaciones/deterioro/deterioro.entity";
import { Levantamiento } from "../levantamiento.entity";
import { LevantamientoDomain } from "./levantamiento.domain";
import { Calculos } from "src/configs/indice-calculable/indice-calculable.entity";
import { Indicador } from "src/configs/indicador/indicador.entity";

export class TipoDeterioroAnalisisCriticidad extends TipoDeterioro {

    camposAfectados: Array<Campo> // Representa los campos afectados por ese levantamieto

    constructor(id: number,
        nombre: String,
        tipo: string,
        detectabilidad: number,
        sistema: Sistema,
        levantamiento: LevantamientoDomain,
        camposDefinidos: Array<CampoDefinido>,
        causas: Array<Causa>,
        deterioros: Array<Deterioro>,
        camposAfectados: Array<Campo>) {

        super(id, nombre, tipo, detectabilidad, sistema, levantamiento, camposDefinidos, causas, deterioros)
        this.camposAfectados = camposAfectados

    }

    // Operaciones
    public procesarCriticidad() {
        this.indiceCriticidad = this.obtenerIndiceCriticidad()
    }


    // Metodo para obtener el indice de criticidad del tipo de deterioro
    public obtenerIndiceCriticidad(): Indicador {
        return this.levantamiento.obtenerIndicadorCalculo(this.obtenerIndiceFrecuencia() * this.obtenerIndiceDetectabilidad() * this.obtenerIndiceImportancia(), Calculos.Criticidad)
    }
    // Metodo para obtener el indice de detecatabilidad del tipo de deterioro
    private obtenerIndiceDetectabilidad(): number {
        return this.levantamiento.obtenerIndicadorCalculo(this.detectabilidad, Calculos.Detectabilidad).valor // se manda a obtener el valor del indicador para este valor calculado
    }
    // Metodo para obtener el indice de importancia del tipo de deterioro
    private obtenerIndiceImportancia(): number {
        // Lo primero es obtener la sumatoria de las importancias de cada campo afectado y luego se obtiene un indicador
        return this.levantamiento.obtenerIndicadorCalculo(this.obtenerSumatoriaImportancias(), Calculos.Impacto).valor
    }
    // Metodo para obtener el indice de frecuencia del tipo de deterioro
    private obtenerIndiceFrecuencia(): number {
        return (this.obtenerCantidadDeterioros() / this.sistema.obtenerCantidadDeterioros()) * 100.0
    }

    // Metodo para obtener la sumatoria de las importancias de cada campo afectado
    private obtenerSumatoriaImportancias() {
        let sumatoriaImportancia: number = 0

        // se ejecuta un recorrido por los campos y se ejecuta una suma
        this.camposAfectados.forEach((campoAfectado) => {
            sumatoriaImportancia += campoAfectado.nivelImportancia
        })

        return sumatoriaImportancia

    }
    // Fin de Operaciones
}
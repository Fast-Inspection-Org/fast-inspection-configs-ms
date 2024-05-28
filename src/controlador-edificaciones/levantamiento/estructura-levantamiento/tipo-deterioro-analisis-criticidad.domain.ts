import { Campo } from "src/configs/campo/campo.entity";
import { TipoDeterioro } from "./tipo-deterioro.domain";
import { Sistema } from "./sistema.domain";
import { CampoDefinido } from "src/configs/campo-definido/campo-definido.entity";
import { Causa } from "src/configs/causa/causa.entity";
import { Deterioro } from "src/controlador-edificaciones/deterioro/deterioro.entity";
import { LevantamientoDomain } from "./levantamiento.domain";
import { Calculos } from "src/configs/indice-calculable/indice-calculable.entity";
import { Indicador } from "src/configs/indicador/indicador.entity";
import { Expose } from "class-transformer";

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

    // Metodo para obtener el indice de criticidad del tipo de deterioro

    public async obtenerIndiceCriticidad(): Promise<Indicador> {
        return await this.levantamiento.obtenerIndicadorCalculo(this.obtenerIndiceFrecuencia() * await this.obtenerIndiceDetectabilidad() * await this.obtenerIndiceImportancia(), Calculos.Criticidad)
    }
    // Metodo para obtener el indice de detecatabilidad del tipo de deterioro
    private async obtenerIndiceDetectabilidad(): Promise<number> {
        const indicador: Indicador = await this.levantamiento.obtenerIndicadorCalculo(this.detectabilidad, Calculos.Detectabilidad)
        return indicador.valor // se manda a obtener el valor del indicador para este valor calculado
    }
    // Metodo para obtener el indice de importancia del tipo de deterioro
    private async obtenerIndiceImportancia(): Promise<number> {
        // Lo primero es obtener la sumatoria de las importancias de cada campo afectado y luego se obtiene un indicador
        const indicador: Indicador = await this.levantamiento.obtenerIndicadorCalculo(this.obtenerSumatoriaImportancias(), Calculos.Impacto)
        return indicador.valor
    }
    // Metodo para obtener el indice de frecuencia del tipo de deterioro
    private obtenerIndiceFrecuencia(): number {
        const cantTotalDeteriorosSistema: number = this.sistema.obtenerCantidadDeterioros()
        const cantTotalDeteriorosTipoDeterioro: number = this.obtenerCantidadDeterioros()
        let porcientoOcurrencia: number = 0

        if (cantTotalDeteriorosSistema != 0) // si la cantidad de deterioros del sistema es 0 entonces se calcula el pociento
            (cantTotalDeteriorosTipoDeterioro / cantTotalDeteriorosSistema) * 100.0

        return porcientoOcurrencia
    }

    // Metodo para obtener la sumatoria de las importancias de cada campo afectado
    private obtenerSumatoriaImportancias(): number {
        let sumatoriaImportancia: number = 0

        // se ejecuta un recorrido por los campos y se ejecuta una suma
        this.camposAfectados.forEach((campoAfectado) => {
            sumatoriaImportancia += campoAfectado.nivelImportancia
        })

        return sumatoriaImportancia

    }
    // Fin de Operaciones
}
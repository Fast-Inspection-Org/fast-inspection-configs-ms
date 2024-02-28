import { Entity, ManyToOne } from "typeorm";
import { Indicador } from "../indicador/indicador.entity";
import { IndiceCalculableSinIntervalo } from "../indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.entity";

@Entity("indicadorSinIntervalo")
export class IndicadorSinIntervalo extends Indicador {
    @ManyToOne(() => IndiceCalculableSinIntervalo, indiceCalculableSinIntervalo => indiceCalculableSinIntervalo.indicadoresSinIntervalos, { onDelete: "CASCADE" })
    indiceCalculableSinIntervalo: IndiceCalculableSinIntervalo // Atributo que define el indiceCalculable sin intervalos al que pertenece el indicador sin intervalos

    constructor (nombre: String, valor: number, indiceCalculableSinIntervalo: IndiceCalculableSinIntervalo) {
        super (nombre, valor)
        this.indiceCalculableSinIntervalo = indiceCalculableSinIntervalo
    }
}
import { ChildEntity, Column, ManyToOne } from "typeorm";
import { Indicador, TipoIndicador } from "../indicador/indicador.entity";
import { IndiceCalculableSinIntervalo } from "../indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.entity";
import { Exclude } from "class-transformer";


@ChildEntity("indicadorSinIntervalo")
export class IndicadorSinIntervalo extends Indicador {

    @Exclude()
    @Column()
    indiceCalculableSinIntervaloId: number
    @Exclude()
    @ManyToOne(() => IndiceCalculableSinIntervalo, indiceCalculableSinIntervalo => indiceCalculableSinIntervalo.indicadoresSinIntervalos, { onDelete: "CASCADE" })
    indiceCalculableSinIntervalo: IndiceCalculableSinIntervalo // Atributo que define el indiceCalculable sin intervalos al que pertenece el indicador sin intervalos

    constructor(id?: number, nombre?: String, valor?: number, tipo?: TipoIndicador, indiceCalculableSinIntervalo?: IndiceCalculableSinIntervalo) {
        super(id, nombre, valor, tipo)
        this.indiceCalculableSinIntervalo = indiceCalculableSinIntervalo
    }
}
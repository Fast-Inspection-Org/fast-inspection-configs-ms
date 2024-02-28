import { Column, Entity, ManyToOne } from "typeorm";
import { Indicador } from "../indicador/indicador.entity";
import { IndiceCalculableIntervalo } from "../indice-calculable-intervalo/indice-calculable-intervalo.entity";
@Entity("indicadorIntervalo")
export class IndicadorIntervalo extends Indicador {
    @Column()
    limiteInferior: number // Atributo que representa el limite inferior del intervalo
    @Column()
    limiteSuperior: number // Atributo que representa el limite superior del intervalo
    @ManyToOne(() => IndiceCalculableIntervalo, indiceCalculableIntervalo => indiceCalculableIntervalo.indicadoresIntervalos, { onDelete: "CASCADE" })
    indiceCalculableIntervalo: IndiceCalculableIntervalo // Atributo que define el indice calculable por intervalos al que pertenece el indicador

    constructor(nombre: String, valor: number, limiteInferior: number, limiteSuperior: number, indiceCalculableIntervalo: IndiceCalculableIntervalo) {
        super(nombre, valor)
        this.limiteInferior = limiteInferior
        this.limiteSuperior = limiteSuperior
        this.indiceCalculableIntervalo = indiceCalculableIntervalo
    }
}
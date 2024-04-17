import { ChildEntity, Column, ManyToOne } from "typeorm";
import { Indicador } from "../indicador/indicador.entity";
import { IndiceCalculableIntervalo } from "../indice-calculable-intervalo/indice-calculable-intervalo.entity";


@ChildEntity("indicadorIntervalo")
export class IndicadorIntervalo extends Indicador {
    
    @Column()
    limiteInferior: number // Atributo que representa el limite inferior del intervalo
    
    @Column()
    limiteSuperior: number // Atributo que representa el limite superior del intervalo
    
    @Column()
    indiceCalculableIntervaloId: number
   
    @ManyToOne(() => IndiceCalculableIntervalo, indiceCalculableIntervalo => indiceCalculableIntervalo.indicadoresIntervalos, { onDelete: "CASCADE" })
    indiceCalculableIntervalo: IndiceCalculableIntervalo // Atributo que define el indice calculable por intervalos al que pertenece el indicador

    constructor(id?: number, nombre?: String, valor?: number, tipo?: string, limiteInferior?: number, limiteSuperior?: number, indiceCalculableIntervalo?: IndiceCalculableIntervalo) {
        super(id, nombre, valor, tipo)
        this.limiteInferior = limiteInferior
        this.limiteSuperior = limiteSuperior
        this.indiceCalculableIntervalo = indiceCalculableIntervalo
    }

    // Metodo para verificar si un valor esta en rango
    public isRange(valorCalculo: number): boolean {
        return valorCalculo >= this.limiteInferior && valorCalculo <= this.limiteSuperior ? true : false
    }
}
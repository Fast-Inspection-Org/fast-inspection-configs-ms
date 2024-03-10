import { ChildEntity, Entity, ManyToOne, OneToMany } from "typeorm";
import { Calculos, IndiceCalculable } from "../indice-calculable/indice-calculable.entity";
import { IndicadorIntervalo } from "../indicador-intervalo/indicador-intervalo.entity";
import { Config } from "../config.entity";
import { Indicador } from "../indicador/indicador.entity";

@ChildEntity("indiceCalculableIntervalo")
export class IndiceCalculableIntervalo extends IndiceCalculable {

    @OneToMany(() => IndicadorIntervalo, indicadorIntervalo => indicadorIntervalo.indiceCalculableIntervalo, { eager: true })
    indicadoresIntervalos: Array<IndicadorIntervalo> // Un indice calculable por intervalos puede tener varios indicadores de intervalos



    constructor(id?: number, nombre?: String, config?: Config, tipo?: string, calculo?: number) {
        super(id, nombre, config, tipo, calculo)
    }


    public replicarVersion() {
        super.replicarVersion()
        this.replicarVersionIndicadoresIntervalos() // se replica la version de los indicadores intervalos
    }

    private replicarVersionIndicadoresIntervalos() {
        this.indicadoresIntervalos.forEach((indicadorIntervalo) => {
            indicadorIntervalo.replicarVersion() // se replica la version del indicador intervalo
        })
    }

    // Metodo para obtener el indicador correspondiente a un valor calculado
    public obtenerIndicadorCalculo(valorCalculo: number): Indicador{
        let indicador: Indicador | undefined = undefined
        
        for (let index = 0; index < this.indicadoresIntervalos.length && !indicador; index++) {
            if (this.indicadoresIntervalos[index].isRange(valorCalculo)) // si el valor calculado está en el rango del indicador, significa que encontramos el indicador
                indicador = this.indicadoresIntervalos[index]

        }

        return indicador
    }
}
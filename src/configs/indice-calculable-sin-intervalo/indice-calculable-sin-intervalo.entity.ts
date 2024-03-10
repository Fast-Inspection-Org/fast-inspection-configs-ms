import { ChildEntity, Entity, ManyToOne, OneToMany } from "typeorm";
import { IndiceCalculable } from "../indice-calculable/indice-calculable.entity";
import { IndicadorSinIntervalo } from "../indicador-sin-intervalo/indicador-sin-intervalo.entity";
import { Config } from "../config.entity";
import { Indicador } from "../indicador/indicador.entity";

@ChildEntity("indiceCalculableSinIntervalo")
export class IndiceCalculableSinIntervalo extends IndiceCalculable {
    @OneToMany(() => IndicadorSinIntervalo, indicadorSinIntervalo => indicadorSinIntervalo.indiceCalculableSinIntervalo, { eager: true })
    indicadoresSinIntervalos: Array<IndicadorSinIntervalo> // Atributo que define los indicadores sin intervalos del indice calculable sin intervalos


    constructor(id?: number, nombre?: String, config?: Config, tipo?: string, calculo?: number) {
        super(id, nombre, config, tipo, calculo)
    }

    public replicarVersion() {
        super.replicarVersion()
        this.replicarVersionIndicadoresSinIntervalos() // se replica la version de los indicadores sin intervalos
    }

    private replicarVersionIndicadoresSinIntervalos() {
        this.indicadoresSinIntervalos.forEach((indicadorSinIntervalo) => {
            indicadorSinIntervalo.replicarVersion() // se replica la version del indicador sin intervalo
        })
    }

    // Metodo para obtener el indicador correspondiente a un valor calculado
    public obtenerIndicadorCalculo(valorCalculo: number): Indicador {
        let indicador: Indicador | undefined = undefined
        
        for (let index = 0; index < this.indicadoresSinIntervalos.length && !indicador; index++) {
            if (this.indicadoresSinIntervalos[index].valor == valorCalculo) // si el valor calculado es igual 
                indicador = this.indicadoresSinIntervalos[index]

        }

        return indicador
    }
}
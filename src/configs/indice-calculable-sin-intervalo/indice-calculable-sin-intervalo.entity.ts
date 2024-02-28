import { Entity, ManyToOne, OneToMany } from "typeorm";
import { IndiceCalculable } from "../indice-calculable/indice-calculable.entity";
import { IndicadorSinIntervalo } from "../indicador-sin-intervalo/indicador-sin-intervalo.entity";
import { Config } from "../config.entity";

@Entity("indiceCalculableSinIntervalo")
export class IndiceCalculableSinIntervalo extends IndiceCalculable {
    @OneToMany(() => IndicadorSinIntervalo, indicadorSinIntervalo => indicadorSinIntervalo.indiceCalculableSinIntervalo, {eager: true})
    indicadoresSinIntervalos: Array<IndicadorSinIntervalo> // Atributo que define los indicadores sin intervalos del indice calculable sin intervalos
    @ManyToOne(() => Config, config => config.indicesCalculablesSinIntervalo, {onDelete: "CASCADE"})
    config: Config // Atributo que representa la configuracion donde esta definido los indices calculables

    constructor (nombre: String, config: Config) {
        super(nombre)
        this.config = config
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
}
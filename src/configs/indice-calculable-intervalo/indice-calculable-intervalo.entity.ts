import { Entity, ManyToOne, OneToMany } from "typeorm";
import { IndiceCalculable } from "../indice-calculable/indice-calculable.entity";
import { IndicadorIntervalo } from "../indicador-intervalo/indicador-intervalo.entity";
import { Config } from "../config.entity";

@Entity("indiceCalculableIntervalo")
export class IndiceCalculableIntervalo extends IndiceCalculable {
    @OneToMany(() => IndicadorIntervalo, indicadorIntervalo => indicadorIntervalo.indiceCalculableIntervalo, { eager: true })
    indicadoresIntervalos: Array<IndicadorIntervalo> // Un indice calculable por intervalos puede tener varios indicadores de intervalos
    @ManyToOne(() => Config, config => config.indicesCalculablesIntervalo, { onDelete: "CASCADE" })
    config: Config // Atributo que representa la configuracion donde esta definido los indices calculables


    constructor(nombre: String, config: Config) {
        super(nombre)
        this.config = config
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
}
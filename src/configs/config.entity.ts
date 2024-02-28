import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SistemaConfig } from "./sistemas-config/sistema-config.entity";
import { HerramientaAnalisisCriticidad } from "./herramienta-analisis-criticidad/herrramienta-analisis-criticidad.entity";
import { IndiceCalculableIntervalo } from "./indice-calculable-intervalo/indice-calculable-intervalo.entity";
import { IndiceCalculableSinIntervalo } from "./indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.entity";

@Entity("config")
export class Config {
    @PrimaryGeneratedColumn()
    version: number // atributo que representa la version de la configuración y su identificador unico
    @Column({ unique: true })
    nombre: String
    @Column()
    descripcion: String
    @Column()
    state: boolean // Atributo que define el estado de la configuración (true: terminada, false: en progreso)
    @OneToMany(() => HerramientaAnalisisCriticidad, herramienta => herramienta.config, { eager: true })
    herramientasAnalisisCriticidad: Array<HerramientaAnalisisCriticidad> // Una configuracion puede tener muchas herramientas registradas
    @OneToMany(() => IndiceCalculableIntervalo, indiceCalculable => indiceCalculable.config, { eager: true })
    indicesCalculablesIntervalo: Array<IndiceCalculableIntervalo> // Atributo que representa los indices calculables por intervalo definidos en la configuracion
    @OneToMany(() => IndiceCalculableSinIntervalo, indiceCalculable => indiceCalculable.config, { eager: true })
    indicesCalculablesSinIntervalo: Array<IndiceCalculableSinIntervalo> // Atributo que representa los indices calculables por intervalo definidos en la configuracion
    @OneToMany(() => SistemaConfig, sistemaConfig => sistemaConfig.config, { eager: true })
    sistemasConfig: Array<SistemaConfig> // Una configuracion tiene muchos sistemas definidos
    // Se define la herencia con las herramientas


    constructor(version?: number, nombre?: String, sistemasConfig?: Array<SistemaConfig>, herramientasAnalisisCriticidad?: Array<HerramientaAnalisisCriticidad>,
        indicesCalculablesIntervalo?: Array<IndiceCalculableIntervalo>, indicesCalculablesSinIntervalo?: Array<IndiceCalculableSinIntervalo>) {
        this.version = version
        this.nombre = nombre
        this.herramientasAnalisisCriticidad = herramientasAnalisisCriticidad
        this.indicesCalculablesIntervalo = indicesCalculablesIntervalo
        this.indicesCalculablesSinIntervalo = indicesCalculablesSinIntervalo
        this.sistemasConfig = sistemasConfig
        this.state = false // se marca como herramienta en progreso
    }


    public replicarVersion() {
        this.version = undefined // Marcar el id único como unifine equivale a replicar versión
        this.replicarVersionesHerramientasAnalisisCriticidad() // se replica la version de las herramientas analisis de criticidad
        this.replicarVersionesIndicesCalculablesIntervalo // se replica la version de los indices calculables con intervalo
        this.replicarVersionesIndicesCalculablesSinIntervalo // se replica la version de los indices calculables sin intervalo  
        this.replicarVersionesSistemasConfig() // se replica la version de los sistemas config
    }

    // Metodo para replicar las versiones de las herramientas analisis de criticidad
    private replicarVersionesHerramientasAnalisisCriticidad() {
        if (this.herramientasAnalisisCriticidad)
            this.herramientasAnalisisCriticidad.forEach((herramienta) => {
                herramienta.replicarVersion() // se replica la version de la herramientaAnalisisCriticidad
            })
    }

    // Metodo para replicar las versiones de los sistemasConfig
    private replicarVersionesSistemasConfig() {
        if (this.sistemasConfig)
            this.sistemasConfig.forEach((sistemaConfig) => {
                sistemaConfig.replicarVersion() // se replica la versión del sistema config
            })
    }

    // Metodo para replicar las versiones de los inidicesCalculables con Intervalo
    private replicarVersionesIndicesCalculablesIntervalo() {
        if (this.indicesCalculablesIntervalo)
            this.indicesCalculablesIntervalo.forEach((indiceCalculable) => {
                indiceCalculable.replicarVersion() // se replica la version del inidice calculable intervalo
            })
    }

    // Metodo para replicar las versiones de los inidicesCalculables sin Intervalo
    private replicarVersionesIndicesCalculablesSinIntervalo() {
        if (this.indicesCalculablesSinIntervalo)
            this.indicesCalculablesSinIntervalo.forEach((indiceCalculable) => {
                indiceCalculable.replicarVersion() // se replica la version del inidice calculable sin intervalo
            })
    }


}
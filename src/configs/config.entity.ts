import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SistemaConfig } from "./sistemas-config/sistema-config.entity";

import { Herramienta } from "./herramientas/herramienta.entity";
import { Calculos, IndiceCalculable } from "./indice-calculable/indice-calculable.entity";
import { Indicador } from "./indicador/indicador.entity";

export enum ConfigOrderBy{
    Nombre = "nombre",
    Version = "version"
}

@Entity("config")
export class Config {
    @PrimaryGeneratedColumn()
    version: number // atributo que representa la version de la configuración y su identificador unico
    @Column()
    nombre: String
    @Column()
    descripcion: String
    @Column()
    state: boolean // Atributo que define el estado de la configuración (true: terminada, false: en progreso)
    @OneToMany(() => Herramienta, herramienta => herramienta.config, { eager: true })
    herramientas: Array<Herramienta> // Una configuracion puede tener muchas herramientas registradas
    @OneToMany(() => IndiceCalculable, indiceCalculable => indiceCalculable.config, { eager: true })
    indicesCalculables: Array<IndiceCalculable> // Atributo que representa los indices calculables definidos en la configuracion
    @OneToMany(() => SistemaConfig, sistemaConfig => sistemaConfig.config, { eager: true })
    sistemasConfig: Array<SistemaConfig> // Una configuracion tiene muchos sistemas definidos
    // Se define la herencia con las herramientas


    constructor(version?: number, nombre?: String, sistemasConfig?: Array<SistemaConfig>, herramientas?: Array<Herramienta>,
        indicesCalculables?: Array<IndiceCalculable>) {
        this.version = version
        this.nombre = nombre
        this.herramientas = herramientas
        this.indicesCalculables = indicesCalculables
        this.sistemasConfig = sistemasConfig
        this.state = false // se marca como herramienta en progreso
    }


    public replicarVersion() {
        this.version = undefined // Marcar el id único como unifine equivale a replicar versión
        this.replicarVersionesHerramientasAnalisisCriticidad() // se replica la version de las herramientas analisis de criticidad
        this.replicarVersionesIndicesCalculables // se replica la version de los indices calculables 
        this.replicarVersionesSistemasConfig() // se replica la version de los sistemas config
    }

    // Metodo para replicar las versiones de las herramientas analisis de criticidad
    private replicarVersionesHerramientasAnalisisCriticidad() {
        if (this.herramientas)
            this.herramientas.forEach((herramienta) => {
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
    private replicarVersionesIndicesCalculables() {
        if (this.indicesCalculables)
            this.indicesCalculables.forEach((indiceCalculable) => {
                indiceCalculable.replicarVersion() // se replica la version del inidice calculable intervalo
            })
    }

    // Metodo para obtener el indicador correspondiente a un valor calculado
    public obtenerIndicadorCalculo(valorCalculo: number, calculo: Calculos): Indicador {
        const indiceCalculable: IndiceCalculable = this.indicesCalculables.find((indice) => indice.calculo === calculo)

        return indiceCalculable.obtenerIndicadorCalculo(valorCalculo) // se obtiene el indicador del valor calculo
    }

    // Metodo para obtener los indicadores de un calculo en especifico
    public obtenerInicadoresByIndiceCalculable(calculo: Calculos): Array<Indicador> | undefined {
        const indiceCalculable: IndiceCalculable = this.indicesCalculables.find(indice => indice.calculo === calculo) // se encuentra el indice calculable
        let indicadores: Array<Indicador> | undefined = undefined
        if (indiceCalculable) // si fue encontrado un inidce calculable para el calculo
            indicadores = indiceCalculable.obtenerIndicadores() // se obtienen los indicadores del indice

        return indicadores
    }



}
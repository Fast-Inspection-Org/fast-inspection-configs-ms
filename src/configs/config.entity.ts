import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SistemaConfig } from "./sistemas-config/sistema-config.entity";

import { Herramienta } from "./herramientas/herramienta.entity";
import { Calculos, IndiceCalculable } from "./indice-calculable/indice-calculable.entity";
import { Indicador } from "./indicador/indicador.entity";
import { SistemaConfigDTO } from "./sistemas-config/sistema-config.dto";
import { HerramientaDTO } from "./herramientas/herramienta.dto";
import { IndiceCalculableDTO } from "./indice-calculable/indice-calculable.dto";

export enum ConfigOrderBy {
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
    @OneToMany(() => Herramienta, herramienta => herramienta.config, { lazy: true })
    herramientas: Promise<Array<Herramienta>> // Una configuracion puede tener muchas herramientas registradas
    @OneToMany(() => IndiceCalculable, indiceCalculable => indiceCalculable.config, { lazy: true })
    indicesCalculables: Promise<Array<IndiceCalculable>> // Atributo que representa los indices calculables definidos en la configuracion
    @OneToMany(() => SistemaConfig, sistemaConfig => sistemaConfig.config, { lazy: true })
    sistemasConfig: Promise<Array<SistemaConfig>> // Una configuracion tiene muchos sistemas definidos
    // Se define la herencia con las herramientas


    constructor(version?: number, nombre?: String, descripcion?: String) {
        this.version = version
        this.nombre = nombre
        this.descripcion = descripcion
        this.state = false // se marca como herramienta en progreso
    }


    // Metodo para obtener el indicador correspondiente a un valor calculado
    public async obtenerIndicadorCalculo(valorCalculo: number, calculo: Calculos): Promise<Indicador> {
        const indicesCalculables: Array<IndiceCalculable> = await this.indicesCalculables
        const indiceCalculable: IndiceCalculable = indicesCalculables.find((indice) => indice.calculo === calculo)

        return await indiceCalculable.obtenerIndicadorCalculo(valorCalculo) // se obtiene el indicador del valor calculo
    }

    // Metodo para obtener los indicadores de un calculo en especifico
    public async obtenerInicadoresByIndiceCalculable(calculo: Calculos): Promise<Array<Indicador> | undefined> {
        const indicesCalculables: Array<IndiceCalculable> = await this.indicesCalculables
        const indiceCalculable: IndiceCalculable = indicesCalculables.find(indice => indice.calculo === calculo) // se encuentra el indice calculable
        let indicadores: Array<Indicador> | undefined = undefined
        if (indiceCalculable) // si fue encontrado un inidce calculable para el calculo
            indicadores = await indiceCalculable.obtenerIndicadores() // se obtienen los indicadores del indice

        return indicadores
    }

}
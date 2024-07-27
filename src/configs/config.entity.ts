import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SistemaConfig } from "./sistemas-config/sistema-config.entity";

import { Herramienta } from "./herramientas/herramienta.entity";
import { Calculos, cantCalculos, IndiceCalculable } from "./indice-calculable/indice-calculable.entity";
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

    // Método para obtener el porcentaje de completitud de la configuración
    public async getPorcentajeCompletitud(): Promise<number> {
        let porcentajeCompletitud: number = 0
        // Se obtiene el porcentaje de completitud de la estrucutura de los levantamientos
        porcentajeCompletitud += await this.getPorcentajeCompletitudEstructuraLevantamientos()

        // Se obtiene el porcentaje de completitud de las herramientas
        porcentajeCompletitud += await this.getPorcentajeCompletitudHerramientas()

        // Se obtiene el porcentaje de completitud de los índices calculables
        porcentajeCompletitud += await this.getPorcentajeCompletitudIndicesCalculables()

        /*console.log("Estructura: " + await this.getPorcentajeCompletitudEstructuraLevantamientos())
        console.log("Herramientas: " + await this.getPorcentajeCompletitudHerramientas())
        console.log("Indices: " + await this.getPorcentajeCompletitudIndicesCalculables())*/

        return porcentajeCompletitud
    }

    // Método para obtener el porcentaje de completitud de la estructura de los levantamientos
    private async getPorcentajeCompletitudEstructuraLevantamientos(): Promise<number> {
        let porcentajeCompletitud: number = 0


        if ((await this.sistemasConfig).length > 0)
            porcentajeCompletitud += 25

        // Luego se comprueba que exista al menos un subsistema
        if (await this.isExisteSubistema())
            porcentajeCompletitud += 25

        // Luego que exista al menos un material
        if (await this.isExisteMaterial())
            porcentajeCompletitud += 25

        // Luego que exista al menos un tipo de deterioro
        if (await this.isExisteTipoDeterioro())
            porcentajeCompletitud += 25

        return porcentajeCompletitud / 2
    }

    // Método para comprobar que exista al menos un subsistema definido en la configuración
    public async isExisteSubistema(): Promise<boolean> {
        let isExist: boolean = false
        // Se obtiene la lista de sistemas
        const sistemasConfigs: Array<SistemaConfig> = await this.sistemasConfig
        // Se recorre la lista de sistemas hasta encontrar al menos un subsistema
        for (let index = 0; index < sistemasConfigs.length && !isExist; index++) {
            const sistemaConfig = sistemasConfigs[index]
            if ((await sistemaConfig.cantSubsistemasConfig()) > 0) // si existe al menos un subsistma config en dicho sistema config
                isExist = true // se indica que si existe al menos un subsistema config definido en la configuración
        }

        return isExist
    }



    // Método para comprobar que exista al menos un material definido en la configuración
    public async isExisteMaterial(): Promise<boolean> {
        let isExist: boolean = false
        // Se obtiene la lista de sistemas
        const sistemasConfigs: Array<SistemaConfig> = await this.sistemasConfig
        // Se recorre la lista de sistemas hasta encontrar al menos un subsistema
        for (let index = 0; index < sistemasConfigs.length && !isExist; index++) {
            const sistemaConfig = sistemasConfigs[index]
            if (await sistemaConfig.isExistMaterial()) // si existe al menos un material config en dicho sistema config
                isExist = true // se indica que si existe al menos un material config definido en la configuración
        }

        return isExist
    }

    // Método para comprobar que exista al menos un tipo de deterioro definido en la configuración
    public async isExisteTipoDeterioro(): Promise<boolean> {
        let isExist: boolean = false
        // Se obtiene la lista de sistemas
        const sistemasConfigs: Array<SistemaConfig> = await this.sistemasConfig
        // Se recorre la lista de sistemas hasta encontrar al menos un subsistema
        for (let index = 0; index < sistemasConfigs.length && !isExist; index++) {
            const sistemaConfig = sistemasConfigs[index]
            if (await sistemaConfig.isExistTipoDeterioro()) // si existe al menos un tipo de deterioro config en dicho sistema config
                isExist = true // se indica que si existe al menos un tipo de deterioro config definido en la configuración
        }

        return isExist
    }

    // Método para obtener el porcentaje de completitud de las herramientas
    private async getPorcentajeCompletitudHerramientas(): Promise<number> {
        let porcentajeCompletitud: number = 0

        // Si fue insertada al menos una herramienta
        if ((await this.herramientas).length > 0)
            porcentajeCompletitud = 25 // representa el 25 % del porcentaje de completitud de la configuración

        return porcentajeCompletitud
    }

    // Método para obtener el porcentaje de completitud de los índices calculables
    private async getPorcentajeCompletitudIndicesCalculables(): Promise<number> {
        let porcentajeCompletitud: number = 0

        // se obtienen los indices calculables de la configuración
        const indicesCalculables: Array<IndiceCalculable> = await this.indicesCalculables
        // se recorren todos los indices calculables y se verifica cada uno con los calculos
        indicesCalculables.forEach((indiceCalculable) => {
            // Por el momento la siguiente condicional es temporal
            if (indiceCalculable.calculo === Calculos.Criticidad || indiceCalculable.calculo === Calculos.Detectabilidad ||
                indiceCalculable.calculo === Calculos.Frecuencia || indiceCalculable.calculo === Calculos.Impacto)
                porcentajeCompletitud += 100 / cantCalculos // "100 / cantCalculos" es lo que representa un índice calculable
        })

        return porcentajeCompletitud / 4
    }

}
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm"
import { Config } from "../config.entity"

 export enum TipoHerramienta {
    AnalisisCriticidad = "herramientaAnalisisCriticidad"
}


@Entity("herramienta")
@TableInheritance({ column: { type: "varchar", name: "tipo" } })
export abstract class Herramienta {
    @PrimaryGeneratedColumn()
    id: number // Atributo unico
    @Column()
    nombre: String
    @Column()
    tipo: string
    @Column()
    configVersion: number
    @ManyToOne(() => Config, config => config.herramientas, { onDelete: "CASCADE"})
    config: Config // atributo que representa la configuracion a la que pertenece la herramienta

    constructor (id?: number, nombre?: String, tipo?: string, config?: Config) {
        this.id = id
        this.nombre = nombre
        this.tipo = tipo
        this.config = config
    }

    public replicarVersion() {
        this.id = undefined
    }


}
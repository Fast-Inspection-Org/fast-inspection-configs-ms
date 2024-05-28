import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SubsistemaConfig } from "../subsistemas-config/subsistema-config.entity";
import { Config } from "../config.entity";
import { Herramienta } from "../herramientas/herramienta.entity";

@Entity("sistemaConfig")
export class SistemaConfig {
    @PrimaryGeneratedColumn()
    id: number // atributo que representa el id unico del sistema
    @Column()
    nombre: String
    @Column()
    herramientaId: number
    @ManyToOne(() => Herramienta, herramienta => herramienta.sistemasConfig, { lazy: true , onDelete: "CASCADE" })
    herramienta: Promise<Herramienta>
    @OneToMany(() => SubsistemaConfig, subsistemaConfig => subsistemaConfig.sistemaConfig, { lazy: true })
    subSistemasConfig: Promise<Array<SubsistemaConfig>>
    @Column()
    configVersion: number
    @ManyToOne(() => Config, config => config.sistemasConfig, { onDelete: "CASCADE" })
    config: Config // atributo que define a la configuracion que pertenece el sistemaConfig

    constructor(id?: number, nombre?: String, herramienta?: Herramienta, config?: Config) {
        this.id = id
        this.nombre = nombre
        if (herramienta)
        this.herramienta = Promise.resolve(herramienta)
        this.config = config
    }

}
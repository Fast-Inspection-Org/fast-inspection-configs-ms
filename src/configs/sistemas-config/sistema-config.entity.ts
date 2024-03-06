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
    @ManyToOne(() => Herramienta, { eager: true })
    herramienta: Herramienta
    @OneToMany(() => SubsistemaConfig, subsistemaConfig => subsistemaConfig.sistemaConfig, { eager: true })
    subSistemasConfig: Array<SubsistemaConfig>
    @Column()
    configVersion: number
    @ManyToOne(() => Config, config => config.sistemasConfig, { onDelete: "CASCADE" })
    config: Config // atributo que define a la configuracion que pertenece el sistemaConfig

    constructor(id?: number, nombre?: String, herramienta?: Herramienta, config?: Config) {
        this.id = id
        this.nombre = nombre
        this.herramienta = herramienta
        this.config = config
    }

    public replicarVersion() {
        this.id = undefined
        this.replicarVersionHerramienta() // Se replica la version de la herramienta
        this.replicarVersionSubSistemasConfig() // se replica la información de los subSistemas
    }

    private replicarVersionHerramienta() {
        this.herramienta.replicarVersion()
    }

    private replicarVersionSubSistemasConfig() {
        if (this.subSistemasConfig)
            this.subSistemasConfig.forEach((subSistemaConfig) => {
                subSistemaConfig.replicarVersion() // se replica la información del subSistemaConfig
            })
    }
}
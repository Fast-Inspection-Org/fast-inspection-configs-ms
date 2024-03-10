import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SistemaConfig } from "../sistemas-config/sistema-config.entity";
import { MaterialConfig } from "../materiales-config/material-config.entity";

@Entity("subsistemaConfig")
export class SubsistemaConfig {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: String
    @Column()
    sistemaConfigId: number
    @ManyToOne(() => SistemaConfig, sistemaConfig => sistemaConfig.subSistemasConfig, { onDelete: "CASCADE" })
    sistemaConfig: SistemaConfig
    @OneToMany(() => MaterialConfig, materialConfig => materialConfig.subsistemaConfig, { eager: true })
    materialesConfig: Array<MaterialConfig>

    constructor(id?: number, nombre?: String, sistemaConfig?: SistemaConfig) {
        this.id = id
        this.nombre = nombre
        this.sistemaConfig = sistemaConfig
    }

    public replicarVersion() {
        this.id = undefined
        this.replicarVersionMaterialesConfig() // se replica la información de los materiales
    }

    private replicarVersionMaterialesConfig() {
        this.materialesConfig.forEach((materialConfig) => {
            materialConfig.replicarVersion() // se replica la version del material
        })
    }
}
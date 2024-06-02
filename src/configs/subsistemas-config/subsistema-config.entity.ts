import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SistemaConfig } from "../sistemas-config/sistema-config.entity";
import { MaterialConfig } from "../materiales-config/material-config.entity";
import { retry } from "rxjs";

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
    @OneToMany(() => MaterialConfig, materialConfig => materialConfig.subsistemaConfig, { lazy: true })
    materialesConfig: Promise<Array<MaterialConfig>>

    constructor(id?: number, nombre?: String, sistemaConfig?: SistemaConfig) {
        this.id = id
        this.nombre = nombre
        this.sistemaConfig = sistemaConfig
    }

    public async cantMateriales(): Promise<number> {
        const materiales: Array<MaterialConfig> = await this.materialesConfig // se obtienen los materiales del subsistema
        return materiales.length
    }

    // Método para verificar si un material pertenece al subistema

    public async isContainsMaterial(idMaterial: number): Promise<boolean> {
        let isContains: boolean = false
        // se obtienen los materiales del subsistemas
        const materialesConfig: Array<MaterialConfig> = await this.materialesConfig

        for (let index = 0; index < materialesConfig.length && !isContains; index++) {
            const materialConfig: MaterialConfig = materialesConfig[index]
            if (materialConfig.id === idMaterial)
                isContains = true // se encontró el material
        }

        return isContains
    }

}
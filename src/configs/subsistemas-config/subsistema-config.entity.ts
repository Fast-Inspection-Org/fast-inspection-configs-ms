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

    // Método para comprobar que exista al menos un tipo de deterioro en dicho subsistema
    public async isExistTipoDeterioro(): Promise<boolean> {
        let isExist: boolean = false

        // se obtiene la lista de materiales
        const materialesConfigs: Array<MaterialConfig> = await this.materialesConfig

        for (let index = 0; index < materialesConfigs.length && !isExist; index++) {
            const materialConfig = materialesConfigs[index];
            if ((await materialConfig.cantTiposDeterioros()) > 0) // si existe al menos un tipo de deterioro en dicho material
                isExist = true // se indica que existe al menos un tipo de deterioro en el subsistema
        }

        return isExist
    }

}
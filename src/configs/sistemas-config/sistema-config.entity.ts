import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SubsistemaConfig } from "../subsistemas-config/subsistema-config.entity";
import { Config } from "../config.entity";
import { Herramienta } from "../herramientas/herramienta.entity";

@Entity("sistemaConfig")
export class SistemaConfig {
    @PrimaryGeneratedColumn()
    id: number // atributo que representa el id unico del sistema
    @Column({ nullable: true })
    nombre: String
    @Column()
    herramientaId: number
    @ManyToOne(() => Herramienta, herramienta => herramienta.sistemasConfig, { lazy: true, onDelete: "CASCADE" })
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

    // Método para obtener la cantidad de subsistemas del sistema

    public async cantSubsistemasConfig(): Promise<number> {
        const subSistemasConfig: Array<SubsistemaConfig> = await this.subSistemasConfig // se obtienen los subsistemas config del sistema

        return subSistemasConfig.length
    }

    public async getNombreHerramienta(): Promise<String> {
        const herramienta: Herramienta = await this.herramienta // se carga la herramienta

        return herramienta.nombre // se retorna el nombre de la herramienta
    }

    public async getHerramienta(): Promise<Herramienta> {
        const herramienta: Herramienta = await this.herramienta // se carga la herramienta

        return herramienta // se retorna el nombre de la herramienta
    }

    
    public async isContainsMaterial(idMaterial: number): Promise<boolean> {
        let isContains: boolean = false
        // se obtienen los subsistemas del sistema
        const subsistemasConfig: Array<SubsistemaConfig> = await this.subSistemasConfig

        for (let index = 0; index < subsistemasConfig.length && !isContains; index++) {
            const subsistemaConfig: SubsistemaConfig = subsistemasConfig[index]
            if (await subsistemaConfig.isContainsMaterial(idMaterial)) // si al menos un subsistema contiene al material
                isContains = true
        }

        return isContains
    }

}
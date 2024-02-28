import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { SubsistemaConfig } from "../subsistemas-config/subsistema-config.entity"
import { TipoDeterioroConfig } from "../tipo-deterioros-config/tipo-deterioro-config.entity"
import { TipoDeterioroAnalisisCriticidadConfig } from "../tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.entity"

@Entity("materialConfig")
export class MaterialConfig {
    @PrimaryGeneratedColumn()
    id: number // Atributo unico
    @Column()
    nombre: String
    @ManyToOne(() => SubsistemaConfig, subsistemaConfig => subsistemaConfig.materialesConfig, { onDelete: "CASCADE" }) // se define la relacion de muchos a uno con SubSistema
    subsistemaConfig: SubsistemaConfig
    @OneToMany(() => TipoDeterioroAnalisisCriticidadConfig, tipoDeterioroConfig => tipoDeterioroConfig.materialConfig, { eager: true })
    tipoDeteriorosAnalisisCriticidadConfig: Array<TipoDeterioroAnalisisCriticidadConfig> // Un material tiene muchos tipos de deterioros asociados


    public replicarVersion() {
        this.id = undefined
        this.replicarVersionTipoDeterioroAnalisisCriticidadConfig() // se replica la información de los tipo de detioro analisis criticdad configurados
    }

    private replicarVersionTipoDeterioroAnalisisCriticidadConfig() {
        if (this.tipoDeteriorosAnalisisCriticidadConfig)
            this.tipoDeteriorosAnalisisCriticidadConfig.forEach((tipoDeterioroConfig) => {
                tipoDeterioroConfig.replicarVersion() // se replica la version del tipo de deterioro analisis de criticidad
            })
    }
}
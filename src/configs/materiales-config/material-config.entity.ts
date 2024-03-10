import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { SubsistemaConfig } from "../subsistemas-config/subsistema-config.entity"
import { TipoDeterioroConfig } from "../tipo-deterioros-config/tipo-deterioro-config.entity"
import { TipoDeterioroAnalisisCriticidadConfig } from "../tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.entity"
import { TipoDeterioro } from "src/controlador-edificaciones/levantamiento/estructura-levantamiento/tipo-deterioro.domain"

@Entity("materialConfig")
export class MaterialConfig {
    @PrimaryGeneratedColumn()
    id: number // Atributo unico
    @Column()
    nombre: String
    @Column()
    subsistemaConfigId: number
    @ManyToOne(() => SubsistemaConfig, subsistemaConfig => subsistemaConfig.materialesConfig, { onDelete: "CASCADE" }) // se define la relacion de muchos a uno con SubSistema
    subsistemaConfig: SubsistemaConfig
    @OneToMany(() => TipoDeterioroConfig, tipoDeterioroConfig => tipoDeterioroConfig.materialConfig, { eager: true })
    tiposDeteriorosConfig: Array<TipoDeterioroConfig> // Un material tiene muchos tipos de deterioros asociados

    constructor(id?: number, nombre?: String, subsistemaConfig?: SubsistemaConfig) {
        this.id = id
        this.nombre = nombre
        this.subsistemaConfig = subsistemaConfig
    }


    public replicarVersion() {
        this.id = undefined
        this.replicarVersionTiposDeteriorosConfig() // se replica la información de los tipo de detioro analisis criticdad configurados
    }

    private replicarVersionTiposDeteriorosConfig() {
        if (this.tiposDeteriorosConfig)
            this.tiposDeteriorosConfig.forEach((tipoDeterioroConfig) => {
                tipoDeterioroConfig.replicarVersion() // se replica la version del tipo de deterioro analisis de criticidad
            })
    }


}
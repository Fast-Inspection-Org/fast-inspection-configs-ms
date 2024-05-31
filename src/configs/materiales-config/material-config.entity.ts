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
    @OneToMany(() => TipoDeterioroConfig, tipoDeterioroConfig => tipoDeterioroConfig.materialConfig, { lazy: true })
    tiposDeteriorosConfig: Promise<Array<TipoDeterioroConfig>> // Un material tiene muchos tipos de deterioros asociados

    constructor(id?: number, nombre?: String, subsistemaConfig?: SubsistemaConfig) {
        this.id = id
        this.nombre = nombre
        this.subsistemaConfig = subsistemaConfig
    }

    // Método para obtener la cantidad de tipos de deterioros asociados al material
    public async cantTiposDeterioros(): Promise<number> {
        const tiposDeteriorosConfig: Array<TipoDeterioroConfig> = await this.tiposDeteriorosConfig // se obtienen los tipos de deterioro asociados al material

        return tiposDeteriorosConfig.length
    }

}
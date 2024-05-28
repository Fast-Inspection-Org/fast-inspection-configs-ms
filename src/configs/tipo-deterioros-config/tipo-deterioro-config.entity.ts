import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance } from "typeorm"
import { MaterialConfig } from "../materiales-config/material-config.entity"
import { CampoDefinido } from "../campo-definido/campo-definido.entity"
import { Causa } from "../causa/causa.entity"


export enum TipoTipoDeterioro {
    TipoDeterioroAnalisisCriticidad = "tipoDeterioroAnalisisCriticidadConfig"
}

@Entity("tipoDeterioroConfig")
@TableInheritance({ column: { type: "varchar", name: "tipo" } })
export abstract class TipoDeterioroConfig {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: String
    @Column()
    tipo: string
    @OneToMany(() => CampoDefinido, campoDefinido => campoDefinido.tipoDeterioroConfig, { lazy: true })
    camposDefinidos: Promise<Array<CampoDefinido>> // Atributo que representa los campos definidos para este tipo de deterioro
    @OneToMany(() => Causa, causa => causa.tipoDeterioroConfig, { lazy: true })
    causas: Promise<Array<Causa>> // Atributo que define las causas para este tipo de deterioro
    @Column()
    materialConfigId: number
    @ManyToOne(() => MaterialConfig, materialConfig => materialConfig.tiposDeteriorosConfig, { onDelete: "CASCADE" })
    materialConfig: MaterialConfig
    @Column()
    detectabilidad: number

    constructor(id?: number, nombre?: String, tipo?: string, materialConfig?: MaterialConfig, detectabilidad?: number) {
        this.id = id;
        this.nombre = nombre
        this.tipo = tipo
        this.materialConfig = materialConfig
        this.detectabilidad = detectabilidad
    }

}
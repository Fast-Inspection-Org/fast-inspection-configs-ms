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
    tipo: String
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

    constructor(id?: number, nombre?: String, tipo?: String, materialConfig?: MaterialConfig, detectabilidad?: number) {
        this.id = id;
        this.nombre = nombre
        this.tipo = tipo
        this.materialConfig = materialConfig
        this.detectabilidad = detectabilidad
    }

    // Método para obtener la cantidad de causas del tipo de deterioro

    public async cantCausas(): Promise<number> {
        const causas: Array<Causa> = await this.causas // se cargan las cuasas de la base de datos

        return causas.length
    }

}
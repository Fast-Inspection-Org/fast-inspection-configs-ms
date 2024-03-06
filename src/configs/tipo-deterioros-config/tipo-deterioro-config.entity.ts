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
    @OneToMany(() => CampoDefinido, campoDefinido => campoDefinido.tipoDeterioroConfig, { eager: true })
    camposDefinidos: Array<CampoDefinido> // Atributo que representa los campos definidos para este tipo de deterioro
    @OneToMany(() => Causa, causa => causa.tipoDeterioroConfig, { eager: true })
    causas: Array<Causa> // Atributo que define las causas para este tipo de deterioro
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

    public replicarVersion() {
        this.id = undefined
        this.replicarVersionCamposDefinidosConfig() // se replica la información de los campos definidos para este tipo de deterioro
        this.replicarVersionCausas() // se replica la información de las causas definidas para este tipo de deterioro
    }

    // Metodo para replicar la información de los campos definidos para este tipo de deterioro
    private replicarVersionCamposDefinidosConfig() {
        this.camposDefinidos.forEach((campoDefinidoConfig) => {
            campoDefinidoConfig.replicarVersion() // se replica la versión del campoDefinido
        })
    }

    //Metodo para replicar la información de las causas de este tipo de deterioro
    private replicarVersionCausas() {
        this.causas.forEach((causa) => {
            causa.replicarVersion() // se replica la version de la causa
        })
    }

}
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm"
import { Config } from "../config.entity"



@Entity("herramienta")
@TableInheritance({ column: { type: "varchar", name: "tipo" } })
export abstract class Herramienta {
    @PrimaryGeneratedColumn()
    id: number // Atributo unico
    @Column()
    nombre: String
    @Column()
    tipo: string
    

    constructor (id?: number, nombre?: String, tipo?: string) {
        this.id = id
        this.nombre = nombre
        this.tipo = tipo
    }

    public replicarVersion() {
        this.id = undefined
    }
}
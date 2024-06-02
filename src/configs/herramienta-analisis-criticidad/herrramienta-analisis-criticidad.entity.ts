import { ChildEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Herramienta } from "../herramientas/herramienta.entity";
import { Campo } from "../campo/campo.entity";
import { Config } from "../config.entity";


@ChildEntity("herramientaAnalisisCriticidad")
export class HerramientaAnalisisCriticidad extends Herramienta {
    @OneToMany(() => Campo, campo => campo.herramientaAnalisisCriticidad, { lazy: true })
    campos: Promise<Array<Campo>> // Campos definidos en la herramienta
 
   
    constructor( id?: number, nombre?: String, tipo?: string, config?: Config) {
        super(id, nombre, tipo, config)
    }

   
}
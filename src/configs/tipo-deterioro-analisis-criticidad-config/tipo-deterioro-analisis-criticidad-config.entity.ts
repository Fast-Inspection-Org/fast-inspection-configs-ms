import { ChildEntity, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { TipoDeterioroConfig } from "../tipo-deterioros-config/tipo-deterioro-config.entity";
import { Campo } from "../campo/campo.entity";
import { MaterialConfig } from "../materiales-config/material-config.entity";

@ChildEntity("tipoDeterioroAnalisisCriticidadConfig")
export class TipoDeterioroAnalisisCriticidadConfig extends TipoDeterioroConfig {
    @ManyToMany(() => Campo, { lazy: true })
    @JoinTable()
    camposAfectados: Promise<Array<Campo>> // atributo que define los campos afectados por este tipo de deterioro


    constructor(id?: number, nombre?: String, tipo?: string, materialConfig?: MaterialConfig, detectabilidad?: number, camposAfectados?: Array<Campo>) {
        super(id, nombre, tipo, materialConfig, detectabilidad)
        if (camposAfectados)
        this.camposAfectados = Promise.resolve(camposAfectados)
        
    }


}
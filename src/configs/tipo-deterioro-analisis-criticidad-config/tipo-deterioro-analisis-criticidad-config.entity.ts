import { ChildEntity, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { TipoDeterioroConfig } from "../tipo-deterioros-config/tipo-deterioro-config.entity";
import { Campo } from "../campo/campo.entity";
import { MaterialConfig } from "../materiales-config/material-config.entity";

@ChildEntity("tipoDeterioroAnalisisCriticidadConfig")
export class TipoDeterioroAnalisisCriticidadConfig extends TipoDeterioroConfig {
    @ManyToMany(() => Campo, { lazy: true })
    @JoinTable()
    camposAfectados: Promise<Array<Campo>> // atributo que define los campos afectados por este tipo de deterioro


    constructor(id?: number, nombre?: String, tipo?: String, materialConfig?: MaterialConfig, detectabilidad?: number, camposAfectados?: Array<Campo>) {
        super(id, nombre, tipo, materialConfig, detectabilidad)
        if (camposAfectados)
            this.camposAfectados = Promise.resolve(camposAfectados)

    }


    public async cantCamposAfectados(): Promise<number> {
        const camposAfectados: Array<Campo> = await this.camposAfectados // se cargan de la base de datos los campos afectados

        return camposAfectados.length
    }


}
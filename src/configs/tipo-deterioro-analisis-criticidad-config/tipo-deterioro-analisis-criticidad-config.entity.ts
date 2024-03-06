import { ChildEntity, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { TipoDeterioroConfig } from "../tipo-deterioros-config/tipo-deterioro-config.entity";
import { Campo } from "../campo/campo.entity";
import { MaterialConfig } from "../materiales-config/material-config.entity";

@ChildEntity("tipoDeterioroAnalisisCriticidadConfig")
export class TipoDeterioroAnalisisCriticidadConfig extends TipoDeterioroConfig {
    @ManyToMany(() => Campo, { eager: true })
    @JoinTable()
    camposAfectados: Array<Campo> // atributo que define los campos afectados por este tipo de deterioro


    constructor(id?: number, nombre?: String, tipo?: string, materialConfig?: MaterialConfig, detectabilidad?: number, camposAfectados?: Array<Campo>) {
        super(id, nombre, tipo, materialConfig, detectabilidad)
        this.camposAfectados = camposAfectados
        
    }

    public replicarVersion() {
        super.replicarVersion()
        this.replicarVersionCamposAfectados() // Se replica la versión de los campos afectados
    }

    // Metodo para replicar la version de los campos asignados
    private replicarVersionCamposAfectados() {
        this.camposAfectados.forEach((campoAfectado) => {
            campoAfectado.replicarVersion()
        })
    }

    // Metodo para determinar el indice de impacto del tipo de deterioro
    public determinarIndiceImpacto() {

    }

}
import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { TipoDeterioroConfig } from "../tipo-deterioros-config/tipo-deterioro-config.entity";
import { Campo } from "../campo/campo.entity";
import { MaterialConfig } from "../materiales-config/material-config.entity";

@Entity("tipoDeterioroAnalisisCriticidadConfig")
export class TipoDeterioroAnalisisCriticidadConfig extends TipoDeterioroConfig {
    @ManyToMany(() => Campo, { eager: true })
    @JoinTable()
    camposAfectados: Array<Campo> // atributo que define los campos afectados por este tipo de deterioro
    @ManyToOne(() => MaterialConfig, materialConfig => materialConfig.tipoDeteriorosAnalisisCriticidadConfig, {onDelete: "CASCADE"})
    materialConfig: MaterialConfig

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
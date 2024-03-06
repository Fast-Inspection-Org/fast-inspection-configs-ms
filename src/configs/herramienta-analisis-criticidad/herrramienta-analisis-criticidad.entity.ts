import { ChildEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Herramienta } from "../herramientas/herramienta.entity";
import { Campo } from "../campo/campo.entity";
import { Config } from "../config.entity";


@ChildEntity("herramientaAnalisisCriticidad")
export class HerramientaAnalisisCriticidad extends Herramienta {
    @OneToMany(() => Campo, campo => campo.herramientaAnalisisCriticidad, { eager: true })
    campos: Array<Campo> // Campos definidos en la herramienta
 
   

    constructor( id?: number, nombre?: String, tipo?: string, config?: Config) {
        super(id, nombre, tipo, config)
    }

    public replicarVersion() {
        super.replicarVersion()
        this.replicarVersionCampos() // se replica la version de los campos
    }


    // Metodo para replicar la version de los campos
    private replicarVersionCampos() {
        this.campos.forEach((campo) => {
            campo.replicarVersion() // se replica la version del campo
        })
    }
}
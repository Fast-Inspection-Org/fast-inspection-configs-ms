import { ChildEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Herramienta } from "../herramientas/herramienta.entity";
import { Campo } from "../campo/campo.entity";
import { Config } from "../config.entity";


@ChildEntity("herramientaAnalisisCriticidad")
export class HerramientaAnalisisCriticidad extends Herramienta {
    @OneToMany(() => Campo, campo => campo.herramientaAnalisisCriticidad, { eager: true })
    campos: Array<Campo> // Campos definidos en la herramienta
    @Column()
    configVersion: number
    @ManyToOne(() => Config, config => config.herramientasAnalisisCriticidad, { onDelete: "CASCADE"})
    config: Config // atributo que representa la configuracion a la que pertenece la herramienta

    constructor( id?: number, nombre?: String, config?: Config, tipo?: string) {
        super(id, nombre, tipo)
        this.config = config
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
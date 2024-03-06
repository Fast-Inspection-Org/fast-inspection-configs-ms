import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { HerramientaAnalisisCriticidad } from "../herramienta-analisis-criticidad/herrramienta-analisis-criticidad.entity"
import { TipoDeterioroAnalisisCriticidadConfig } from "../tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.entity"

@Entity("campo")
export class Campo {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: String
    @Column()
    nivelImportancia: number
    @Column()
    configVersion: number
    @ManyToOne(() => HerramientaAnalisisCriticidad, herramientaAnalisisCriticidad => herramientaAnalisisCriticidad.campos, { onDelete: "CASCADE" })
    herramientaAnalisisCriticidad: HerramientaAnalisisCriticidad // Atributo que define a la herramienta analisis de criticidad que pertenece el campo
    @ManyToMany(() => TipoDeterioroAnalisisCriticidadConfig, tipoDeterioroAnalisisCriticidadConfig => tipoDeterioroAnalisisCriticidadConfig.camposAfectados)
    tipoDeterioroAnalisisCriticidadConfig: TipoDeterioroAnalisisCriticidadConfig

    constructor(nombre: String, nivelImportancia: number, configVersion: number, herramientaAnalisisCriticidad: HerramientaAnalisisCriticidad) {
        this.nombre = nombre
        this.nivelImportancia = nivelImportancia
        this.configVersion = configVersion
        this.herramientaAnalisisCriticidad = herramientaAnalisisCriticidad
    }

    public replicarVersion() {
        this.id = undefined
    }
}
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { HerramientaAnalisisCriticidad } from "../herramienta-analisis-criticidad/herrramienta-analisis-criticidad.entity"
import { TipoDeterioroAnalisisCriticidadConfig } from "../tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.entity"
import { Exclude } from "class-transformer"

@Entity("campo")
export class Campo {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    nombre: String
    @Column()
    nivelImportancia: number
    @Exclude()
    @Column()
    configVersion: number
    @Exclude()
    @Column()
    herramientaAnalisisCriticidadId: number
    @Exclude()
    @ManyToOne(() => HerramientaAnalisisCriticidad, herramientaAnalisisCriticidad => herramientaAnalisisCriticidad.campos, { onDelete: "CASCADE" })
    herramientaAnalisisCriticidad: HerramientaAnalisisCriticidad // Atributo que define a la herramienta analisis de criticidad que pertenece el campo
    @Exclude()
    @ManyToMany(() => TipoDeterioroAnalisisCriticidadConfig, tipoDeterioroAnalisisCriticidadConfig => tipoDeterioroAnalisisCriticidadConfig.camposAfectados)
    tipoDeterioroAnalisisCriticidadConfig: Promise<Array<TipoDeterioroAnalisisCriticidadConfig>>

    constructor(nombre: String, nivelImportancia: number, configVersion: number, herramientaAnalisisCriticidad: HerramientaAnalisisCriticidad) {
        this.nombre = nombre
        this.nivelImportancia = nivelImportancia
        this.configVersion = configVersion
        this.herramientaAnalisisCriticidad = herramientaAnalisisCriticidad
    }

}
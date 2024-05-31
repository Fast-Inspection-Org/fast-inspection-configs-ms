import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoDeterioroConfig } from "../tipo-deterioros-config/tipo-deterioro-config.entity";



@Entity("campoDefinido")
export class CampoDefinido {
    @PrimaryGeneratedColumn()
    id: number // Atributo unico
    @Column()
    nombre: String // Atributo que define el nombre del campo por ejemplo: largo, ancho, profundidad, etc
    @Column()
    tipo: String //Atributo que define el tipo de campo por ejemplo: texto, numero, fecha etc, esto Sería un Enum o una tabla en la base de datos
    @Column()
    tipoDeterioroConfigId: number
    @ManyToOne(() => TipoDeterioroConfig, tipoDeterioroConfig => tipoDeterioroConfig.camposDefinidos, { onDelete: "CASCADE" })
    tipoDeterioroConfig: TipoDeterioroConfig // Atributo que define el tipo de detioro configurado al que pertenece dicho campo

    constructor(id?: number, nombre?: String, tipo?: String, tipoDeterioroConfig?: TipoDeterioroConfig) {
        this.id = id
        this.nombre = nombre
        this.tipo = tipo
        this.tipoDeterioroConfig = tipoDeterioroConfig
    }

}
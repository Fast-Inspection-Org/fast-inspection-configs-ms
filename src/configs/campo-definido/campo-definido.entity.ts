import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { TipoDeterioroConfig } from "../tipo-deterioros-config/tipo-deterioro-config.entity";
import { Exclude } from "class-transformer";

export enum TiposCamposDefinidos {
    Imagen = "CampoDefinidoImagen",
    Texto = "CampoDefinidoTexto",
    Numerico = "CampoDefinidoNumerico",
    Seleccion = "CampoDefinidoSeleccion"
}


@Entity("campoDefinido")
@TableInheritance({ column: { type: "varchar", name: "tipo" } })
export abstract class CampoDefinido {
    @PrimaryGeneratedColumn()
    id: number // Atributo unico
    @Column()
    nombre: String // Atributo que define el nombre del campo por ejemplo: largo, ancho, profundidad, etc
    @Column()
    tipo: TiposCamposDefinidos //Atributo que define el tipo de campo por ejemplo: texto, numero, fecha etc, esto Sería un Enum o una tabla en la base de datos
    @Column()
    @Exclude()
    tipoDeterioroConfigId: number
    @ManyToOne(() => TipoDeterioroConfig, tipoDeterioroConfig => tipoDeterioroConfig.camposDefinidos, { onDelete: "CASCADE" })
    @Exclude()
    tipoDeterioroConfig: TipoDeterioroConfig // Atributo que define el tipo de detioro configurado al que pertenece dicho campo

    constructor(id?: number, nombre?: String, tipo?: TiposCamposDefinidos, tipoDeterioroConfig?: TipoDeterioroConfig) {
        this.id = id
        this.nombre = nombre
        this.tipo = tipo
        this.tipoDeterioroConfig = tipoDeterioroConfig
    }

}
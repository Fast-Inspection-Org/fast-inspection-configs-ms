import { CampoDefinido, TiposCamposDefinidos } from "src/configs/campo-definido/campo-definido.entity";
import { TipoDeterioroConfig } from "src/configs/tipo-deterioros-config/tipo-deterioro-config.entity";
import { ChildEntity, Column } from "typeorm";

@ChildEntity("CampoDefinidoSeleccion")
export class CampoDefinidoSeleccion extends CampoDefinido {
    @Column()
    opciones: String // Representa las opciones definidas en ese campo, en formato JSON 

    constructor(id?: number, nombre?: String, tipo?: TiposCamposDefinidos, tipoDeterioroConfig?: TipoDeterioroConfig, opciones?: Array<String>) {
        super(id, nombre, tipo, tipoDeterioroConfig)
        if (opciones)
            this.opciones = JSON.stringify(opciones)
    }
}

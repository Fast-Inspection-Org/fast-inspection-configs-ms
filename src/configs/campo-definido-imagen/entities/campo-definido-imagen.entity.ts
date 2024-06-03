import { CampoDefinido } from "src/configs/campo-definido/campo-definido.entity";
import { TipoDeterioroConfig } from "src/configs/tipo-deterioros-config/tipo-deterioro-config.entity";
import { ChildEntity, Column } from "typeorm";

@ChildEntity("CampoDefinidoImagen")
export class CampoDefinidoImagen extends CampoDefinido {
    @Column()
    url: String // representa la url donde estará almacenada la imagen

    constructor(id?: number, nombre?: String, tipo?: String, tipoDeterioroConfig?: TipoDeterioroConfig, url?: String) {
        super(id, nombre, tipo, tipoDeterioroConfig)
        this.url = url
    }
}

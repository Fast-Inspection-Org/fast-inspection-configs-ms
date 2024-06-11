import { CampoDefinido, TiposCamposDefinidos } from "src/configs/campo-definido/campo-definido.entity";
import { TipoDeterioroConfig } from "src/configs/tipo-deterioros-config/tipo-deterioro-config.entity";
import { ChildEntity } from "typeorm";

@ChildEntity("CampoDefinidoTexto")
export class CampoDefinidoTexto extends CampoDefinido {

    constructor(id?: number, nombre?: String, tipo?: TiposCamposDefinidos, tipoDeterioroConfig?: TipoDeterioroConfig) {
        super(id, nombre, tipo, tipoDeterioroConfig)
    }
}

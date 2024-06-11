import { CampoDefinido, TiposCamposDefinidos } from "src/configs/campo-definido/campo-definido.entity";
import { TipoDeterioroConfig } from "src/configs/tipo-deterioros-config/tipo-deterioro-config.entity";
import { ChildEntity, Column } from "typeorm";

@ChildEntity("CampoDefinidoImagen")
export class CampoDefinidoImagen extends CampoDefinido {
  

    constructor(id?: number, nombre?: String, tipo?: TiposCamposDefinidos, tipoDeterioroConfig?: TipoDeterioroConfig) {
        super(id, nombre, tipo, tipoDeterioroConfig)  
    }
}

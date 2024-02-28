import { TipoDeterioroConfig } from "src/configs/tipo-deterioros-config/tipo-deterioro-config.entity";
import { Deterioro } from "src/controlador-edificaciones/deterioro/deterioro.entity";

export class TipoDeterioro {
    tipoDeterioroConfig: TipoDeterioroConfig // referencia de memoria del tipo de deterioro definido en configuracion
    deterioros: Array<Deterioro> // atributo que define La *información* de los deterioros asociados a un tipo de material
}
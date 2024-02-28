import { MaterialConfig } from "src/configs/materiales-config/material-config.entity";
import { TipoDeterioro } from "./tipo-deterioro.class";

export class Material {
    materialConfig: MaterialConfig // referencia de memoria del material definido en configuracion
    tipoDeterioros: Array<TipoDeterioro> // atributo que define La *información* de los tipo de deterioro de un material
}
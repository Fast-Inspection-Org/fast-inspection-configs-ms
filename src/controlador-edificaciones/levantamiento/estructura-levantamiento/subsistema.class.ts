import { SubsistemaConfig } from "src/configs/subsistemas-config/subsistema-config.entity";
import { Material } from "./material.class";

export class SubSistema {
    subSistemaConfig: SubsistemaConfig // referencia de memoria del subSistema definido en configuracion
    materiales: Array<Material> // atributo que define La *información* de los materiales de un subSistema
}
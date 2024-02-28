import { SistemaConfig } from "src/configs/sistemas-config/sistema-config.entity";
import { SubSistema } from "./subsistema.class";

export class Sistema {
    sistemaConfig: SistemaConfig // referencia de memoria del sistema definido en configuracion
    subSistema: Array<SubSistema>  // atributo que define La *información* de los subsistemas de un sistema
}
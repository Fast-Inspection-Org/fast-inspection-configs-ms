import { CampoDTO } from "../campo/campo.dto";
import { HerramientaDTO } from "../herramientas/herramienta.dto";


export class HerramientaAnalisisCriticidadDTO extends HerramientaDTO {
    campos?: Array<CampoDTO> // Campos definidos en la herramienta
}
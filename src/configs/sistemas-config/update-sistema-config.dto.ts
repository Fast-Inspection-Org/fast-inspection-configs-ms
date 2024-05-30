import { HerramientaDTO } from "../herramientas/herramienta.dto"

export class UpdateSistemaConfigDTO {
    nombre: String
    herramienta: HerramientaDTO // atributo que define la herramienta a la cual pertenece el sistema
    configVersion: number // atributo de vital importancia para saber que sistema actualizar
}

import { IsString } from "class-validator"
import { HerramientaAnalisisCriticidadDTO } from "./herramienta-analisis-criticidad/herramienta-analisis-criticidad.dto"
import { HerramientaDTO } from "./herramientas/herramienta.dto"
import { Herramienta } from "./herramientas/herramienta.entity"
import { IndiceCalculableIntervaloDTO } from "./indice-calculable-intervalo/indice-calculable-intervalo.dto"
import { IndiceCalculableSinIntervaloDTO } from "./indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.dto"
import { IndiceCalculableDTO } from "./indice-calculable/indice-calculable.dto"
import { SistemaConfigDTO } from "./sistemas-config/sistema-config.dto"


export class ConfigDTO {
    version?: number
    @IsString()
    nombre: String
    descripcion: String
    herramientas: Array<HerramientaDTO> // Una configuracion puede tener muchas herramientas registradas
    indicesCalculables: Array<IndiceCalculableDTO> // Atributo que representa los indices calculables definidos en la configuracion
    sistemasConfigs: Array<SistemaConfigDTO> // Una configuracion tiene muchos sistemas definidos   
}

import { HerramientaAnalisisCriticidadDTO } from "./herramienta-analisis-criticidad/herramienta-analisis-criticidad.dto"
import { IndiceCalculableIntervaloDTO } from "./indice-calculable-intervalo/indice-calculable-intervalo.dto"
import { IndiceCalculableSinIntervaloDTO } from "./indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.dto"
import { SistemaConfigDTO } from "./sistemas-config/sistema-config.dto"


export class ConfigDTO {
    version?: number
    nombre: String
    descripcion: String
    herramientasAnalisisCriticidad: Array<HerramientaAnalisisCriticidadDTO> // Una configuracion puede tener muchas herramientas registradas
    indicesCalculablesIntervalo: Array<IndiceCalculableIntervaloDTO> // Atributo que representa los indices calculables por intervalo definidos en la configuracion
    indicesCalculablesSinIntervalo: Array<IndiceCalculableSinIntervaloDTO> // Atributo que representa los indices calculables por intervalo definidos en la configuracion
    sistemasConfigs: Array<SistemaConfigDTO> // Una configuracion tiene muchos sistemas definidos   
}
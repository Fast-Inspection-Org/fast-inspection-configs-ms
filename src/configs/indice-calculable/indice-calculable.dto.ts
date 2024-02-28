import { ConfigDTO } from "../config.dto"
import { Config } from "../config.entity"

export class IndiceCalculableDTO {
    nombre: String
    config: ConfigDTO | Config // Atributo que representa la configuracion donde esta definido los indices calculables
}
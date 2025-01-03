import { MaterialConfigDTO } from "../materiales-config/material-config.dto"
import { MaterialConfig } from "../materiales-config/material-config.entity"
import { SistemaConfigDTO } from "../sistemas-config/sistema-config.dto"
import { SistemaConfig } from "../sistemas-config/sistema-config.entity"

export class SubsistemaConfigDTO {
    id: number
    nombre: String
    materialesConfig?: Array<MaterialConfigDTO>
    sistemaConfig: SistemaConfig | SistemaConfigDTO

    public async constuirDTO(nombre: String, materialesConfig?: Array<MaterialConfig>) { // Constructor para construir un objeto DTO basado en un Objeto Entity
        this.nombre = nombre
        if (materialesConfig)
           await this.construirMaterialesConfigDTO(materialesConfig) // se construyen materiales config DTO y se añaden a la lista de materiales config DTO
    }

    // Metodo para construir materiales config DTO basadas en materiales config entity
    private async construirMaterialesConfigDTO(materialesConfig: Array<MaterialConfig>) {
        this.materialesConfig = new Array<MaterialConfigDTO>()
        // Se iteran los materiales config entity para construir materiales config DTO basadas en ellos
        for (let index = 0; index < materialesConfig.length; index++) {
            const materialConfig: MaterialConfig = materialesConfig[index]
            const materialConfigDTO: MaterialConfigDTO = new MaterialConfigDTO() // se crea un material config DTO basasdo en la información del material config entity
          await  materialConfigDTO.constuirDTO(materialConfig.nombre, await materialConfig.tiposDeteriorosConfig)
            this.materialesConfig.push(materialConfigDTO) // se añade a la lista de materiales config dto al material config DTO creado
        }
    }
}
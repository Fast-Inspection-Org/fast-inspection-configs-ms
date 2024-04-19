import { CampoDTO } from "../campo/campo.dto"
import { Campo } from "../campo/campo.entity"
import { ConfigDTO } from "../config.dto"
import { Config } from "../config.entity"


export class HerramientaDTO {
    id?: number
    nombre: String
    tipo: string
    campos?: Array<CampoDTO> // Campos definidos en la herramienta
    config?: ConfigDTO | Config // atributo que representa la configuracion a la que pertenece la herramienta

    public constuirDTO(nombre: String, tipo: string, campos?: Array<Campo>) { // Constructor para construir un objeto DTO basado en un Objeto Entity
        this.nombre = nombre
        this.tipo = tipo
        if (campos)
            this.construirCamposDTO(campos) // se construyen los campos DTO basado en la información de los campos entity
    }

    // Metodo para construir los campos DTO basado en los campos Entity
    private construirCamposDTO(campos: Array<Campo>) {
        this.campos = new Array<CampoDTO>()
        campos.forEach((campo) => {
            const campoDTO: CampoDTO = new CampoDTO() // se crea un campoDTO que será la representación de la información de los campos entity
            campoDTO.constuirDTO(campo.nombre, campo.nivelImportancia)
            this.campos.push(campoDTO) // se añade el campo DTO creado a la lista de camposDTO 
        })
    }

}
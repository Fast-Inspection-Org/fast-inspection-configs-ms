import { deepEqual } from "assert"
import { CampoDefinidoDTO } from "../campo-definido/campo-definido.dto"
import { CampoDefinido, TiposCamposDefinidos } from "../campo-definido/campo-definido.entity"
import { CampoDTO } from "../campo/campo.dto"
import { Campo } from "../campo/campo.entity"
import { CausaDTO } from "../causa/causa.dto"
import { Causa } from "../causa/causa.entity"
import { MaterialConfigDTO } from "../materiales-config/material-config.dto"
import { MaterialConfig } from "../materiales-config/material-config.entity"
import { CampoDefinidoTexto } from "../campo-definido-texto/entities/campo-definido-texto.entity"
import { CampoDefinidoImagen } from "../campo-definido-imagen/entities/campo-definido-imagen.entity"
import { CampoDefinidoNumerico } from "../campo-definido-numerico/entities/campo-definido-numerico.entity"
import { CampoDefinidoSeleccion } from "../campo-definido-seleccion/entities/campo-definido-seleccion.entity"

export class TipoDeterioroConfigDTO {
    id: number
    nombre: String
    tipo: String
    detectabilidad?: number // (solo deterioro Analisis Criticidad)
    camposDefinidos: Array<CampoDefinidoDTO> // Atributo que representa los campos definidos para este tipo de deterioro
    causas: Array<CausaDTO> // Atributo que define las causas para este tipo de deterioro
    materialConfig: MaterialConfig | MaterialConfigDTO
    camposAfectados?: Array<CampoDTO> // atributo que define los campos afectados por este tipo de deterioro (solo deterioro tipo Analisis Criticidad)

    public constuirDTO(nombre: String, tipo: String, camposDefinidos: Array<CampoDefinido>, causas: Array<Causa>, detectabilidad?: number, camposAfectados?: Array<Campo>) { // Constructor para construir un objeto DTO basado en un Objeto Entity
        this.nombre = nombre
        this.tipo = tipo
        if (detectabilidad)
            this.detectabilidad = detectabilidad
        if (camposDefinidos)
            this.construirCamposDefinidosDTO(camposDefinidos) // se construyen campos definidos DTO y se añaden a la lista de campos definidos DTO
        if (causas)
            this.construirCausasDTO(causas) // se construyen causas DTO y se añaden a la lista de causas DTO
        if (camposAfectados)
            this.construirCamposDTO(camposAfectados) // se construyen campos DTO y se añaden a la lista de campos DTO

    }

    // Metodo para construir campos  DTO basadas en campos  entity
    private construirCamposDTO(camposAfectados: Array<Campo>) {
        this.camposAfectados = new Array<CampoDTO>()
        // Se iteran los campos  entity para construir campos DTO basados en ellos
        camposAfectados.forEach((campo) => {
            const campoDTO: CampoDTO = new CampoDTO() // se crea un campo  DTO basado en la información del campo  entity
            campoDTO.constuirDTO(campo.nombre, campo.nivelImportancia)
            this.camposAfectados.push(campoDTO) // se añade a la lista de campos dto el campo dto creado
        })
    }

    // Metodo para construir campos definidos  DTO basadas en campos definidos  entity
    private construirCamposDefinidosDTO(camposDefinidos: Array<CampoDefinido>) {
        this.camposDefinidos = new Array<CampoDefinidoDTO>()
        // Se iteran los campos definidos  entity para construir campos definidos DTO basados en ellos
        camposDefinidos.forEach((campoDefinido) => {
            const campoDefinidoDTO: CampoDefinidoDTO = new CampoDefinidoDTO() // se crea un campo defindo  DTO basasdo en la información del campo definido  entity
            if (campoDefinido instanceof CampoDefinidoTexto) // si es de tipo texto
                campoDefinidoDTO.constuirDTO(undefined, campoDefinido.nombre, campoDefinido.tipo) // se construye con la información de un tipo de deteriro tipo texto
            else if (campoDefinido instanceof CampoDefinidoImagen) // si es de tipo imagen
                campoDefinidoDTO.constuirDTO(undefined, campoDefinido.nombre, campoDefinido.tipo) // se construye con la información de un tipo de deteriro tipo imagen
            else if (campoDefinido instanceof CampoDefinidoNumerico) // si es de tipo numerico
                campoDefinidoDTO.constuirDTO(undefined, campoDefinido.nombre, campoDefinido.tipo, campoDefinido.inicioIntervalo, campoDefinido.finalIntervalo, campoDefinido.unidadMedida) // se construye con la información de un tipo de deteriro tipo numerico
            else if (campoDefinido instanceof CampoDefinidoSeleccion) // si es de tipo selección
                campoDefinidoDTO.constuirDTO(undefined, campoDefinido.nombre, campoDefinido.tipo, undefined, undefined, undefined, JSON.parse(campoDefinido.opciones.toString())) // se construye con la información de un tipo de deteriro tipo imagen

            this.camposDefinidos.push(campoDefinidoDTO) // se añade a la lista de campos definidos dto el campo definido dto creado
        })
    }

    // Metodo para construir causas DTO basadas en causas entity
    private construirCausasDTO(causas: Array<Causa>) {
        this.causas = new Array<CausaDTO>()
        // Se iteran las causas  entity para construir causas DTO basados en ellas
        causas.forEach((causa) => {
            const causaDTO: CausaDTO = new CausaDTO() // se crea una causa DTO basasdo en la información de la causa entity
            causaDTO.constuirDTO(causa.nombre)
            this.causas.push(causaDTO) // se añade a la lista de causas dto la causa dto creada
        })
    }
}
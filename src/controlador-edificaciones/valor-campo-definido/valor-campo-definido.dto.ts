import { CampoDefinidoDTO } from "src/configs/campo-definido/campo-definido.dto"
import { DeterioroDTO } from "../deterioro/deterioro.dto"

 export class ValorCampoDefinidoDTO {
    id: number // Atributo unico
    valor: String // Define el valor seleccionado para un campo determinado
    campoDefinido: CampoDefinidoDTO // Define el campo al cual se le asigna un valor para un deterioro especifico 
    deterioro: DeterioroDTO // Atributo que define al deterioro al cual pertnece este valor de campo definido
 }
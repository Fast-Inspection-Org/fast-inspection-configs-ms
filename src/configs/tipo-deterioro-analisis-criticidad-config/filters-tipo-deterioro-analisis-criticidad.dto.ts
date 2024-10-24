export class FiltersTipoDeterioroAnalisisCriticidadDTO {
    idMaterialConfig: number
    nombre: String
    withCamposAfectados?: boolean // define si se desea obtener el tipo de deterioro con las relaciones de sus campos
}
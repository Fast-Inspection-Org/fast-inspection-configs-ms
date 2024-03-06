import { LevantamientoDTO } from "../levantamiento/levantamiento.dto"


export class EdificacionDTO {
    id: number // Atributo único
    nombre: String
    direccion: String
    levantamientos: Array<LevantamientoDTO> // Atributo que define el historial de levantamientos realizados a una edificación
}
import { CampoDefinidoSerializable } from '../campo-definido/serializable/campo-definido.serializable';
import { Causa } from '../causa/causa.entity';

export class TipoDeterioroSerializable {
  id: number;
  nombre: String;
  detectabilidad: number;
  cantCamposAfectados: number;
  cantCausas: number;

  constructor(
    id: number,
    nombre: String,
    detectabilidad: number,
    cantCamposAfectados: number,
    cantCausas: number,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.detectabilidad = detectabilidad;
    this.cantCamposAfectados = cantCamposAfectados;
    this.cantCausas = cantCausas;
  }
}

export class TipoDeterioroSerializableDetails {
  id: number;
  nombre: String;
  detectabilidad: number;
  cantCamposAfectados: number;
  cantCausas: number;
  camposDefinidos: Array<CampoDefinidoSerializable>;
  causas: Array<Causa>;

  constructor(
    id: number,
    nombre: String,
    detectabilidad: number,
    cantCamposAfectados: number,
    cantCausas: number,
    camposDefinidos: Array<CampoDefinidoSerializable>,
    causas: Array<Causa>,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.detectabilidad = detectabilidad;
    this.cantCamposAfectados = cantCamposAfectados;
    this.cantCausas = cantCausas;
    this.camposDefinidos = camposDefinidos;
    this.causas = causas;
  }
}

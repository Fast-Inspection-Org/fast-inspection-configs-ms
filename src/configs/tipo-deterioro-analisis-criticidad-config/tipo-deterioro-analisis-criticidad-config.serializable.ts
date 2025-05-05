import { CampoDefinidoSerializable } from '../campo-definido/serializable/campo-definido.serializable';
import { Campo } from '../campo/campo.entity';
import { Causa } from '../causa/causa.entity';
import {
  TipoDeterioroSerializable,
  TipoDeterioroSerializableDetails,
} from '../tipo-deterioros-config/tipo-deterioro-config.serializable';

export class TipoDeterioroAnalisisCriticidadConfigSerializable extends TipoDeterioroSerializable {
  camposAfectados?: Array<Campo>;
  constructor(
    id: number,
    nombre: String,
    cantCamposAfectados: number,
    cantCausas: number,
    detectabilidad: number,
    camposAfectados?: Array<Campo>,
  ) {
    super(id, nombre, detectabilidad, cantCamposAfectados, cantCausas);
    this.camposAfectados = camposAfectados;
  }
}

export class TipoDeterioroAnalisisCriticidadConfigSerializableDetails extends TipoDeterioroSerializableDetails {
  camposAfectados: Array<Campo>;
  constructor(
    id: number,
    nombre: String,
    cantCamposAfectados: number,
    cantCausas: number,
    detectabilidad: number,
    camposDefinidos: Array<CampoDefinidoSerializable>,
    causas: Array<Causa>,
    camposAfectados: Array<Campo>,
  ) {
    super(
      id,
      nombre,
      detectabilidad,
      cantCamposAfectados,
      cantCausas,
      camposDefinidos,
      causas,
    );
    this.camposAfectados = camposAfectados;
  }
}

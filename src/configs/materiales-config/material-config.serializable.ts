import { TipoDeterioroAnalisisCriticidadConfigSerializable, TipoDeterioroAnalisisCriticidadConfigSerializableDetails } from '../tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.serializable';

export class MaterialConfigSerializable {
  id: number;
  nombre: String;
  cantTiposDeterioros: number;

  constructor(id: number, nombre: String, cantTiposDeterioros: number) {
    this.id = id;
    this.nombre = nombre;
    this.cantTiposDeterioros = cantTiposDeterioros;
  }
}

export class MaterialConfigSerializableDetails extends MaterialConfigSerializable {
  tiposDeteriorosConfig: TipoDeterioroAnalisisCriticidadConfigSerializableDetails[];

  constructor(
    id: number,
    nombre: String,
    cantTiposDeterioros: number,
    tiposDeteriorosConfig: TipoDeterioroAnalisisCriticidadConfigSerializableDetails[],
  ) {
    super(id, nombre, cantTiposDeterioros);
    this.tiposDeteriorosConfig = tiposDeteriorosConfig;
  }
}

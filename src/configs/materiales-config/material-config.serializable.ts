import { TipoDeterioroAnalisisCriticidadConfigSerializable } from '../tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.serializable';

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
  tiposDeteriorosConfig: TipoDeterioroAnalisisCriticidadConfigSerializable[];

  constructor(
    id: number,
    nombre: String,
    cantTiposDeterioros: number,
    tiposDeteriorosConfig: TipoDeterioroAnalisisCriticidadConfigSerializable[],
  ) {
    super(id, nombre, cantTiposDeterioros);
    this.tiposDeteriorosConfig = tiposDeteriorosConfig;
  }
}

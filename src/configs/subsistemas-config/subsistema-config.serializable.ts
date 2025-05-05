import { MaterialConfigSerializableDetails } from '../materiales-config/material-config.serializable';

export class SubsistemaConfigSerializable {
  id: number;
  nombre: String;
  cantMateriales: number;

  constructor(id: number, nombre: String, cantMateriales: number) {
    this.id = id;
    this.nombre = nombre;
    this.cantMateriales = cantMateriales;
  }
}

export class SubsistemaConfigSerializableDetails extends SubsistemaConfigSerializable {
  materialesConfig: MaterialConfigSerializableDetails[];
  constructor(
    id: number,
    nombre: String,
    cantMateriales: number,
    materialesConfig: MaterialConfigSerializableDetails[],
  ) {
    super(id, nombre, cantMateriales);
    this.materialesConfig = materialesConfig;
  }
}

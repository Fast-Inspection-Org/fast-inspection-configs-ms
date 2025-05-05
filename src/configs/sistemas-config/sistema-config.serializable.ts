import { Campo } from '../campo/campo.entity';
import { HerramientaAnalisisCriticidad } from '../herramienta-analisis-criticidad/herrramienta-analisis-criticidad.entity';
import { HerramientaAnalisisCriticidadSerializableDetails } from '../herramienta-analisis-criticidad/serializable/herramienta-analisis-criticidad.serializable';
import { Herramienta } from '../herramientas/herramienta.entity';
import { HerramientaSerializable } from '../herramientas/herramienta.serializable';
import { SubsistemaConfigSerializableDetails } from '../subsistemas-config/subsistema-config.serializable';

export class SistemaConfigSerializable {
  id: number;
  nombre: String;
  cantSubsistemas: number;
  herramienta: HerramientaSerializable; // representa el nombre de la herramienta a la que pertenece el sistema
  configVersion: number; // indica la versión de la configuración a la cual pertenece el sistema

  constructor(
    id: number,
    nombre: String,
    cantSubsistemas: number,
    herramienta: Herramienta,
    configVersion: number,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.cantSubsistemas = cantSubsistemas;
    this.herramienta = new HerramientaSerializable(
      herramienta.id,
      herramienta.nombre,
      herramienta.tipo,
    );
    this.configVersion = configVersion;
  }
}

export class SistemaConfigSerializableDetails {
  id: number;
  nombre: String;
  cantSubsistemas: number;
  herramienta: HerramientaAnalisisCriticidadSerializableDetails;
  configVersion: number;
  subSistemasConfig: SubsistemaConfigSerializableDetails[];
  constructor(
    id: number,
    nombre: String,
    cantSubsistemas: number,
    herramienta: Herramienta,
    campos: Array<Campo>,
    configVersion: number,
    subSistemasConfig: SubsistemaConfigSerializableDetails[],
  ) {
    this.id = id;
    this.nombre = nombre;
    this.cantSubsistemas = cantSubsistemas;
    this.configVersion = configVersion;
    this.herramienta = new HerramientaAnalisisCriticidadSerializableDetails(
      herramienta.id,
      herramienta.nombre,
      herramienta.tipo,
      campos,
    );
    this.subSistemasConfig = subSistemasConfig;
  }
}

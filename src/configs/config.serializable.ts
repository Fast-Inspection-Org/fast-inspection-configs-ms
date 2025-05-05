import { HerramientaSerializable } from './herramientas/herramienta.serializable';
import { IndiceCalculableSinIntervaloSerializableDetails } from './indice-calculable-sin-intervalo/serializable/indice-calculable-sin-intervalo.serializable';
import { IndiceCalculableSerializable } from './indice-calculable/serializable/indice-calculable.serializable';
import { SistemaConfigSerializableDetails } from './sistemas-config/sistema-config.serializable';

export class ConfigSerializable {
  version: number; // atributo que representa la version de la configuración y su identificador unico
  nombre: String;
  descripcion: String;
  state: boolean; // Atributo que define el estado de la configuración (true: terminada, false: en progreso)
  porcentajeCompletitud: number;

  constructor(
    version: number,
    nombre: String,
    descripcion: String,
    state: boolean,
    porcentajeCompletitud: number,
  ) {
    this.version = version;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.state = state;
    this.porcentajeCompletitud = porcentajeCompletitud;
  }
}

export class ConfigSerializableDetails extends ConfigSerializable {
  version: number; // atributo que representa la version de la configuración y su identificador unico
  nombre: String;
  descripcion: String;
  state: boolean; // Atributo que define el estado de la configuración (true: terminada, false: en progreso)
  porcentajeCompletitud: number;
  indicesCalculables: Array<IndiceCalculableSerializable>;
  sistemasConfig: SistemaConfigSerializableDetails[];
  herramientas: Array<HerramientaSerializable>;
  constructor(
    version: number,
    nombre: String,
    descripcion: String,
    state: boolean,
    porcentajeCompletitud: number,
    sistemasConfig: SistemaConfigSerializableDetails[],
    indicesCalculables: Array<IndiceCalculableSerializable>,
    herramientas: Array<HerramientaSerializable>,
  ) {
    super(version, nombre, descripcion, state, porcentajeCompletitud);
    this.sistemasConfig = sistemasConfig;
    this.indicesCalculables = indicesCalculables;
    this.herramientas = herramientas;
  }
}

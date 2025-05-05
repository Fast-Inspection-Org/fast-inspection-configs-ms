import { TiposCamposDefinidos } from 'src/configs/campo-definido/campo-definido.entity';
import { CampoDefinidoSerializable } from 'src/configs/campo-definido/serializable/campo-definido.serializable';

export class CampoDefinidoSeleccionSerializable extends CampoDefinidoSerializable {
  opciones: Array<string>;
  constructor(
    id: number,
    nombre: String,
    tipo: TiposCamposDefinidos,
    opciones: Array<string>,
  ) {
    super(id, nombre, tipo);
    this.opciones = opciones;
  }
}

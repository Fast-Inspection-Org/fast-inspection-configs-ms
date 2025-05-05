import { TiposCamposDefinidos } from 'src/configs/campo-definido/campo-definido.entity';
import { CampoDefinidoSerializable } from 'src/configs/campo-definido/serializable/campo-definido.serializable';

export class CampoDefinidoTextoSerializable extends CampoDefinidoSerializable {
  constructor(id: number, nombre: String, tipo: TiposCamposDefinidos) {
    super(id, nombre, tipo);
  }
}

import { Campo } from 'src/configs/campo/campo.entity';
import { HerramientaSerializable } from 'src/configs/herramientas/herramienta.serializable';

export class HerramientaAnalisisCriticidadSerializableDetails extends HerramientaSerializable {
  id: number;
  nombre: String;
  tipo: string;
  campos: Array<Campo>;

  constructor(id: number, nombre: String, tipo: string, campos: Array<Campo>) {
    super(id, nombre, tipo);
    this.campos = campos;
  }
}

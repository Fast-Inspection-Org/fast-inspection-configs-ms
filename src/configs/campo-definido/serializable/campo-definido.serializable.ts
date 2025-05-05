import { TiposCamposDefinidos } from '../campo-definido.entity';

export class CampoDefinidoSerializable {
  id: number;
  nombre: String;
  tipo: TiposCamposDefinidos;

  constructor(id: number, nombre: String, tipo: TiposCamposDefinidos) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
  }
}

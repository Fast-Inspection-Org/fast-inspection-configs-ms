import { TiposCamposDefinidos } from 'src/configs/campo-definido/campo-definido.entity';
import { CampoDefinidoSerializable } from 'src/configs/campo-definido/serializable/campo-definido.serializable';

export class CampoDefinidoNumericoSerializable extends CampoDefinidoSerializable {
  inicioIntervalo: number;
  finalIntervalo: number;
  unidadMedida: String;

  constructor(
    id: number,
    nombre: String,
    tipo: TiposCamposDefinidos,
    inicioIntervalo: number,
    finalIntervalo: number,
    unidadMedida: String,
  ) {
    super(id, nombre, tipo);
    this.inicioIntervalo = inicioIntervalo;
    this.finalIntervalo = finalIntervalo;
    this.unidadMedida = unidadMedida;
  }
}

import { IndicadorSinIntervalo } from 'src/configs/indicador-sin-intervalo/indicador-sin-intervalo.entity';
import { Calculos } from 'src/configs/indice-calculable/indice-calculable.entity';
import { IndiceCalculableSerializable } from 'src/configs/indice-calculable/serializable/indice-calculable.serializable';

export class IndiceCalculableSinIntervaloSerializableDetails extends IndiceCalculableSerializable {
  indicadoresSinIntervalos: Array<IndicadorSinIntervalo>;

  constructor(
    id: number,
    nombre: String,
    tipo: string,
    calculo: Calculos,
    indicadoresSinIntervalos: Array<IndicadorSinIntervalo>,
  ) {
    super(id, nombre, tipo, calculo);
    this.indicadoresSinIntervalos = indicadoresSinIntervalos;
  }
}

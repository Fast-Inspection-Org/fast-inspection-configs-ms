import { IndicadorIntervalo } from 'src/configs/indicador-intervalo/indicador-intervalo.entity';
import { Calculos } from 'src/configs/indice-calculable/indice-calculable.entity';
import { IndiceCalculableSerializable } from 'src/configs/indice-calculable/serializable/indice-calculable.serializable';

export class IndiceCaculableIntervaloSerializableDetails extends IndiceCalculableSerializable {
  indicadoresIntervalos: Array<IndicadorIntervalo>;
  constructor(
    id: number,
    nombre: String,
    tipo: string,
    calculo: Calculos,
    indicadoresIntervalos: Array<IndicadorIntervalo>,
  ) {
    super(id, nombre, tipo, calculo);
    this.indicadoresIntervalos = indicadoresIntervalos;
  }
}

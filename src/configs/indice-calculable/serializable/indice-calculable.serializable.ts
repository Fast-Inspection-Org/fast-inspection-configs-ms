import { Calculos } from '../indice-calculable.entity';

export class IndiceCalculableSerializable {
  id: number;
  nombre: String;
  tipo: string;
  calculo: Calculos;

  constructor(id: number, nombre: String, tipo: string, calculo: Calculos) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.calculo = calculo;
  }
}

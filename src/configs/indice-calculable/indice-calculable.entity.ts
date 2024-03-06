import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { Config } from "../config.entity";
import { Indicador } from "../indicador/indicador.entity";

export enum TipoIndiceCalculable {
  InidiceCalculableIntervalo = "indiceCalculableIntervalo",
  IndiceCalcuableSinIntervalo = "indiceCalculableSinIntervalo"
}

export enum Calculos {
  Detectabilidad = 0,
  Impacto = 1,
  Frecuencia = 2,
  Criticidad = 3
}

@Entity("indiceCalculable")
@TableInheritance({ column: { type: "varchar", name: "tipo" } })
export abstract class IndiceCalculable {
  @PrimaryGeneratedColumn()
  id: number // Atributo unico
  @Column()
  nombre: String
  @Column()
  tipo: string
  @ManyToOne(() => Config, config => config.indicesCalculables, { onDelete: "CASCADE" })
  config: Config // Atributo que representa la configuracion donde esta definido los indices calculables
  @Column()
  calculo: number  // Atributo que hace referencia al calculo indicado para este indice

  constructor(id?: number, nombre?: String, config?: Config, tipo?: string, calculo?: number) {
    this.id = id
    this.nombre = nombre
    this.config = config
    this.tipo = tipo
    this.calculo = calculo
  }

  public replicarVersion() {
    this.id = undefined
  }

  //Operaciones
  public abstract obtenerIndicadorCalculo(valorCalculo: number): Indicador;

}
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { Config } from "../config.entity";
import { Indicador } from "../indicador/indicador.entity";
import { Exclude } from "class-transformer";

export enum TipoIndiceCalculable {
  InidiceCalculableIntervalo = "indiceCalculableIntervalo",
  IndiceCalcuableSinIntervalo = "indiceCalculableSinIntervalo"
}

export enum Calculos {
  Detectabilidad = "Detectabilidad",
  Impacto = "Impacto",
  Frecuencia = "Frecuencia",
  Criticidad = "Criticidad"
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
  @Exclude()
  @Column()
  configVersion: number
  @Exclude()
  @ManyToOne(() => Config, config => config.indicesCalculables, { onDelete: "CASCADE" })
  config: Config // Atributo que representa la configuracion donde esta definido los indices calculables
  @Column()
  calculo: Calculos  // Atributo que hace referencia al calculo indicado para este indice

  constructor(id?: number, nombre?: String, config?: Config, tipo?: string, calculo?: Calculos) {
    this.id = id
    this.nombre = nombre
    this.config = config
    this.tipo = tipo
    this.calculo = calculo
  }

 
  //Operaciones
  public  abstract obtenerIndicadorCalculo(valorCalculo: number): Promise<Indicador>;
  public abstract obtenerIndicadores (): Promise<Array<Indicador>>

}
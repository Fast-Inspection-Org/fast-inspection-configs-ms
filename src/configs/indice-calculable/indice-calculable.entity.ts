import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Config } from "../config.entity";

@Entity("indiceCalculable")
export abstract class IndiceCalculable {
    @PrimaryGeneratedColumn()
    id: number // Atributo unico
    @Column()
    nombre: String

    constructor(nombre: String) {
    this.nombre = nombre
  }    

    public replicarVersion() {
    this.id = undefined
}

}
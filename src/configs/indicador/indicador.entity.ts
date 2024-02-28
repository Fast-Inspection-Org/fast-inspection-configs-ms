import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("indicador")
export abstract class Indicador {
    @PrimaryGeneratedColumn()
    id: number // Atributo unico
    @Column()
    nombre: String
    @Column()
    valor: number

    constructor(nombre: String, valor: number) {
        this.nombre = nombre
        this.valor = valor
    }

    public replicarVersion() {
        this.id = undefined
    }
}
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Levantamiento } from "../levantamiento/levantamiento.entity";

@Entity("edificacion")
export class Edificacion {
    @PrimaryGeneratedColumn()
    id: number // Atributo único
    @Column({ unique: true })
    nombre: String
    @Column({ unique: true })
    direccion: String
    @OneToMany(() => Levantamiento, levantamiento => levantamiento.edificacion)
    levantamientos: Array<Levantamiento> // Atributo que define el historial de levantamientos realizados a una edificación
}
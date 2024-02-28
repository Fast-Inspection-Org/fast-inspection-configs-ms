import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Deterioro } from "../deterioro/deterioro.entity";
import { Sistema } from "./estructura-levantamiento/sistema.class";
import { Edificacion } from "../edificacion/edificacion.entity";

@Entity("levantamiento")
export class Levantamiento {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ unique: true })
    fechaInicio: Date
    @Column()
    fechaFinalizado: Date
    @OneToMany(() => Deterioro, deterioro => deterioro.levantamiento)
    deterioros: Array<Deterioro> // atributo que define a los deterios pertenecientes al levantamiento
    @ManyToOne(() => Edificacion, edificacion => edificacion.levantamientos)
    edificacion: Edificacion // Atributo que define la edificacion a la cual pertenece el letantamiento
    // Atributos para definir la estructura de un levantamiento
    sistemas: Array<Sistema> // atributo que define La *información* de los sistemas de un levantamiento
}
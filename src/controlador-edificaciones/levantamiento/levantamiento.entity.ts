import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Deterioro } from "../deterioro/deterioro.entity";
import { Sistema } from "./estructura-levantamiento/sistema.domain";
import { Edificacion } from "../edificacion/edificacion.entity";
import { Config } from "src/configs/config.entity";

@Entity("levantamiento")
export class Levantamiento {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    fechaInicio: Date
    @Column()
    fechaFinalizado: Date
    @OneToMany(() => Deterioro, deterioro => deterioro.levantamiento, { eager: true, cascade: true })
    deterioros: Array<Deterioro> // atributo que define a los deterios pertenecientes al levantamiento
    @ManyToOne(() => Edificacion, edificacion => edificacion.levantamientos, { onDelete: "CASCADE" })
    edificacion: Edificacion // Atributo que define la edificacion a la cual pertenece el letantamiento
    @ManyToOne(() => Config, { eager: true, onDelete: "CASCADE" })
    config: Config // Define la configuración a la cual pertenece el levantamiento

}
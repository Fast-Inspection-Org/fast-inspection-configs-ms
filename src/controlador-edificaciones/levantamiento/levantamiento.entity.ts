import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Deterioro } from "../deterioro/deterioro.entity";
import { Sistema } from "./estructura-levantamiento/sistema.domain";
import { Edificacion } from "../edificacion/edificacion.entity";
import { Config } from "src/configs/config.entity";
import { DeterioroDTO } from "../deterioro/deterioro.dto";
import { ConfigDTO } from "src/configs/config.dto";
import { EdificacionDTO } from "../edificacion/edificacion.dto";

@Entity("levantamiento")
export class Levantamiento {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    fechaInicio: Date
    @Column()
    fechaFinalizado: Date
    @OneToMany(() => Deterioro, deterioro => deterioro.levantamiento, { lazy: true, cascade: true })
    deterioros: Promise<Array<Deterioro>> // atributo que define a los deterios pertenecientes al levantamiento
    @Column()
    edificacionId: number
    @ManyToOne(() => Edificacion, edificacion => edificacion.levantamientos, { onDelete: "CASCADE" })
    edificacion: Edificacion // Atributo que define la edificacion a la cual pertenece el letantamiento
    @Column()
    configVersion: number
    @ManyToOne(() => Config, { lazy: true, onDelete: "CASCADE" })
    config: Promise<Config> // Define la configuración a la cual pertenece el levantamiento


    constructor(id?: number, fechaInicio?: Date, fechaFinalizado?: Date, edificacionDTO?: EdificacionDTO, configDTO?: ConfigDTO) {
        this.id = id
        this.fechaInicio = fechaInicio
        this.fechaFinalizado = fechaFinalizado
        if (edificacionDTO)
            this.edificacion = new Edificacion(edificacionDTO.id)
        if (configDTO)
            this.config = Promise.resolve(new Config(configDTO.version))
    }




}
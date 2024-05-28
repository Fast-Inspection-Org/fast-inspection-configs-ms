import { Column, DriverOptionNotSetError, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Levantamiento } from "../levantamiento/levantamiento.entity";
import { Sistema } from "../levantamiento/estructura-levantamiento/sistema.domain";
import { TipoDeterioro } from "../levantamiento/estructura-levantamiento/tipo-deterioro.domain";
import { ValorCampoDefinido } from "../valor-campo-definido/valor-campo-definido.entity";
import { ValorCampoDefinidoDTO } from "../valor-campo-definido/valor-campo-definido.dto";
import { CampoDefinido } from "src/configs/campo-definido/campo-definido.entity";
import { TipoDeterioroConfig, TipoTipoDeterioro } from "src/configs/tipo-deterioros-config/tipo-deterioro-config.entity";
import { TipoDeterioroAnalisisCriticidadConfigController } from "src/configs/tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.controller";
import { TipoDeterioroAnalisisCriticidadConfig } from "src/configs/tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.entity";
import { MaterialConfig } from "src/configs/materiales-config/material-config.entity";
import { LevantamientoDTO } from "../levantamiento/levantamiento.dto";

@Entity("deterioro")
export class Deterioro {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    idSistema: number
    @Column()
    idSubSistema: number
    @Column()
    idMaterial: number
    @Column()
    idTipoDeterioro: number
    @ManyToOne(() => Levantamiento, levantamiento => levantamiento.deterioros, { onDelete: "CASCADE" })
    levantamiento: Levantamiento
    @OneToMany(() => ValorCampoDefinido, valorCampoDefinido => valorCampoDefinido.deterioro, {lazy: true})
    valorCamposDefinidos: Promise<Array<ValorCampoDefinido>> // Atributo que representa los valores seleccionados para ese deterioro *por cada campo definido*

    constructor (id?: number, idSistema?: number, idSubSistema?: number, idMaterial?: number, idTipoDeterioro?: number, levantamientoDTO?: LevantamientoDTO) {
        this.id = id
        this.idSistema = idSistema
        this.idSubSistema = idSubSistema
        this.idMaterial = idMaterial
        this.idTipoDeterioro = idTipoDeterioro
        if (levantamientoDTO)
        this.levantamiento = new Levantamiento(levantamientoDTO.id)
    }

}
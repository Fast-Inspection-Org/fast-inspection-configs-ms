import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Levantamiento } from "../levantamiento/levantamiento.entity";
import { Sistema } from "../levantamiento/estructura-levantamiento/sistema.domain";
import { TipoDeterioro } from "../levantamiento/estructura-levantamiento/tipo-deterioro.domain";
import { ValorCampoDefinido } from "../valor-campo-definido/valor-campo-definido.entity";

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
    @OneToMany(() => ValorCampoDefinido, valorCampoDefinido => valorCampoDefinido.deterioro)
    valorCamposDefinidos: Array<ValorCampoDefinido> // Atributo que representa los valores seleccionados para ese deterioro *por cada campo definido*


}
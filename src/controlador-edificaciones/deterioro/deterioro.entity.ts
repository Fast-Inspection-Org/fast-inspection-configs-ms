import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Levantamiento } from "../levantamiento/levantamiento.entity";
import { Sistema } from "../levantamiento/estructura-levantamiento/sistema.class";
import { TipoDeterioro } from "../levantamiento/estructura-levantamiento/tipo-deterioro.class";
import { ValorCampoDefinido } from "../valor-campo-definido/valor-campo-definido.entity";

@Entity("deterioro")
export class Deterioro {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ unique: true })
    idSistema: number
    @Column({ unique: true })
    idSubSistema: number
    @Column({ unique: true })
    idMaterial: number
    @Column({ unique: true })
    idTipoDeterioro: number
    @ManyToOne(() => Levantamiento, levantamiento => levantamiento.deterioros)
    levantamiento: Levantamiento
    @OneToMany(() => ValorCampoDefinido, valorCampoDefinido => valorCampoDefinido.deterioro)
    valorCamposDefinidos: Array<ValorCampoDefinido> // Atributo que representa los valores seleccionados para ese deterioro *por cada campo definido*
    //Atributos para realizar calculos
    sistema: Sistema // atributo que define la referencia de memoria del sistema al que pertenece el deterioro (Relacion Birideccional)
    tipoDeterioro: TipoDeterioro // atributo que define la referencia de memoria del tipo de deterior al que pertenece el deterioro (Relacion Birideccional)

}
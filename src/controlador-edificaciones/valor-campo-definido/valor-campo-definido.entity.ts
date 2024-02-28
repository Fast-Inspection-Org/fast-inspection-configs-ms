import { CampoDefinido } from "src/configs/campo-definido/campo-definido.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Deterioro } from "../deterioro/deterioro.entity";

@Entity("valorCampoDefinido")
export class ValorCampoDefinido {
    @PrimaryGeneratedColumn()
    id: number // Atributo unico
    @Column({ unique: true })
    valor: String // Define el valor seleccionado para un campo determinado
    @OneToOne(() => CampoDefinido)
    @JoinColumn()
    campoDefinido: CampoDefinido // Define el campo al cual se le asigna un valor para un deterioro especifico
    @ManyToOne(() => Deterioro, deterioro => deterioro.valorCamposDefinidos)
    deterioro: Deterioro // Atributo que define al deterioro al cual pertnece este valor de campo definido
}
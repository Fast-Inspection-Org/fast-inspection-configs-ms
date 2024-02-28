import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoDeterioroConfig } from "../tipo-deterioros-config/tipo-deterioro-config.entity";

@Entity("causa")
export class Causa {
    @PrimaryGeneratedColumn()
    id: number // Atributo unico
    @Column()
    nombre: String // Atributo que define el nombre de la causa
    @ManyToOne(() => TipoDeterioroConfig, tipoDeterioroConfig => tipoDeterioroConfig.causas, {onDelete: "CASCADE"})
    tipoDeterioroConfig: TipoDeterioroConfig // Atributo que define el tipo de deterioro configurado al que pertenece dicha causa

    public replicarVersion() {
        this.id = undefined
    }
}
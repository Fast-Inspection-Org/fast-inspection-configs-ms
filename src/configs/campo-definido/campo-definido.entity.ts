import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoDeterioroConfig } from "../tipo-deterioros-config/tipo-deterioro-config.entity";



@Entity("campoDefinido")
export class CampoDefinido {
    @PrimaryGeneratedColumn()
    id: number // Atributo unico
    @Column()
    nombre: String // Atributo que define el nombre del campo por ejemplo: largo, ancho, profundidad, etc
    @Column()
    tipo: String //Atributo que define el tipo de campo por ejemplo: texto, numero, fecha etc, esto Sería un Enum
    @ManyToOne(() => TipoDeterioroConfig, tipoDeterioroConfig => tipoDeterioroConfig.camposDefinidos, { onDelete: "CASCADE" })
    tipoDeterioroConfig: TipoDeterioroConfig // Atributo que define el tipo de detioro configurado al que pertenece dicho campo
  

    public replicarVersion() {
        this.id = undefined
    }

}
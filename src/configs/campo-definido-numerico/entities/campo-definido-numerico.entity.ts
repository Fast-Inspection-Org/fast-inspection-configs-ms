import { CampoDefinido } from "src/configs/campo-definido/campo-definido.entity";
import { TipoDeterioroConfig } from "src/configs/tipo-deterioros-config/tipo-deterioro-config.entity";
import { ChildEntity, Column } from "typeorm";

@ChildEntity("CampoDefinidoNumerico")
export class CampoDefinidoNumerico extends CampoDefinido {
    @Column()
    inicioIntervalo: number
    @Column()
    finalIntervalo: number
    @Column({ nullable: true })
    unidadMedida: String // representa la unidad de medida del campo númerico (en caso de que este tenga)

    constructor(id?: number, nombre?: String, tipo?: String, tipoDeterioroConfig?: TipoDeterioroConfig, inicioIntervalo?: number, finalIntervalo?: number, unidadMedida?: String) {
        super(id, nombre, tipo, tipoDeterioroConfig)
        this.inicioIntervalo = inicioIntervalo
        this.finalIntervalo = finalIntervalo
        this.unidadMedida = unidadMedida
    }
}

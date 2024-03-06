import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

enum TipoIndicador {
    IndicadorIntervalo = "indicadorIntervalo",
    IndicadorSinIntervalo = "indicadorSinIntervalo"
}

@Entity("indicador")
@TableInheritance({ column: { type: "varchar", name: "tipo" } })
export abstract class Indicador {
    @PrimaryGeneratedColumn()
    id: number // Atributo unico
    @Column()
    nombre: String
    @Column()
    valor: number
    @Column()
    tipo: string

    constructor(id?: number, nombre?: String, valor?: number, tipo?: string) {
        this.nombre = nombre
        this.valor = valor
        this.tipo = tipo
    }

    public replicarVersion() {
        this.id = undefined
    }
}
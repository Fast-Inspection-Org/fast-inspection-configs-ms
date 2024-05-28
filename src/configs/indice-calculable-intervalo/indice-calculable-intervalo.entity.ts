import { ChildEntity, Entity, ManyToOne, OneToMany } from "typeorm";
import { Calculos, IndiceCalculable } from "../indice-calculable/indice-calculable.entity";
import { IndicadorIntervalo } from "../indicador-intervalo/indicador-intervalo.entity";
import { Config } from "../config.entity";
import { Indicador } from "../indicador/indicador.entity";

@ChildEntity("indiceCalculableIntervalo")
export class IndiceCalculableIntervalo extends IndiceCalculable {

    @OneToMany(() => IndicadorIntervalo, indicadorIntervalo => indicadorIntervalo.indiceCalculableIntervalo, { lazy: true })
    indicadoresIntervalos: Promise<Array<IndicadorIntervalo>> // Un indice calculable por intervalos puede tener varios indicadores de intervalos



    constructor(id?: number, nombre?: String, config?: Config, tipo?: string, calculo?: number) {
        super(id, nombre, config, tipo, calculo)
    }


    // Metodo para obtener el indicador correspondiente a un valor calculado
    public async obtenerIndicadorCalculo(valorCalculo: number): Promise<Indicador> {
        let indicador: Indicador | undefined = undefined
        const inidicadoresIntervalos: Array<IndicadorIntervalo> = await this.indicadoresIntervalos
        for (let index = 0; index < inidicadoresIntervalos.length && !indicador; index++) {
            if (inidicadoresIntervalos[index].isRange(valorCalculo)) // si el valor calculado está en el rango del indicador, significa que encontramos el indicador
                indicador = inidicadoresIntervalos[index]

        }

        return indicador
    }

    // Metodo para obtener todos los indicadores del inidce calculable
    public async obtenerIndicadores(): Promise<Array<Indicador>> {
        const indicadores: Array<Indicador> = new Array<Indicador>() // se crea una lista para almacenar los indicadores
        const inidicadoresIntervalos: Array<IndicadorIntervalo> = await this.indicadoresIntervalos
        // se almacenan los indicadores del indice en la lista de retorno
        inidicadoresIntervalos.forEach((indicador) => {
            indicadores.push(indicador)
        })

        return indicadores
    }
}
import { ChildEntity, Entity, ManyToOne, OneToMany } from "typeorm";
import { IndiceCalculable } from "../indice-calculable/indice-calculable.entity";
import { IndicadorSinIntervalo } from "../indicador-sin-intervalo/indicador-sin-intervalo.entity";
import { Config } from "../config.entity";
import { Indicador } from "../indicador/indicador.entity";

@ChildEntity("indiceCalculableSinIntervalo")
export class IndiceCalculableSinIntervalo extends IndiceCalculable {
    @OneToMany(() => IndicadorSinIntervalo, indicadorSinIntervalo => indicadorSinIntervalo.indiceCalculableSinIntervalo, { lazy: true })
    indicadoresSinIntervalos: Promise<Array<IndicadorSinIntervalo>> // Atributo que define los indicadores sin intervalos del indice calculable sin intervalos


    constructor(id?: number, nombre?: String, config?: Config, tipo?: string, calculo?: number) {
        super(id, nombre, config, tipo, calculo)
    }

   

    // Metodo para obtener el indicador correspondiente a un valor calculado
    public async obtenerIndicadorCalculo(valorCalculo: number): Promise<Indicador> {
        let indicador: Indicador | undefined = undefined
        const indicadoresSinIntervalo: Array<IndicadorSinIntervalo> = await this.indicadoresSinIntervalos
        
        for (let index = 0; index < indicadoresSinIntervalo.length && !indicador; index++) {
            if (indicadoresSinIntervalo[index].valor == valorCalculo) // si el valor calculado es igual 
                indicador = indicadoresSinIntervalo[index]

        }

        return indicador
    }

     // Metodo para obtener todos los indicadores del inidce calculable
     public async obtenerIndicadores(): Promise<Array<Indicador>> {
        const indicadores: Array<Indicador> = new Array<Indicador>() // se crea una lista para almacenar los indicadores
        const indicadoresSinIntervalo: Array<IndicadorSinIntervalo> = await this.indicadoresSinIntervalos
        // se almacenan los indicadores del indice en la lista de retorno
        indicadoresSinIntervalo.forEach((indicador) => {
            indicadores.push(indicador)
        })

        return indicadores
    }
}
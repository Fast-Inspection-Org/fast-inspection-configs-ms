import { CampoDefinido, TiposCamposDefinidos } from "src/configs/campo-definido/campo-definido.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Deterioro } from "../deterioro/deterioro.entity";
import { DeterioroDTO } from "../deterioro/deterioro.dto";
import { CampoDefinidoDTO } from "src/configs/campo-definido/campo-definido.dto";
import { CampoDefinidoImagen } from "src/configs/campo-definido-imagen/entities/campo-definido-imagen.entity";
import { CampoDefinidoTexto } from "src/configs/campo-definido-texto/entities/campo-definido-texto.entity";
import { CampoDefinidoNumerico } from "src/configs/campo-definido-numerico/entities/campo-definido-numerico.entity";
import { CampoDefinidoSeleccion } from "src/configs/campo-definido-seleccion/entities/campo-definido-seleccion.entity";

@Entity("valorCampoDefinido")
export class ValorCampoDefinido {
    @PrimaryGeneratedColumn()
    id: number // Atributo unico
    @Column({ unique: true })
    valor: String // Define el valor seleccionado para un campo determinado
    @OneToOne(() => CampoDefinido, { eager: true })
    @JoinColumn()
    campoDefinido: CampoDefinido // Define el campo al cual se le asigna un valor para un deterioro especifico
    @ManyToOne(() => Deterioro, deterioro => deterioro.valorCamposDefinidos)
    deterioro: Deterioro // Atributo que define al deterioro al cual pertnece este valor de campo definido

    constructor(id: number, valor: String, campoDefinidoDTO: CampoDefinidoDTO, deterioroDTO: DeterioroDTO) {
        this.id = id
        this.valor = valor
        if (campoDefinidoDTO) {
            if (campoDefinidoDTO.tipo === TiposCamposDefinidos.Imagen)
                this.campoDefinido = new CampoDefinidoImagen(campoDefinidoDTO.id)
            else if (campoDefinidoDTO.tipo === TiposCamposDefinidos.Texto)
                this.campoDefinido = new CampoDefinidoTexto(campoDefinidoDTO.id)
            else if (campoDefinidoDTO.tipo === TiposCamposDefinidos.Numerico)
                this.campoDefinido = new CampoDefinidoNumerico(campoDefinidoDTO.id)
            else if (campoDefinidoDTO.tipo === TiposCamposDefinidos.Seleccion)
                this.campoDefinido = new CampoDefinidoSeleccion(campoDefinidoDTO.id)
        }

        if (deterioroDTO)
            this.deterioro = new Deterioro(deterioroDTO.id)
    }
}
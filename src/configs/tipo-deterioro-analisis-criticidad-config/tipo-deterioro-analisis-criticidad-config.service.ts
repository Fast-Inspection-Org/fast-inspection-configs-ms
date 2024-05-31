import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TipoDeterioroAnalisisCriticidadConfig } from './tipo-deterioro-analisis-criticidad-config.entity';
import { EntityManager, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoDeterioroConfig } from '../tipo-deterioros-config/tipo-deterioro-config.entity';
import { MaterialConfig } from '../materiales-config/material-config.entity';
import { TipoDeterioroConfigDTO } from '../tipo-deterioros-config/tipo-deterioro-config.dto';
import { CampoDefinido } from '../campo-definido/campo-definido.entity';
import { CampoDefinidoDTO } from '../campo-definido/campo-definido.dto';
import { CampoDefinidoService } from '../campo-definido/campo-definido.service';
import { Causa } from '../causa/causa.entity';
import { CausaDTO } from '../causa/causa.dto';
import { CausaService } from '../causa/causa.service';
import { CampoDTO } from '../campo/campo.dto';
import { Campo } from '../campo/campo.entity';
import { CampoService } from '../campo/campo.service';
import { Console } from 'console';
import { TipoDeterioroAnalisisCriticidadConfigSerializable } from './tipo-deterioro-analisis-criticidad-config.serializable';
import { retry } from 'rxjs';
import { UpdateTipoDeterioroAnalisisCriticidadConfigDTO } from './update-tipo-deterioro-analisis-criticidad-config.dt';

@Injectable()
export class TipoDeterioroAnalisisCriticidadConfigService {

    constructor(@InjectRepository(TipoDeterioroAnalisisCriticidadConfig) private tipoDeterioroAnalisisCriticidadRepository: Repository<TipoDeterioroAnalisisCriticidadConfig>,
        private campoDefinidoService: CampoDefinidoService,
        private causasService: CausaService,
        private campoService: CampoService) { }

    // Método para obtener todos los tipos de deterioro analisis criticidad

    public async getAllTiposDeteriorosAnalisisCriticidadConfig(idMaterialConfig?: number, nombre?: String) {
        const tiposDeteriorosAnalisisCriticidadConfigSerializables: Array<TipoDeterioroAnalisisCriticidadConfigSerializable> = new
            Array<TipoDeterioroAnalisisCriticidadConfigSerializable>()
        // Se obtienen los tipos de deterioro de la base de datos
        const tiposDeteriorosAnalisisCriticidadConfig: Array<TipoDeterioroAnalisisCriticidadConfig> = await this.tipoDeterioroAnalisisCriticidadRepository.find({
            where: {
                id: idMaterialConfig,
                nombre: nombre ? Like(`%${nombre}%`) : nombre
            }
        })

        for (let index = 0; index < tiposDeteriorosAnalisisCriticidadConfig.length; index++) {
            const tipoDeterioroAnalisisCriticidadConfig: TipoDeterioroAnalisisCriticidadConfig = tiposDeteriorosAnalisisCriticidadConfig[index]
            tiposDeteriorosAnalisisCriticidadConfigSerializables.push(new TipoDeterioroAnalisisCriticidadConfigSerializable(tipoDeterioroAnalisisCriticidadConfig.id,
                tipoDeterioroAnalisisCriticidadConfig.nombre, await tipoDeterioroAnalisisCriticidadConfig.cantCamposAfectados(),
                await tipoDeterioroAnalisisCriticidadConfig.cantCausas()))
        }


        return tiposDeteriorosAnalisisCriticidadConfigSerializables

    }

    // Método para obtener un tipo de deterioro analisis de criticidad

    public async getTipoDeterioroAnalisisCriticidadConfig(idTipoDeterioroConfig?: number, idMaterialConfig?: number, nombre?: String) {
        return await this.tipoDeterioroAnalisisCriticidadRepository.findOne({
            where: {
                id: idTipoDeterioroConfig,
                materialConfigId: idMaterialConfig,
                nombre: nombre
            }
        })
    }

    public async createTipoDeterioroAnalisisCriticidadConfig(tipoDeterioroAnalisisCriticidadConfigDTO: TipoDeterioroConfigDTO, entityManager?: EntityManager) {
        // Si no existe un tipo de deterioro con el mismo nombre
        if (!(await this.getTipoDeterioroAnalisisCriticidadConfig(undefined, tipoDeterioroAnalisisCriticidadConfigDTO.materialConfig.id, tipoDeterioroAnalisisCriticidadConfigDTO.nombre))) {
            if (!entityManager) // No se trata de una llamada con una transacción heredada
                await this.tipoDeterioroAnalisisCriticidadRepository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
                    await this.createTipoDeterioroAnalisisCriticidadConfigWithEntityManager(tipoDeterioroAnalisisCriticidadConfigDTO, transactionManager)
                })
            else // se continua con la transacción heredada
                await this.createTipoDeterioroAnalisisCriticidadConfigWithEntityManager(tipoDeterioroAnalisisCriticidadConfigDTO, entityManager)
        }
        else
            throw new HttpException("Ya existe un tipo de deterioro con ese nombre", HttpStatus.BAD_REQUEST)

    }

    private async createTipoDeterioroAnalisisCriticidadConfigWithEntityManager(tipoDeterioroAnalisisCriticidadConfigDTO: TipoDeterioroConfigDTO, entityManager: EntityManager) {
        const tipoDeterioroAnalisisCriticidadConfig: TipoDeterioroAnalisisCriticidadConfig = new TipoDeterioroAnalisisCriticidadConfig(undefined, tipoDeterioroAnalisisCriticidadConfigDTO.nombre,
            tipoDeterioroAnalisisCriticidadConfigDTO.tipo, tipoDeterioroAnalisisCriticidadConfigDTO.materialConfig instanceof
                MaterialConfig ? tipoDeterioroAnalisisCriticidadConfigDTO.materialConfig :
            new MaterialConfig(tipoDeterioroAnalisisCriticidadConfigDTO.materialConfig.id), tipoDeterioroAnalisisCriticidadConfigDTO.detectabilidad, new Array<Campo>()) /* se crea
                un tipo de deterioro analisis criticidad para ser insertado en la base de datos */

        if (tipoDeterioroAnalisisCriticidadConfigDTO.camposAfectados)
            await this.saveCamposInTipoDeterioroAnalisisCriticidad(tipoDeterioroAnalisisCriticidadConfigDTO.camposAfectados, tipoDeterioroAnalisisCriticidadConfig, entityManager) /*Se
         insertan los campos pertenecientes al tipo de deterioro analisis de criticidad antes de insertarlo en la base de datos */

        const tipoDeterioroAnalisisCriticidadConfigInsertado: TipoDeterioroAnalisisCriticidadConfig = await entityManager.save(tipoDeterioroAnalisisCriticidadConfig) /* Se inserta
                el tipo de deterioro en la base de datos y se obtienen una instancia del tipo de deterioro con el id generado */

        if (tipoDeterioroAnalisisCriticidadConfigDTO.camposDefinidos)
            await this.saveCamposDefinidos(tipoDeterioroAnalisisCriticidadConfigDTO.camposDefinidos, tipoDeterioroAnalisisCriticidadConfigInsertado,
                entityManager) // se insertan todos los campos definidos pertenecientes al tipo de deterioro en la base de datos

        if (tipoDeterioroAnalisisCriticidadConfigDTO.causas)
            await this.saveCausas(tipoDeterioroAnalisisCriticidadConfigDTO.causas, tipoDeterioroAnalisisCriticidadConfigInsertado, entityManager) /*Se insertan las causas
            pertencientes al tipo de deterioro*/



    }

    // Metodo para insertar todos los camposDefinidos pertenecientes al tipo de deterioro
    private async saveCamposDefinidos(camposDefinidosDTO: Array<CampoDefinidoDTO>, tipoDeterioroAnalisisCriticidadConfigInsertado: TipoDeterioroAnalisisCriticidadConfig,
        entityManager: EntityManager) {
        // Se indica por campoDefinido a que tipo de deterioro registrado en la base de datos pertenecen
        for (let index = 0; index < camposDefinidosDTO.length; index++) {
            camposDefinidosDTO[index].tipoDeterioroConfig = tipoDeterioroAnalisisCriticidadConfigInsertado // Se Registra
            await this.campoDefinidoService.createCampoDefinido(camposDefinidosDTO[index], entityManager) // Se manda al servicio a crear un campo definido y a insertarlo en la base de datos
        }

    }

    private async saveCamposInTipoDeterioroAnalisisCriticidad(camposDTO: Array<CampoDTO>, tipoDeterioroAnalisiCriticidad: TipoDeterioroAnalisisCriticidadConfig,
        entityManager: EntityManager) {
        // se crea el array para almacenar los campos afectados pertenecientes al tipo de deterioro
        const camposAfectadosTipoDeterioro: Array<Campo> = new Array<Campo>()
        // Se indica por campo a que tipo de deterioro registrado en la base de datos pertenecen
        // Si al menos el primer campo no se le fue proporcionada una id
        if (!camposDTO[0].id) {
            for (let index = 0; index < camposDTO.length; index++) {
                const campo: Campo | undefined = await entityManager.findOne(Campo, {
                    where: {
                        nombre: camposDTO[index].nombre,
                        configVersion: camposDTO[index].configVersion ? camposDTO[index].configVersion :
                            tipoDeterioroAnalisiCriticidad.materialConfig.subsistemaConfig.sistemaConfig.config.version
                    }
                }) // se obtiene el campo perteneciente a la herramienta

                if (campo) { // si fue encontrado el campo

                    camposAfectadosTipoDeterioro.push(campo) // se añade el campo como parte del campo del tipoDeterioro analisis criticidad
                }
                else
                    throw new HttpException("No se encontró campo", 401)


            }
        }
        else { // si si se le fue proporcionada una id
            for (let index = 0; index < camposDTO.length; index++) {
                const campoDTO: CampoDTO = camposDTO[index]
                const campo: Campo = await this.campoService.getCampo(campoDTO.id) // se obtiene al campo de la base de datos con ese id
                if (campo) // si fue encontrado el campo
                    camposAfectadosTipoDeterioro.push(campo)
                else
                    throw new HttpException("El campo proporcionado no se encuentra en la base de datos", HttpStatus.BAD_REQUEST)
            }
        }

        // al final de haber guardado todos los campos se le asignan al tipo de deterioro
        tipoDeterioroAnalisiCriticidad.camposAfectados = Promise.resolve(camposAfectadosTipoDeterioro)

    }

    // Metodo para insertar todas la causas del tipo de deterioro
    private async saveCausas(causasDTO: Array<CausaDTO>, tipoDeterioroAnalisisCriticidadConfigInsertado: TipoDeterioroAnalisisCriticidadConfig,
        entityManager: EntityManager) {
        // Se indica por causa a que tipo de deterioro registrado en la base de datos pertenecen
        for (let index = 0; index < causasDTO.length; index++) {
            causasDTO[index].tipoDeterioroConfig = tipoDeterioroAnalisisCriticidadConfigInsertado // Se Registra
            await this.causasService.createCausa(causasDTO[index], entityManager)
        }
    }

    // IMPLEMENTAR
    /*public async updateTipoDeterioroConfigAnalisisCriticidadConfig(idTipoDeterioroAnalisisCriticidadConfig: number, idMaterialConfig: number,
        updateTipoDeterioroConfigAnalisisCriticidadConfigDTO: UpdateTipoDeterioroAnalisisCriticidadConfigDTO) {
        await this.tipoDeterioroAnalisisCriticidadRepository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
            const tipoDeterioroAnalisisCriticidadConfig: TipoDeterioroAnalisisCriticidadConfig = await this.getTipoDeterioroAnalisisCriticidadConfig(undefined, idMaterialConfig,
                updateTipoDeterioroConfigAnalisisCriticidadConfigDTO.nombre)

            // Si no existe un tipo de deterioro analisis de criticidad con el mismo nombre o si el encontrado es el mismo
            if (!tipoDeterioroAnalisisCriticidadConfig || tipoDeterioroAnalisisCriticidadConfig.id === idTipoDeterioroAnalisisCriticidadConfig) {
                // se busca el tipo de deterioro analisis criticidad a modificar
                const tipoDeterioroAnalisisCriticidadConfigUpdate: TipoDeterioroAnalisisCriticidadConfig = await
                    this.getTipoDeterioroAnalisisCriticidadConfig(idTipoDeterioroAnalisisCriticidadConfig)
                // Se modifican su propiedades
                tipoDeterioroAnalisisCriticidadConfigUpdate.nombre = updateTipoDeterioroConfigAnalisisCriticidadConfigDTO.nombre
                
            }
            else
                throw new HttpException("Ya existe un tipo de deterioro con ese nombre", HttpStatus.BAD_REQUEST)
        })
    }*/
}

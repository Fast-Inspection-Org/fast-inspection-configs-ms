import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TipoDeterioroAnalisisCriticidadConfig } from './tipo-deterioro-analisis-criticidad-config.entity';
import { EntityManager, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoDeterioroConfig } from '../tipo-deterioros-config/tipo-deterioro-config.entity';
import { MaterialConfig } from '../materiales-config/material-config.entity';
import { TipoDeterioroConfigDTO } from '../tipo-deterioros-config/tipo-deterioro-config.dto';
import { CampoDefinido, TiposCamposDefinidos } from '../campo-definido/campo-definido.entity';
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
import { CampoDefinidoTextoService } from '../campo-definido-texto/campo-definido-texto.service';
import { CampoDefinidoImagen } from '../campo-definido-imagen/entities/campo-definido-imagen.entity';
import { CampoDefinidoImagenService } from '../campo-definido-imagen/campo-definido-imagen.service';
import { CampoDefinidoSeleccionService } from '../campo-definido-seleccion/campo-definido-seleccion.service';
import { CampoDefinidoNumericoService } from '../campo-definido-numerico/campo-definido-numerico.service';

@Injectable()
export class TipoDeterioroAnalisisCriticidadConfigService {
    // En vez de inyectar los Servicios de los campos definidos aquí, lo mejor es inyectarlos en el servicio padre llamado "CampoDefinidoService"
    constructor(@InjectRepository(TipoDeterioroAnalisisCriticidadConfig) private tipoDeterioroAnalisisCriticidadRepository: Repository<TipoDeterioroAnalisisCriticidadConfig>,
        private campoDefinidoService: CampoDefinidoService,
        private campoDefinidoTextoService: CampoDefinidoTextoService,
        private campoDefinidoImagenService: CampoDefinidoImagenService,
        private campoDefinidoSeleccionService: CampoDefinidoSeleccionService,
        private campoDefinidoNumericoService: CampoDefinidoNumericoService,
        private causasService: CausaService,
        private campoService: CampoService) { }

    // Método para obtener todos los tipos de deterioro analisis criticidad

    public async getAllTiposDeteriorosAnalisisCriticidadConfig(idMaterialConfig?: number, nombre?: String) {
        const tiposDeteriorosAnalisisCriticidadConfigSerializables: Array<TipoDeterioroAnalisisCriticidadConfigSerializable> = new
            Array<TipoDeterioroAnalisisCriticidadConfigSerializable>()
        // Se obtienen los tipos de deterioro de la base de datos
        const tiposDeteriorosAnalisisCriticidadConfig: Array<TipoDeterioroAnalisisCriticidadConfig> = await this.tipoDeterioroAnalisisCriticidadRepository.find({
            where: {
                materialConfigId: idMaterialConfig,
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

    private async getTipoDeterioroAnalisisCriticidadConfig(idTipoDeterioroConfig?: number, idMaterialConfig?: number, nombre?: String) {
        return await this.tipoDeterioroAnalisisCriticidadRepository.findOne({
            where: {
                id: idTipoDeterioroConfig,
                materialConfigId: idMaterialConfig,
                nombre: nombre
            }
        })
    }


    // Método para obtener un tipo de deterioro analisis de criticidad serializable

    public async getTipoDeterioroAnalisisCriticidadConfigSerializable(idTipoDeterioroConfig?: number, idMaterialConfig?: number, nombre?: String) {
        const tipoDeterioroAnalisisCriticidadConfig: TipoDeterioroAnalisisCriticidadConfig = await this.tipoDeterioroAnalisisCriticidadRepository.findOne({
            where: {
                id: idTipoDeterioroConfig,
                materialConfigId: idMaterialConfig,
                nombre: nombre
            }
        })

        // Se retorna un objeto con la información del tipo de deterioro análisis de criticidad que se desea serializar
        return {
            id: tipoDeterioroAnalisisCriticidadConfig.id,
            nombre: tipoDeterioroAnalisisCriticidadConfig.nombre,
            camposDefinidos: await tipoDeterioroAnalisisCriticidadConfig.camposDefinidos,
            causas: await tipoDeterioroAnalisisCriticidadConfig.causas,
            detectabilidad: tipoDeterioroAnalisisCriticidadConfig.detectabilidad,
            camposAfectados: await tipoDeterioroAnalisisCriticidadConfig.camposAfectados,
        }
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
            if (camposDefinidosDTO[index].tipo == TiposCamposDefinidos.Numerico) // si el campo definido es de tipo numérico
                await this.campoDefinidoNumericoService.createCampoDefinido(camposDefinidosDTO[index], entityManager) // Se manda al servicio a crear un campo definido y a insertarlo en la base de datos
            else if (camposDefinidosDTO[index].tipo == TiposCamposDefinidos.Texto) // si el campo definido es de tipo texto
                await this.campoDefinidoTextoService.createCampoDefinido(camposDefinidosDTO[index], entityManager) // Se manda al servicio a crear un campo definido y a insertarlo en la base de datos
            else if (camposDefinidosDTO[index].tipo == TiposCamposDefinidos.Imagen) // si el campo definido es de tipo imagen
                await this.campoDefinidoImagenService.createCampoDefinido(camposDefinidosDTO[index], entityManager) // Se manda al servicio a crear un campo definido y a insertarlo en la base de datos
            else if (camposDefinidosDTO[index].tipo == TiposCamposDefinidos.Seleccion) // si el campo definido es de tipo selección
                await this.campoDefinidoSeleccionService.createCampoDefinido(camposDefinidosDTO[index], entityManager) // Se manda al servicio a crear un campo definido y a insertarlo en la base de datos
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
    public async updateTipoDeterioroConfigAnalisisCriticidadConfig(idTipoDeterioroAnalisisCriticidadConfig: number,
        updateTipoDeterioroConfigAnalisisCriticidadConfigDTO: UpdateTipoDeterioroAnalisisCriticidadConfigDTO) {
        // se busca el tipo de deterioro analisis criticidad a modificar
        const tipoDeterioroAnalisisCriticidadConfigUpdate: TipoDeterioroAnalisisCriticidadConfig = await
            this.getTipoDeterioroAnalisisCriticidadConfig(idTipoDeterioroAnalisisCriticidadConfig)
        // se busca un tipo de deterioro que posea el mismo nombre que el nuevo nombre del tipo de deterioro
        const tipoDeterioroAnalisisCriticidadConfig: TipoDeterioroAnalisisCriticidadConfig = await this.getTipoDeterioroAnalisisCriticidadConfig(undefined,
            tipoDeterioroAnalisisCriticidadConfigUpdate.materialConfigId, updateTipoDeterioroConfigAnalisisCriticidadConfigDTO.nombre)

        await this.tipoDeterioroAnalisisCriticidadRepository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
            // Si no existe un tipo de deterioro analisis de criticidad con el mismo nombre o si el encontrado es el mismo
            if (!tipoDeterioroAnalisisCriticidadConfig || tipoDeterioroAnalisisCriticidadConfig.id === idTipoDeterioroAnalisisCriticidadConfig) {

                // Se modifican su propiedades
                // Se actualiza el nombre del registro
                tipoDeterioroAnalisisCriticidadConfigUpdate.nombre = updateTipoDeterioroConfigAnalisisCriticidadConfigDTO.nombre
                // Se actualiza la detectabilidad del registro
                tipoDeterioroAnalisisCriticidadConfigUpdate.detectabilidad = updateTipoDeterioroConfigAnalisisCriticidadConfigDTO.detectabilidad
                // Se actualizan sus relaciones
                // Se actualizan las causas registradas
                await this.actualizarCausasTipoDeterioroAnalisisCriticidad(tipoDeterioroAnalisisCriticidadConfigUpdate, updateTipoDeterioroConfigAnalisisCriticidadConfigDTO.causas,
                    transactionManager)
                // Se actualizan los campos definidos registrados
                await this.actualizarCamposDefinidosTipoDeterioroAnalisisCriticidad(tipoDeterioroAnalisisCriticidadConfigUpdate,
                    updateTipoDeterioroConfigAnalisisCriticidadConfigDTO.camposDefinidos, transactionManager)
                // Se actualizan los campos afectados registrados como parte de la relación de mucho a mucho
                await this.actualizarCamposAfectadosTipoDeterioroAnalisisCriticidad(tipoDeterioroAnalisisCriticidadConfigUpdate,
                    updateTipoDeterioroConfigAnalisisCriticidadConfigDTO.camposAfectados, transactionManager)

                // Se salva el campo afectado en la base de datos 
                await transactionManager.save(tipoDeterioroAnalisisCriticidadConfigUpdate)
            }
            else
                throw new HttpException("Ya existe un tipo de deterioro con ese nombre", HttpStatus.BAD_REQUEST)
        })
    }

    private async actualizarCausasTipoDeterioroAnalisisCriticidad(tipoDeterioroAnalisisCriticidadUpdate: TipoDeterioroAnalisisCriticidadConfig, causas: Array<CausaDTO>,
        entityManager: EntityManager
    ) {
        // Lo primero es eliminar todas las causas pertenecientes al tipo de deterioro análisis criticdad
        await this.causasService.deleteCausas(tipoDeterioroAnalisisCriticidadUpdate.id)
        // Luego se insertan las nuevas causas del tipo de deterioro
        await this.saveCausas(causas, tipoDeterioroAnalisisCriticidadUpdate, entityManager)
    }

    private async actualizarCamposDefinidosTipoDeterioroAnalisisCriticidad(tipoDeterioroAnalisisCriticidadUpdate: TipoDeterioroAnalisisCriticidadConfig, camposDefinidos: Array<CampoDefinidoDTO>,
        entityManager: EntityManager
    ) {
        // Lo primero es eliminar todos los campos definidos pertenecientes al tipo de deterioro análisis criticidad
        await this.campoDefinidoService.deleteCamposDefinidos(tipoDeterioroAnalisisCriticidadUpdate.id, entityManager)
        // Luego se insertan los nuevos campos definidos del tipo de deterioro
        await this.saveCamposDefinidos(camposDefinidos, tipoDeterioroAnalisisCriticidadUpdate, entityManager)

    }

    private async actualizarCamposAfectadosTipoDeterioroAnalisisCriticidad(tipoDeterioroAnalisisCriticidadUpdate: TipoDeterioroAnalisisCriticidadConfig, camposAfectados: Array<CampoDTO>,
        entityManager: EntityManager
    ) {

        // Lo primero es eliminar todos los campos afectados de la relación de muchos a muchos del tipo de deterioro análisis criticidad
        // Debido a que una relación de mucho a mucho con las cascadas habilitadas ejecuta de forma automática la acción de eliminación
        // Directamente se salvarán los nuevos campos como parte del tipo de deterioro análisis criticidad a modificar
        await this.saveCamposInTipoDeterioroAnalisisCriticidad(camposAfectados, tipoDeterioroAnalisisCriticidadUpdate, entityManager)
    }

}

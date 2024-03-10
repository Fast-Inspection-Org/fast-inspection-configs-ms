import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HerramientaAnalisisCriticidad } from './herrramienta-analisis-criticidad.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HerramientaDTO } from '../herramientas/herramienta.dto';
import { Config } from '../config.entity';
import { CampoDTO } from '../campo/campo.dto';
import { CampoService } from '../campo/campo.service';
import { HerramientaAnalisisCriticidadDTO } from './herramienta-analisis-criticidad.dto';

@Injectable()
export class HerramientaAnalisisCriticidadService {

    constructor(@InjectRepository(HerramientaAnalisisCriticidad) private herramientaAnalisisCriticidadRepository: Repository<HerramientaAnalisisCriticidad>,
        private campoService: CampoService) { }

    // Metodo para crear una nueva herramienta Analisis de Criticidad
    public async createHerramientaAnalisisCriticidad(herramientaAnalisisCriticidadDTO: HerramientaDTO, entityManager?: EntityManager) {
        if (! await this.getHerramientaConfigId(herramientaAnalisisCriticidadDTO.nombre, herramientaAnalisisCriticidadDTO.config.version)) { // si no existe esa herrramienta en la base de datos
          
                if (!entityManager) // No se trata de una llamada con una transacción heredada
                await this.herramientaAnalisisCriticidadRepository.manager.transaction(async (trasactionManager: EntityManager) => { // se crea una transacción para este procedimiento
                    await this.createHerramientaAnalisisCriticidadWithEntity(herramientaAnalisisCriticidadDTO, trasactionManager)
                })
            else // se continua con la transacción heredada
                await this.createHerramientaAnalisisCriticidadWithEntity(herramientaAnalisisCriticidadDTO, entityManager) 
           
            
        }
        else // si existe en la base de datos
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Herramienta con el mismo nombre y perteneciente a la misma configuración',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Metodo para buscar una herramienta con un nombre pertenciente a una configuracion en especifico
    private async getHerramientaConfigId(nombre: String, verionConfig: number) {
        return this.herramientaAnalisisCriticidadRepository.findOne({
            where: {
                nombre: nombre,
                configVersion: verionConfig
            }
        })
    }

    // Metodo para obtener todas las herramientas de analisis de criticidad
    public async getAllHerrramientasAnalisisCriticidad() {
        return await this.herramientaAnalisisCriticidadRepository.find()
    }
    // Metodo auxiliar para crear una herramienta analisis de criticidad con la entityManager correspondiente
    private async createHerramientaAnalisisCriticidadWithEntity(herramientaAnalisisCriticidadDTO: HerramientaAnalisisCriticidadDTO, entityManager: EntityManager) {
        const herramientaAnalisisCriticidad: HerramientaAnalisisCriticidad = new HerramientaAnalisisCriticidad(undefined, herramientaAnalisisCriticidadDTO.nombre,
            herramientaAnalisisCriticidadDTO.tipo, herramientaAnalisisCriticidadDTO.config instanceof
                Config ? herramientaAnalisisCriticidadDTO.config : new Config(herramientaAnalisisCriticidadDTO.config.version)) // se obtiene una instancia de la herramienta entity para ser almacenada

        const herramientaAnalisisCriticidadInsertada: HerramientaAnalisisCriticidad = await entityManager.save(HerramientaAnalisisCriticidad, herramientaAnalisisCriticidad) // se alamacena la herramienta en la base de datos

        if (herramientaAnalisisCriticidadDTO.campos)
            await this.saveCamposHerramientaAnalisisCriticidad(herramientaAnalisisCriticidadDTO.campos, herramientaAnalisisCriticidadInsertada, entityManager) /* se inserta en la base de datos
         los campos como parte de esta herramienta*/
        //Ademas se utiliza await para que la transacción espere a que se realicen todas las operaciones en los demás servicios
    }

    // Metodo para insertar en la base de datos los campos de la herramienta analisis de criticidad
    private async saveCamposHerramientaAnalisisCriticidad(camposDTO: Array<CampoDTO>, herramientaAnalisisCriticidadInsertada: HerramientaAnalisisCriticidad,
        entityManager: EntityManager) {
        for (let index = 0; index < camposDTO.length; index++) {
            camposDTO[index].herramientaAnalisisCriticidad = herramientaAnalisisCriticidadInsertada // se asigna al campo la herramienta a la cual pertenece
            camposDTO[index].configVersion = herramientaAnalisisCriticidadInsertada.configVersion // se registra ademas la version de la configuración a la cual pertenece el campo
            await this.campoService.createCampo(camposDTO[index], entityManager) // se manda a crear el campo al servicio de campo
        }
    }
}



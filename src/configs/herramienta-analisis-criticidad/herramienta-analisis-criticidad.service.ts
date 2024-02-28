import { Injectable } from '@nestjs/common';
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
        if (!entityManager) // No se trata de una llamada con una transacción heredada
            await this.herramientaAnalisisCriticidadRepository.manager.transaction(async (trasactionManager: EntityManager) => { // se crea una transacción para este procedimiento
                await this.createHerramientaAnalisisCriticidadWithEntity(herramientaAnalisisCriticidadDTO, trasactionManager)
            })
        else // se continua con la transacción heredada
            await this.createHerramientaAnalisisCriticidadWithEntity(herramientaAnalisisCriticidadDTO, entityManager)
    }
    // Metodo auxiliar para crear una herramienta analisis de criticidad con la entityManager correspondiente
    private async createHerramientaAnalisisCriticidadWithEntity(herramientaAnalisisCriticidadDTO: HerramientaAnalisisCriticidadDTO, entityManager: EntityManager) {
        const herramientaAnalisisCriticidad: HerramientaAnalisisCriticidad = new HerramientaAnalisisCriticidad(undefined, herramientaAnalisisCriticidadDTO.nombre, herramientaAnalisisCriticidadDTO.config instanceof Config ? herramientaAnalisisCriticidadDTO.config : new Config(herramientaAnalisisCriticidadDTO.config.version), herramientaAnalisisCriticidadDTO.tipo) // se obtiene una instancia de la herramienta entity para ser almacenada

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
            await this.campoService.createCampo(camposDTO[index], entityManager) // se manda a crear el campo al servicio de campo
        }
    }
}



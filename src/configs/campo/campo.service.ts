import { Injectable } from '@nestjs/common';
import { Campo } from './campo.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CampoDTO } from './campo.dto';
import { HerramientaAnalisisCriticidad } from '../herramienta-analisis-criticidad/herrramienta-analisis-criticidad.entity';

@Injectable()
export class CampoService {

    constructor(@InjectRepository(Campo) private campoRepository: Repository<Campo>) { }

    // Metodo para crear un nuevo Campo
    public async createCampo(campoDTO: CampoDTO, entityManager?: EntityManager) {
        if (!entityManager) // No se trata de una llamada con una transacción heredada
            await this.campoRepository.manager.transaction(async (trasactionManager: EntityManager) => { // Se crea una trascaccion para este procedimiento
                await this.createCampoWithEntityManager(campoDTO, trasactionManager)
            })
        else // se continua con la transacción heredada
            await this.createCampoWithEntityManager(campoDTO, entityManager)
    }
    // Metodo auxiliar para crear un campo con la entityManager correspondiente
    private async createCampoWithEntityManager(campoDTO: CampoDTO, entityManager?: EntityManager) {
        const campo: Campo = new Campo(campoDTO.nombre, campoDTO.nivelImportancia,
            campoDTO.configVersion, campoDTO.herramientaAnalisisCriticidad instanceof HerramientaAnalisisCriticidad ? campoDTO.herramientaAnalisisCriticidad : undefined) // se crea el campo

        const campoInsertado: Campo = await entityManager.save(campo) // se almacena el campo en la base de datos
    }

    // Metodo para buscar un campo que pertenezca a una configuración con un nombre en especifico
    public async getCampo(idCampo: number, nombre?: String, configVersion?: number) {

        return await this.campoRepository.findOne({
            where: {
                id: idCampo,
                configVersion: configVersion,
                nombre: nombre
            }
        })
    }
}

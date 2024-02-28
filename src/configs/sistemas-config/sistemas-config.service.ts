import { HttpException, Injectable } from '@nestjs/common';
import { SistemaConfig } from './sistema-config.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SistemaConfigDTO } from './sistema-config.dto';
import { Herramienta } from '../herramientas/herramienta.entity';
import { HerramientaAnalisisCriticidadService } from '../herramienta-analisis-criticidad/herramienta-analisis-criticidad.service';
import { HerramientaAnalisisCriticidad } from '../herramienta-analisis-criticidad/herrramienta-analisis-criticidad.entity';


@Injectable()
export class SistemasConfigService {

    constructor(@InjectRepository(SistemaConfig) private sistemaConfigRepository: Repository<SistemaConfig>,
        private herramientaAnalisisCriticidadService: HerramientaAnalisisCriticidadService) { }

    public async createSistemaConfig(sistemaConfigDTO: SistemaConfigDTO, entityManager?: EntityManager) {
        if (!entityManager) // No se trata de una llamada con una transacción heredada
            await this.sistemaConfigRepository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
                await this.createSistemaConfigWithEntityManager(sistemaConfigDTO, transactionManager)
            })
        else // se continua con la transacción heredada
            await this.createSistemaConfigWithEntityManager(sistemaConfigDTO, entityManager)

    }

    private async createSistemaConfigWithEntityManager(sistemaConfigDTO: SistemaConfigDTO, entityManager?: EntityManager) {
        // Primero se buscar la herramienta de la configuración asignada a ese sistema dentro del mismo contexto
        let herramientaAsignada: Herramienta | undefined = undefined;

        if (sistemaConfigDTO.herramienta.id) // si se proporcionó  un id para a herramienta
            herramientaAsignada = function (): Herramienta { // Se crea una instancia de la herramienta lista para ser insertada
              
                    return new HerramientaAnalisisCriticidad(sistemaConfigDTO.herramienta.id)
             

            }()
        else { // si no se proporcionó un id para la herramienta
            
            herramientaAsignada = await entityManager.findOne(HerramientaAnalisisCriticidad, { // se busca una herramienta en la base de datos para la misma configuración que tenga el mismo nombre
                where: {
                    "nombre": sistemaConfigDTO.herramienta.nombre,
                    "configVersion": sistemaConfigDTO.config.version
                }
            })
            
        }
        // fin del proceso de busqueda de la herramienta

        if (herramientaAsignada) { // si fue posible encontrar una herramienta
            // Se crea el sistemaConfig
            const sistemaConfig: SistemaConfig = new SistemaConfig(sistemaConfigDTO.nombre, herramientaAsignada, sistemaConfigDTO.config) // se crea un sistema config listo para ser insertado
              
            const sistemaConfigInsertado: SistemaConfig = await entityManager.save(sistemaConfig) // se inserta en la base de datos el sistema de configuracion, y se obtiene la instancia  insertada con un id

        }
        else
            throw new HttpException("Herramienta no encontrada", 401)

    }

}

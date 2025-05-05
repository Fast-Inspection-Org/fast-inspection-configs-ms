import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Config, ConfigOrderBy } from './config.entity';
import { EntityManager, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigDTO } from './config.dto';
import { HerramientaAnalisisCriticidadService } from './herramienta-analisis-criticidad/herramienta-analisis-criticidad.service';
import { IndiceCalculableIntervaloService } from './indice-calculable-intervalo/indice-calculable-intervalo.service';
import { IndiceCalculableSinIntervaloService } from './indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.service';
import { SistemasConfigService } from './sistemas-config/sistemas-config.service';
import { SistemaConfigDTO } from './sistemas-config/sistema-config.dto';
import { HerramientaDTO } from './herramientas/herramienta.dto';
import { TipoHerramienta } from './herramientas/herramienta.entity';
import { IndiceCalculableDTO } from './indice-calculable/indice-calculable.dto';
import {
  Calculos,
  TipoIndiceCalculable,
} from './indice-calculable/indice-calculable.entity';
import { UpdateConfigDTO } from './config-update.dto';
import {
  ConfigSerializable,
  ConfigSerializableDetails,
} from './config.serializable';
import { ApiPaginatedResponse } from 'src/utils/api-response';
import { IndiceCalculableSerializable } from './indice-calculable/serializable/indice-calculable.serializable';
import { IndiceCalculableSinIntervaloSerializableDetails } from './indice-calculable-sin-intervalo/serializable/indice-calculable-sin-intervalo.serializable';
import { IndiceCaculableIntervaloSerializableDetails } from './indice-calculable-intervalo/serializable/indice-calculable-intervalo.serializable';
import { IndicadorIntervalo } from './indicador-intervalo/indicador-intervalo.entity';
import { IndicadorSinIntervalo } from './indicador-sin-intervalo/indicador-sin-intervalo.entity';
import { HerramientaSerializable } from './herramientas/herramienta.serializable';
import { HerramientaAnalisisCriticidadSerializableDetails } from './herramienta-analisis-criticidad/serializable/herramienta-analisis-criticidad.serializable';
import { HerramientaAnalisisCriticidad } from './herramienta-analisis-criticidad/herrramienta-analisis-criticidad.entity';

@Injectable()
export class ConfigsService {
  lastConfig: ConfigSerializableDetails | undefined;
  constructor(
    @InjectRepository(Config)
    private configuracionRepository: Repository<Config>,
    private herramientaAnalisisCriticidadService: HerramientaAnalisisCriticidadService,
    private indiceCalculableIntervaloService: IndiceCalculableIntervaloService,
    private indiceCalculableSinIntervaloService: IndiceCalculableSinIntervaloService,
    private sistemaConfigService: SistemasConfigService,
  ) {}

  //Metodo para obtener todas  las configuraciones
  public async getAllConfigs(
    orderBy: ConfigOrderBy,
    version?: number,
    nombre?: String,
  ): Promise<ApiPaginatedResponse<ConfigSerializable[]>> {
    const configsSerializables: Array<ConfigSerializable> =
      new Array<ConfigSerializable>();
    const orderObject = {};
    if (orderBy === ConfigOrderBy.Nombre) orderObject[orderBy] = 'ASC';
    else if (orderBy === ConfigOrderBy.Version) orderObject[orderBy] = 'DESC';

    // se obtiene la lista de configuraciones según los filtros
    const configsEntity: Array<Config> =
      await this.configuracionRepository.find({
        where: {
          version: version,
          nombre: nombre ? Like(`%${nombre}%`) : nombre,
        },
        order: orderObject,
      });

    // se crean objetos serializables en base a las configuraciones entity
    for (let index = 0; index < configsEntity.length; index++) {
      const configEntity = configsEntity[index];
      configsSerializables.push(
        new ConfigSerializable(
          configEntity.version,
          configEntity.nombre,
          configEntity.descripcion,
          configEntity.state,
          await configEntity.getPorcentajeCompletitud(),
        ),
      );
    }

    return { data: configsSerializables };
  }

  // Metodo para obtener la configuración más reciente
  public async getLastConfig(): Promise<ConfigSerializableDetails | undefined> {
    if (!this.lastConfig) {
      // Si no hay cargada ninguna configuración en caché
      const maxVersion = await this.configuracionRepository
        .createQueryBuilder('config')
        .select('MAX(config.version)', 'max')
        .getRawOne();
      if (maxVersion.max) {
        // si fue encontrada un maxima version
        const configEntity = await this.configuracionRepository.findOne({
          where: {
            version: maxVersion.max,
          },
        });
        const indiceCalculables: Array<IndiceCalculableSerializable> =
          await Promise.all(
            (await configEntity.indicesCalculables).map(
              async (indiceCalculable) => {
                if (
                  indiceCalculable.tipo ===
                  TipoIndiceCalculable.InidiceCalculableIntervalo
                )
                  return new IndiceCaculableIntervaloSerializableDetails(
                    indiceCalculable.id,
                    indiceCalculable.nombre,
                    indiceCalculable.tipo,
                    indiceCalculable.calculo,
                    (await indiceCalculable.obtenerIndicadores()) as IndicadorIntervalo[],
                  );
                else
                  return new IndiceCalculableSinIntervaloSerializableDetails(
                    indiceCalculable.id,
                    indiceCalculable.nombre,
                    indiceCalculable.tipo,
                    indiceCalculable.calculo,
                    (await indiceCalculable.obtenerIndicadores()) as IndicadorSinIntervalo[],
                  );
              },
            ),
          );
        const herramientas: Array<HerramientaSerializable> = await Promise.all(
          (await configEntity.herramientas).map(async (herramienta) => {
            if (herramienta.tipo === TipoHerramienta.AnalisisCriticidad) {
              const herramientaAnalisisCriticidad =
                herramienta as HerramientaAnalisisCriticidad;
              return new HerramientaAnalisisCriticidadSerializableDetails(
                herramientaAnalisisCriticidad.id,
                herramientaAnalisisCriticidad.nombre,
                herramientaAnalisisCriticidad.tipo,
                await herramientaAnalisisCriticidad.campos,
              );
            }
          }),
        );
        this.lastConfig = new ConfigSerializableDetails(
          configEntity.version,
          configEntity.nombre,
          configEntity.descripcion,
          configEntity.state,
          await configEntity.getPorcentajeCompletitud(),
          await Promise.all(
            (await configEntity.sistemasConfig).map(async (sistemaConfig) => {
              return await this.sistemaConfigService.getSistemaConfigDetails(
                sistemaConfig.id,
              );
            }),
          ),
          indiceCalculables,
          herramientas,
        );
      }
    }

    return this.lastConfig;
  }

  // Metodo para obtener una configuración con una versión en específico
  public async getConfigByVersion(versionConfig: number) {
    return await this.configuracionRepository.findOne({
      where: {
        version: versionConfig,
      },
    });
  }

  // Méotodo para obtener una configuración con un nombre en especifico (para validar repitencias de nombre)
  public async getConfigByName(nombreConfig: String): Promise<Config> {
    return await this.configuracionRepository.findOneBy({
      nombre: nombreConfig,
    });
  }

  // Metodo para crear una nueva configuración basada en otra (Replicación de Configuración)
  public async createConfigByOtherConfig(
    versionOtherConfig: number,
    nombreConfig: String,
    descripcionConfig: String,
  ) {
    const otherConfig: Config =
      await this.getConfigByVersion(versionOtherConfig); // se obtiene la otra configuración
    const configDTO: ConfigDTO = new ConfigDTO(); // se crea una config dto para ser almacenada en la base de datos
    await configDTO.constuirDTO(
      nombreConfig,
      descripcionConfig,
      await otherConfig.herramientas,
      await otherConfig.indicesCalculables,
      await otherConfig.sistemasConfig,
    ); // se construye un DTO con la información de la configuración a replicar
    await this.createConfig(configDTO); // Luego se inserta en la base de datos dicha configuración
  }

  // Metodo para crear una nueva configuración
  public async createConfig(
    cofingDTO: ConfigDTO,
    entityManager?: EntityManager,
  ) {
    if (!(await this.getConfigByName(cofingDTO.nombre))) {
      // si no existe un configuración con el mismo nombre
      if (!entityManager)
        // No se trata de una llamada con una transacción heredada
        await this.configuracionRepository.manager.transaction(
          async (transactionManager: EntityManager) => {
            // Se crea una transaccion para este procedimiento
            await this.createConfigWithEntitiManager(
              cofingDTO,
              transactionManager,
            );
          },
        );
      // se continua con la transacción heredada
      else await this.createConfigWithEntitiManager(cofingDTO, entityManager);
    } else
      throw new HttpException(
        { message: 'Ya existe una configuración con ese nombre' },
        HttpStatus.BAD_REQUEST,
      );
  }

  // Metodo auxiliar para crear una configuración con la entityManager correspondiente
  private async createConfigWithEntitiManager(
    configDTO: ConfigDTO,
    entityManager: EntityManager,
  ) {
    const configInsertada: Config = await entityManager.save(
      new Config(undefined, configDTO.nombre, configDTO.descripcion),
    ); // Se almacena en la base de datos la configuracion y se obtiene con su id
    if (configDTO.herramientas)
      await this.saveHerramientasConfig(
        configDTO.herramientas,
        configInsertada,
        entityManager,
      ); // se insertan las herramientas pertenecientes a esta configuración en la base de datos
    if (configDTO.indicesCalculables)
      await this.saveIndicesCalculables(
        configDTO.indicesCalculables,
        configInsertada,
        entityManager,
      ); // se insertan los indicesCalculables por Intervalo pertenecientes a esta configuración en la base de datos
    if (configDTO.sistemasConfigs)
      await this.saveSistemasConfig(
        configDTO.sistemasConfigs,
        configInsertada,
        entityManager,
      ); // se insertan los sistemasConfig  pertenecientes a esta configuración en la base de datos
    //Además se utiliza await para que la transacción espere a que se realicen todas las operaciones en los demás servicios
  }

  // Metodo para registrar en la base de datos los indicesCalculablesIntervalo que forman parte de una configuracion
  private async saveIndicesCalculables(
    indicesCalculablesIntervaloDTO: Array<IndiceCalculableDTO>,
    configInsertada: Config,
    entityManager: EntityManager,
  ) {
    // Se indica por indices calculables a que configuracion registrada en la base de datos pertenecen
    for (
      let index = 0;
      index < indicesCalculablesIntervaloDTO.length;
      index++
    ) {
      indicesCalculablesIntervaloDTO[index].config = configInsertada;
      if (
        indicesCalculablesIntervaloDTO[index].tipo ===
        TipoIndiceCalculable.InidiceCalculableIntervalo
      )
        // si se trata de un indice calculable tipo intervalos
        await this.indiceCalculableIntervaloService.createIndiceCalculableIntervalo(
          indicesCalculablesIntervaloDTO[index],
          entityManager,
        );
      // se manda a insertar al servicio los indices con intervalo
      else
        await this.indiceCalculableSinIntervaloService.createIndiceCalculableSinIntervalo(
          indicesCalculablesIntervaloDTO[index],
          entityManager,
        ); // se manda a insertar al servicio los indices sin intervalos
    }
  }

  // Metodo para registrar en la base de datos las herramientas que forman parte de una configuracion
  private async saveHerramientasConfig(
    herramientas: Array<HerramientaDTO>,
    configInsertada: Config,
    entityManager: EntityManager,
  ) {
    // Se indica por herramientas a que configuracion registrada en la base de datos pertenecen
    for (let index = 0; index < herramientas.length; index++) {
      herramientas[index].config = configInsertada;

      if (herramientas[index].tipo === TipoHerramienta.AnalisisCriticidad)
        // si se trata de una herramienta analisis criticidad
        await this.herramientaAnalisisCriticidadService.createHerramientaAnalisisCriticidad(
          herramientas[index],
          entityManager,
        ); // se manda a insertar al servicio de herramienta analisis criticidad la herramienta en la base de datos
    }
  }

  // Metodo para registrar en la base de datos las herramientas que forman parte de una configuracion
  private async saveSistemasConfig(
    sistemasConfigDTO: Array<SistemaConfigDTO>,
    configInsertada: Config,
    entityManager: EntityManager,
  ) {
    // Se indica por sistemas de configuracion a que configuracion registrada en la base de datos pertenecen

    for (let index = 0; index < sistemasConfigDTO.length; index++) {
      sistemasConfigDTO[index].config = configInsertada;

      await this.sistemaConfigService.createSistemaConfig(
        sistemasConfigDTO[index],
        entityManager,
      ); // se manda a insertar al servicio el sistema config
    }
  }

  // Metodo para eliminar una configuración en especifico (Metodo de super Administrador)
  public async deleteConfig(versionConfig: number) {
    if (await this.getConfigByVersion(versionConfig))
      // si existe la config
      await this.configuracionRepository.delete({ version: versionConfig });
    else
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No exite una configuración con ese id',
        },
        HttpStatus.BAD_REQUEST,
      );
  }

  // Metodo para eliminar todas las configuraciones (Método de super administrador)
  public async deleteAllConfigs() {
    await this.configuracionRepository.delete({});
  }

  // Método para modificar una configuración en específico

  public async updateConfig(version: number, updateConfigDTO: UpdateConfigDTO) {
    const config: Config = await this.getConfigByName(updateConfigDTO.nombre);
    if (!config || config.version === version)
      // si no existe un configuración con el mismo nombre o si la que existe es ella misma (significa esto ultimo que el usuario no cambió el nombre)
      await this.configuracionRepository.update(
        { version: version },
        updateConfigDTO,
      );
    else
      throw new HttpException(
        { message: 'Ya existe una configuración con ese nombre' },
        HttpStatus.BAD_REQUEST,
      );
  }

  // Método para marcar como activa una configuración en específico
  public async marcarAsActivaConfig(versionConfig: number) {
    // se obtiene la configuración que se desea marcar como activa
    const configMarcarActiva: Config | undefined =
      await this.configuracionRepository.findOne({
        where: {
          version: versionConfig,
        },
      });
    // Si fue encontrada dicha configuración
    if (configMarcarActiva) {
      // se comprueba que el "porcentaje de completitud de la configuración sea 100 %"
      if ((await configMarcarActiva.getPorcentajeCompletitud()) === 100) {
        await this.configuracionRepository.manager.transaction(
          async (transactionManager: EntityManager) => {
            // Se crea una transaccion para este procedimiento
            // Primero se desmarca la anterior configuración marcada como activa, en el caso de que exista
            const anteriorConfigMarcadaAsActiva: Config | undefined =
              await this.getConfig(undefined, true);
            // si existe una configuración marcada como activa
            if (anteriorConfigMarcadaAsActiva) {
              anteriorConfigMarcadaAsActiva.state = false; // se indica que ya no es la configuración activa
              await transactionManager.save(anteriorConfigMarcadaAsActiva); // se actualiza los cambios de esta configuración en la base de datos
            }

            configMarcarActiva.state = true; // se marca como activa la configuración
            // Luego se actualizan los cambios en la base de datos
            await transactionManager.save(configMarcarActiva);
          },
        );
      } else
        throw new HttpException(
          {
            message:
              'No es posible marcar como activa dicha configuración ya que no cumple con los requisitos mínimos de completitud',
          },
          HttpStatus.BAD_REQUEST,
        );
    } else
      throw new HttpException(
        { message: 'No existe una configuración con esa versión' },
        HttpStatus.BAD_REQUEST,
      );
  }

  // Método para obtener una configuración en específico
  public async getConfig(versionConfig?: number, state?: boolean) {
    return await this.configuracionRepository.findOne({
      where: {
        version: versionConfig,
        state: state,
      },
    });
  }

  // Método para actualizar el estado de una configuración
  public async actualizarEstadoConfig(versionConfig: number) {
    const config: Config = await this.getConfig(versionConfig); // obtenemos la configuración a actualizar
    // Verificamos si está activa o no
    if (config) {
      if (config.state) {
        // si está activa
        if ((await config.getPorcentajeCompletitud()) < 100) {
          // si el porcentaje de completitud es inferior al 100 % (no cumple con los requisitos mínimos)
          config.state = false; // se indica que esta configuración no va a seguir siendo activa
          await this.configuracionRepository.save(config); // se actualiza los cambios en la base de datos
        }
      }
    } else
      throw new HttpException(
        { message: 'No existe una configuración con esa versión' },
        HttpStatus.BAD_REQUEST,
      );
  }

  // Método para obtener el indicador de un correspondiente a un cálculo espcificado en una configuración
  public async getIndicadorCalculo(
    configVersion: number,
    valorCalculo: number,
    calculo: Calculos,
  ) {
    // se busca la configuración
    const config = await this.configuracionRepository.findOne({
      where: {
        version: configVersion,
      },
    });

    // si exite una configuración con esa versión
    if (config)
      return await config.obtenerIndicadorCalculo(valorCalculo, calculo);
    else
      throw new HttpException(
        { message: 'No existe una configuración con esa versión' },
        HttpStatus.BAD_REQUEST,
      );
  }
}

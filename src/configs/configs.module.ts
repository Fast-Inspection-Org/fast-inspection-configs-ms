import { Module } from '@nestjs/common';
import { ConfigsController } from './configs.controller';
import { ConfigsService } from './configs.service';
import { SistemasConfigController } from './sistemas-config/sistemas-config.controller';
import { SistemasConfigService } from './sistemas-config/sistemas-config.service';
import { SubsistemasConfigController } from './subsistemas-config/subsistemas-config.controller';
import { SubsistemasConfigService } from './subsistemas-config/subsistemas-config.service';
import { MaterialesConfigController } from './materiales-config/materiales-config.controller';
import { MaterialesConfigService } from './materiales-config/materiales-config.service';
import { TipoDeteriorosConfigController } from './tipo-deterioros-config/tipo-deterioros-config.controller';
import { TipoDeteriorosConfigService } from './tipo-deterioros-config/tipo-deterioros-config.service';
import { HerramientasController } from './herramientas/herramientas.controller';
import { HerramientasService } from './herramientas/herramientas.service';
import { IndicadorSinIntervaloService } from './indicador-sin-intervalo/indicador-sin-intervalo.service';
import { IndicadorSinIntervaloController } from './indicador-sin-intervalo/indicador-sin-intervalo.controller';
import { IndicadorIntervaloService } from './indicador-intervalo/indicador-intervalo.service';
import { IndicadorIntervaloController } from './indicador-intervalo/indicador-intervalo.controller';
import { IndicadorService } from './indicador/indicador.service';
import { IndicadorController } from './indicador/indicador.controller';
import { IndiceCalculableSinIntervaloService } from './indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.service';
import { IndiceCalculableSinIntervaloController } from './indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.controller';
import { IndiceCalculableIntervaloService } from './indice-calculable-intervalo/indice-calculable-intervalo.service';
import { IndiceCalculableIntervaloController } from './indice-calculable-intervalo/indice-calculable-intervalo.controller';
import { IndiceCalculableService } from './indice-calculable/indice-calculable.service';
import { IndiceCalculableController } from './indice-calculable/indice-calculable.controller';
import { TipoDeterioroAnalisisCriticidadConfigService } from './tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.service';
import { TipoDeterioroAnalisisCriticidadConfigController } from './tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.controller';
import { CampoService } from './campo/campo.service';
import { CampoController } from './campo/campo.controller';
import { HerramientaAnalisisCriticidadService } from './herramienta-analisis-criticidad/herramienta-analisis-criticidad.service';
import { HerramientaAnalisisCriticidadController } from './herramienta-analisis-criticidad/herramienta-analisis-criticidad.controller';
import { CampoDefinidoController } from './campo-definido/campo-definido.controller';
import { CampoDefinidoService } from './campo-definido/campo-definido.service';
import { CausaController } from './causa/causa.controller';
import { CausaService } from './causa/causa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campo } from './campo/campo.entity';
import { CampoDefinido } from './campo-definido/campo-definido.entity';
import { Causa } from './causa/causa.entity';
import { Herramienta } from './herramientas/herramienta.entity';
import { HerramientaAnalisisCriticidad } from './herramienta-analisis-criticidad/herrramienta-analisis-criticidad.entity';
import { Indicador } from './indicador/indicador.entity';
import { IndicadorIntervalo } from './indicador-intervalo/indicador-intervalo.entity';
import { IndicadorSinIntervalo } from './indicador-sin-intervalo/indicador-sin-intervalo.entity';
import { IndiceCalculable } from './indice-calculable/indice-calculable.entity';
import { IndiceCalculableIntervalo } from './indice-calculable-intervalo/indice-calculable-intervalo.entity';
import { IndiceCalculableSinIntervalo } from './indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.entity';
import { MaterialConfig } from './materiales-config/material-config.entity';
import { SistemaConfig } from './sistemas-config/sistema-config.entity';
import { SubsistemaConfig } from './subsistemas-config/subsistema-config.entity';
import { TipoDeterioroConfig } from './tipo-deterioros-config/tipo-deterioro-config.entity';
import { TipoDeterioroAnalisisCriticidadConfig } from './tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.entity';
import { Config } from './config.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Config, Campo, CampoDefinido, Causa, Herramienta, HerramientaAnalisisCriticidad, Indicador, IndicadorIntervalo, IndicadorSinIntervalo,
    IndiceCalculable, IndiceCalculableIntervalo, IndiceCalculableSinIntervalo, MaterialConfig, SistemaConfig, SubsistemaConfig, TipoDeterioroConfig, TipoDeterioroAnalisisCriticidadConfig])],
  controllers: [ConfigsController, SistemasConfigController, SubsistemasConfigController, MaterialesConfigController, TipoDeteriorosConfigController, HerramientasController, HerramientaAnalisisCriticidadController, CampoController, TipoDeterioroAnalisisCriticidadConfigController, IndiceCalculableController, IndiceCalculableIntervaloController, IndiceCalculableSinIntervaloController, IndicadorController, IndicadorIntervaloController, IndicadorSinIntervaloController, CampoDefinidoController, CausaController],
  providers: [ConfigsService, SistemasConfigService, SubsistemasConfigService, MaterialesConfigService, TipoDeteriorosConfigService, HerramientasService, HerramientaAnalisisCriticidadService, CampoService, TipoDeterioroAnalisisCriticidadConfigService, IndiceCalculableService, IndiceCalculableIntervaloService, IndiceCalculableSinIntervaloService, IndicadorService, IndicadorIntervaloService, IndicadorSinIntervaloService, CampoDefinidoService, CausaService]
})
export class ConfigsModule { }

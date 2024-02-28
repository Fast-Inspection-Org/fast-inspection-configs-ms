import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigsModule } from './configs/configs.module';
import { ControladorEdificacionesModule } from './controlador-edificaciones/controlador-edificaciones.module';




@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12134588ad',
    database: 'fast_inspection_db',
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true
  }), ConfigsModule, ControladorEdificacionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

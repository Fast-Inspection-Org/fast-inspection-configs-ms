import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: parseInt(process.env.PORT)
      }
    },
  );

  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Habilita la transformación automática de objetos
    transformOptions: {
      enableImplicitConversion: true, // Habilita la conversión implícita de tipos
    },
    // Otras opciones del ValidationPipe
  }));


  await app.listen();

}
bootstrap();

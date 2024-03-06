import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Habilita la transformación automática de objetos
    transformOptions: {
      enableImplicitConversion: true, // Habilita la conversión implícita de tipos
      // Aquí puedes agregar más opciones según tus necesidades
    },
    // Otras opciones del ValidationPipe
  }));

  await app.listen(3000);

}
bootstrap();

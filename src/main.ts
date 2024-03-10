import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Habilita la transformación automática de objetos
    transformOptions: {
      enableImplicitConversion: true, // Habilita la conversión implícita de tipos
    },
    // Otras opciones del ValidationPipe
  }));

   // Configuración de CORS
 const corsOptions: CorsOptions = {
  origin: '*', // Permite solicitudes de cualquier origen
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Accept, Authorization',
  credentials: true,
};

app.enableCors(corsOptions);

  await app.listen(parseInt(process.env.PORT));

}
bootstrap();

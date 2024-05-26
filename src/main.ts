import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


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

// Configuración de Open API para documentar el proyecto
const config = new DocumentBuilder()
.setTitle('Cats example')
.setDescription('The cats API description')
.setVersion('1.0')
.addTag('cats')
.build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(parseInt(process.env.PORT));

}
bootstrap();

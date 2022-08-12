import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2')

  app.useGlobalPipes(

    //Activa las validaciones a nivel gloval(DTO)
    new ValidationPipe({
      whitelist: true, //deja la data que coincide al dto desde la peticion
      forbidNonWhitelisted: true,//data adicional al dto produce error
      transform: true, // convierte la data que llega al request segun def. DTO
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  await app.listen(process.env.PORT);
}
bootstrap();

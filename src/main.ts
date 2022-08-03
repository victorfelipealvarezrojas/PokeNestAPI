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
    })
  )

  await app.listen(3000);
}
bootstrap();

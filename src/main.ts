import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { DispatchError } from './shared/filters/dispatch-error';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //filter exception
  app.useGlobalFilters(new DispatchError())

  //swagger config
  const config = new DocumentBuilder()
  .setTitle("trello")
  .setDescription("The trello API description")
  .setVersion("1.0")
  .addTag("adm")
  .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document);
  app.enableCors(); //protection

  //validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        target: true,
        value: true,
      },
    }),
  );
  
  //server
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

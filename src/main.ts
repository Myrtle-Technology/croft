import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Croft File Service API Docs')
    .setDescription('')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  // const theme = new SwaggerTheme('v3');
  const options = {
    explorer: true,
    // customCss: theme.getBuffer('flattop'),
  };
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, options);
  await app.listen(process.env.PORT || 5005);
}
bootstrap();

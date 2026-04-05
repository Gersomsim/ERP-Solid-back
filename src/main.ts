import { HttpExceptionFilter } from '@core/filters/http-exception.filter';
import { loggerConfig } from '@core/logger/logger.config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { envs } from './core/config/envs.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(`api`);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: envs.api.version,
  });

  app.useLogger(WinstonModule.createLogger(loggerConfig));
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle(envs.app.name)
    .setDescription('ERP general para gestion de empresas')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(envs.api.port, () => {
    Logger.log(
      `🚀 Application is running on: http://localhost:${envs.api.port}/api/v${envs.api.version}`,
    );
  });
}
bootstrap();

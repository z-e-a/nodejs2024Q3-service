import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomLogger } from './logger/customLogger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get(CustomLogger);
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.listen(process.env.PORT ?? 4000);

  process.on('uncaughtException', (err, origin) => {
    logger.error(`Uncaught exception: ${err.message}`, origin);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error(
      `Unhandled Rejection at: ${promise} reason: ${reason}`,
      process.constructor.name,
    );
  });
}
bootstrap();

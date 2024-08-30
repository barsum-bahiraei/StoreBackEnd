import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Express Store App')
    .setDescription('Express Store App')
    .setVersion('1.0')
    .addTag('store')
    .addBearerAuth(
      {
        description: `Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'JWT', // Optional, useful for documentation
        scheme: 'Bearer',
        type: 'http', // Can be 'apiKey' for a different approach
        in: 'header',
      },
      'access-token', // Security name to reference in @ApiBearerAuth
    )
    // .addBearerAuth(
    //   {
    //     type: 'http',
    //     scheme: 'Bearer',
    //     bearerFormat: 'JWT', // optional, but good practice
    //     name: 'Authorization',
    //     in: 'header',
    //   },
    //   'access-token', // This is the name of the security scheme you can refer to in your controllers
    // )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({}));

  await app.listen(3000);

  console.info('http://localhost:3000/swagger');
}

bootstrap();

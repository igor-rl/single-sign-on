import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { AppModule } from './app.module';
import * as cors from 'cors';

const SWAGGER_ENVS = ['local', 'dev', 'staging'];

async function bootstrap() {
  const bodyParser = require("body-parser");
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: [],
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
  };

  if (SWAGGER_ENVS.includes(process.env.NODE_ENV)) {

    corsOptions.origin = [
      'http://localhost'
    ]

  }

  else {

    corsOptions.origin = [
      '',
    ]

  }

  app.enableCors(corsOptions);

  app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: false
  }));

  app.use(bodyParser.json({ limit: "30mb" }));

  let documentacao: boolean = false

  if (SWAGGER_ENVS.includes(process.env.NODE_ENV)) {
    app.use(['/docs', '/docs-json'], basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }));

    const config = new DocumentBuilder()
      .setTitle('API Nestjs - Whatsapp Web js Boot')
      .setVersion('1.0')
      .addTag('Zap Boot', 'Hello Whatsapp Web js Boot.')
      .addTag('Auth', 'Recursos relacionados à autenticação.')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
      )
      .setDescription('<h3>API de recursos relacionados à api <i>BROWS - APERFEIÇOAMENTO.</i></h3><br><hr><h3>Baixe a documentação para insuminia</h3><a href="https://insomnia.rest/run/?label=My%20API&uri=http%3A%2F%2Flocalhost%3A3000%2Fapi-json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a><hr><h3>Sobre</h3><p>Esta API faz parte dos recursos do app BROWS-APERFEIÇOAMENTO.<br><i>Data de implantação: 07/03/2023</i><br><i>Desenvolvedor responsável: Igor Lage</i></p><hr>')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    documentacao = true;
  }

  await app.listen(process.env.API_PORT || 3000)
  console.log(`API em execução: ${await app.getUrl()}`);
  if (documentacao) {
    const local = await app.getUrl()
    console.log(`Documentação do projeto: localhost:${local}/docs`);
    console.log(`Download da documentação: ${local}/docs-json`);
  }
  else {
    console.log(`A documentação do projeto é bloqueada em ambiente de produção.`);
  }

}
bootstrap()
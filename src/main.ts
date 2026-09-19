import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(process.cwd(), 'public'), { prefix: '/public' });
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  hbs.registerPartials(join(process.cwd(), 'views', 'partials'));
  hbs.registerHelper('eq', (a: unknown, b: unknown) => a === b);
  hbs.registerHelper('currentYear', () => new Date().getFullYear());
  hbs.registerHelper('initial', (value: string) =>
    typeof value === 'string' ? value.charAt(0).toUpperCase() : '',
  );
  app.setViewEngine('hbs');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Vaibhava Tech website running on http://localhost:${port}`);
}
bootstrap();

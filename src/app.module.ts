import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PagesModule } from './pages/pages.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PagesModule,
    ContactModule,
  ],
})
export class AppModule {}

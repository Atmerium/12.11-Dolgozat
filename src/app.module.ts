import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ChildrenModule } from './children/children.module';
import { ToysModule } from './toys/toys.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), ChildrenModule, ToysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

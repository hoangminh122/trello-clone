import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './modules/board/board.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    BoardModule,
    ServeStaticModule.forRoot({
      rootPath:join(__dirname,'..','uploads')
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './modules/board/board.module';
import { DatabaseModule } from './modules/database/database.module';
import { ListCardModule } from './modules/list-card/list.module';

@Module({
  imports: [
    DatabaseModule,
    BoardModule,
    ListCardModule,
    ServeStaticModule.forRoot({
      rootPath:join(__dirname,'..','uploads')
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}

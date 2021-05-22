<<<<<<< Updated upstream
import { MiddlewareConsumer, Module } from '@nestjs/common';
=======
import { Module } from '@nestjs/common';
>>>>>>> Stashed changes
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './modules/board/board.module';
import { DatabaseModule } from './modules/database/database.module';
<<<<<<< Updated upstream
=======
import { ListCardModule } from './modules/list-card/list.module';
>>>>>>> Stashed changes

@Module({
  imports: [
    DatabaseModule,
    BoardModule,
<<<<<<< Updated upstream
=======
    ListCardModule,
>>>>>>> Stashed changes
    ServeStaticModule.forRoot({
      rootPath:join(__dirname,'..','uploads')
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './modules/board/board.module';
import { CardModule } from './modules/card/card.module';
import { ChecklistModule } from './modules/checklist/checklist.module';
import { DatabaseModule } from './modules/database/database.module';
import { ItemModule } from './modules/item/item.module';
import { LabelModule } from './modules/label/label.module';
import { ListCardModule } from './modules/list-card/list.module';
import { MemberCardModule } from './modules/member-card/member-card.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    DatabaseModule,
    UploadModule,
    BoardModule,
    ListCardModule,
    CardModule,
    LabelModule,
    ItemModule,
    ChecklistModule,
    MemberCardModule,
    ServeStaticModule.forRoot({
      rootPath:join(__dirname,'..','uploads')
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}

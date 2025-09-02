import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemoModule } from './memo/memo.module';
import { Memo } from './memo/memo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'memo.db',
      entities: [Memo],
      synchronize: true,
    }),
    MemoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

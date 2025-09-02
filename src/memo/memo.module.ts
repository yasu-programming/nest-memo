import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';
import { Memo } from './memo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Memo])],
  controllers: [MemoController],
  providers: [MemoService],
})
export class MemoModule {}
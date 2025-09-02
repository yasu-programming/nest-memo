import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  ParseIntPipe 
} from '@nestjs/common';
import { MemoService, Memo } from './memo.service';

export interface CreateMemoDto {
  title: string;
  content: string;
}

export interface UpdateMemoDto {
  title: string;
  content: string;
}

@Controller('memos')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Get()
  findAll(): Memo[] {
    return this.memoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Memo {
    return this.memoService.findOne(id);
  }

  @Post()
  create(@Body() createMemoDto: CreateMemoDto): Memo {
    return this.memoService.create(createMemoDto.title, createMemoDto.content);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMemoDto: UpdateMemoDto,
  ): Memo {
    return this.memoService.update(id, updateMemoDto.title, updateMemoDto.content);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    return this.memoService.remove(id);
  }
}
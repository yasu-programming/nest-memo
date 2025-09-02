import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { MemoService } from './memo.service';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';

@Controller('memos')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createMemoDto: CreateMemoDto) {
    return await this.memoService.create(createMemoDto);
  }

  @Get()
  async findAll() {
    return await this.memoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.memoService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateMemoDto: UpdateMemoDto,
  ) {
    return await this.memoService.update(+id, updateMemoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.memoService.remove(+id);
  }
}
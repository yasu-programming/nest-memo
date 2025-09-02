import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Memo } from './memo.entity';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(Memo)
    private memoRepository: Repository<Memo>,
  ) {}

  async create(createMemoDto: CreateMemoDto): Promise<Memo> {
    const memo = this.memoRepository.create(createMemoDto);
    return await this.memoRepository.save(memo);
  }

  async findAll(): Promise<Memo[]> {
    return await this.memoRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Memo> {
    const memo = await this.memoRepository.findOne({ where: { id } });
    if (!memo) {
      throw new NotFoundException('Memo not found');
    }
    return memo;
  }

  async update(id: number, updateMemoDto: UpdateMemoDto): Promise<Memo> {
    await this.findOne(id);
    await this.memoRepository.update(id, updateMemoDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.memoRepository.delete(id);
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';

export interface Memo {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class MemoService {
  private memos: Memo[] = [];
  private nextId = 1;

  findAll(): Memo[] {
    return this.memos;
  }

  findOne(id: number): Memo {
    const memo = this.memos.find(memo => memo.id === id);
    if (!memo) {
      throw new NotFoundException(`Memo with ID ${id} not found`);
    }
    return memo;
  }

  create(title: string, content: string): Memo {
    const now = new Date();
    const memo: Memo = {
      id: this.nextId++,
      title,
      content,
      createdAt: now,
      updatedAt: now,
    };
    this.memos.push(memo);
    return memo;
  }

  update(id: number, title: string, content: string): Memo {
    const memo = this.findOne(id);
    memo.title = title;
    memo.content = content;
    memo.updatedAt = new Date();
    return memo;
  }

  remove(id: number): void {
    const memoIndex = this.memos.findIndex(memo => memo.id === id);
    if (memoIndex === -1) {
      throw new NotFoundException(`Memo with ID ${id} not found`);
    }
    this.memos.splice(memoIndex, 1);
  }
}
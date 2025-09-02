import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { MemoService } from './memo.service';

describe('MemoService', () => {
  let service: MemoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemoService],
    }).compile();

    service = module.get<MemoService>(MemoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a memo', () => {
      const memo = service.create('Test Title', 'Test Content');
      expect(memo).toHaveProperty('id');
      expect(memo.title).toBe('Test Title');
      expect(memo.content).toBe('Test Content');
      expect(memo.createdAt).toBeInstanceOf(Date);
      expect(memo.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('findAll', () => {
    it('should return all memos', () => {
      service.create('Memo 1', 'Content 1');
      service.create('Memo 2', 'Content 2');
      const memos = service.findAll();
      expect(memos).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('should return a memo by id', () => {
      const createdMemo = service.create('Test Title', 'Test Content');
      const foundMemo = service.findOne(createdMemo.id);
      expect(foundMemo).toEqual(createdMemo);
    });

    it('should throw NotFoundException if memo not found', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a memo', () => {
      const createdMemo = service.create('Original Title', 'Original Content');
      const updatedMemo = service.update(createdMemo.id, 'Updated Title', 'Updated Content');
      expect(updatedMemo.title).toBe('Updated Title');
      expect(updatedMemo.content).toBe('Updated Content');
      expect(updatedMemo.updatedAt.getTime()).toBeGreaterThan(createdMemo.updatedAt.getTime());
    });

    it('should throw NotFoundException if memo not found', () => {
      expect(() => service.update(999, 'Title', 'Content')).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a memo', () => {
      const createdMemo = service.create('Test Title', 'Test Content');
      service.remove(createdMemo.id);
      expect(() => service.findOne(createdMemo.id)).toThrow(NotFoundException);
    });

    it('should throw NotFoundException if memo not found', () => {
      expect(() => service.remove(999)).toThrow(NotFoundException);
    });
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';

describe('MemoController', () => {
  let controller: MemoController;
  let service: MemoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemoController],
      providers: [MemoService],
    }).compile();

    controller = module.get<MemoController>(MemoController);
    service = module.get<MemoService>(MemoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a memo', () => {
      const createMemoDto = { title: 'Test Title', content: 'Test Content' };
      const result = controller.create(createMemoDto);
      expect(result.title).toBe('Test Title');
      expect(result.content).toBe('Test Content');
    });
  });

  describe('findAll', () => {
    it('should return an array of memos', () => {
      controller.create({ title: 'Memo 1', content: 'Content 1' });
      controller.create({ title: 'Memo 2', content: 'Content 2' });
      const result = controller.findAll();
      expect(result).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('should return a memo by id', () => {
      const createdMemo = controller.create({ title: 'Test Title', content: 'Test Content' });
      const result = controller.findOne(createdMemo.id);
      expect(result).toEqual(createdMemo);
    });
  });

  describe('update', () => {
    it('should update a memo', () => {
      const createdMemo = controller.create({ title: 'Original Title', content: 'Original Content' });
      const updateMemoDto = { title: 'Updated Title', content: 'Updated Content' };
      const result = controller.update(createdMemo.id, updateMemoDto);
      expect(result.title).toBe('Updated Title');
      expect(result.content).toBe('Updated Content');
    });
  });

  describe('remove', () => {
    it('should remove a memo', () => {
      const createdMemo = controller.create({ title: 'Test Title', content: 'Test Content' });
      expect(() => controller.remove(createdMemo.id)).not.toThrow();
    });
  });
});
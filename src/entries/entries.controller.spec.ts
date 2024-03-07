import { Test, TestingModule } from '@nestjs/testing';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';

describe('EntriesController', () => {
  let controller: EntriesController;

  beforeEach(async () => {
    const mockEntry = new Entry();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntriesController],
      providers: [
        EntriesService,
        {
          provide: getRepositoryToken(Entry),
          useValue: {
            save: jest.fn().mockResolvedValue(mockEntry),
            find: jest.fn().mockResolvedValue([mockEntry]),
            findOne: jest.fn().mockResolvedValue(mockEntry),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<EntriesController>(EntriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { EntriesService } from './entries.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';

describe('EntriesService', () => {
  let service: EntriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntriesService,
        {
          provide: getRepositoryToken(Entry),
          useValue: {
            save: jest.fn().mockResolvedValue({}),
            find: jest.fn().mockResolvedValue([{}]),
            findOne: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<EntriesService>(EntriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

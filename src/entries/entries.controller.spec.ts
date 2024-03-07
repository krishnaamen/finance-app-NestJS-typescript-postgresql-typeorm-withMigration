import { Test, TestingModule } from '@nestjs/testing';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';

jest.mock('./entries.service');

describe('EntriesController', () => {
  let controller: EntriesController;
  let service: EntriesService;

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
          },
        },
      ],
    }).compile();

    controller = module.get<EntriesController>(EntriesController);
    service = jest.mocked(controller.entriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new entry', async () => {
    const newEntry = {
      amount: 100,
      currency: 'DKK',
      date: new Date(),
      category: 'Cinema',
      name: 'Social',
      comment: 'comment',
    };
    await controller.create(newEntry);
    expect(service.create).toHaveBeenCalledWith(newEntry);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateEntryDto } from '../src/entries/dto/create-entry.dto';
import { Entry } from '../src/entries/entities/entry.entity';

describe('EntriesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/POST entries', async () => {
    const createEntryDto: CreateEntryDto = {
      amount: 100,
      date: new Date('2024-03-07T12:00:00Z'),
      currency: 'USD',
      name: 'Test Entry',
      comment: 'This is a test entry',
      category: 'A category'
    };

    const response = await request(app.getHttpServer())
      .post('/entries')
      .send(createEntryDto)
      .expect(201);

    const expectedEntry = new Entry();
    expectedEntry.amount = createEntryDto.amount;
    expectedEntry.currency = createEntryDto.currency;
    expectedEntry.name = createEntryDto.name;
    expectedEntry.description = createEntryDto.comment;
    expectedEntry.category = createEntryDto.category;

    expect(response.body).toEqual(expect.objectContaining(expectedEntry));
  });

  it('/GET entries', async () => {
    const response = await request(app.getHttpServer()).get('/entries').expect(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

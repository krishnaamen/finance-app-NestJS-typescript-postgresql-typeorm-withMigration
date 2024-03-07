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
      category: 'A category',
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
    const response = await request(app.getHttpServer())
      .get('/entries')
      .expect(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('/GET entries/:id', async () => {
    const createdEntry = await request(app.getHttpServer())
      .post('/entries')
      .send({
        amount: 150,
        date: new Date('2024-03-08T12:00:00Z'),
        currency: 'EUR',
        name: 'Another Entry',
        comment: 'Another test entry',
        category: 'Another category',
      })
      .expect(201);

    const response = await request(app.getHttpServer())
      .get(`/entries/${createdEntry.body.id}`)
      .expect(200);

    expect(response.body).toEqual(expect.objectContaining(createdEntry.body));
  });

  it('/PUT entries/:id', async () => {
    const createdEntry = await request(app.getHttpServer())
      .post('/entries')
      .send({
        amount: 200,
        date: new Date('2024-03-09T12:00:00Z'),
        currency: 'GBP',
        name: 'Update Entry',
        comment: 'Entry to be updated',
        category: 'Update category',
      })
      .expect(201);

    const updatedEntryDto: CreateEntryDto = {
      amount: 250,
      date: new Date('2024-03-10T12:00:00Z'),
      currency: 'JPY',
      name: 'Updated Entry',
      comment: 'Entry updated successfully',
      category: 'Updated category',
    };

    const response = await request(app.getHttpServer())
      .put(`/entries/${createdEntry.body.id}`)
      .send(updatedEntryDto)
      .expect(200);

    const expectedUpdatedEntry = new Entry();
    expectedUpdatedEntry.id = createdEntry.body.id;
    expectedUpdatedEntry.amount = updatedEntryDto.amount;
    expectedUpdatedEntry.currency = updatedEntryDto.currency;
    expectedUpdatedEntry.name = updatedEntryDto.name;
    expectedUpdatedEntry.description = updatedEntryDto.comment;
    expectedUpdatedEntry.category = updatedEntryDto.category;

    expect(response.body).toEqual({
      affected: 1,
      generatedMaps: [],
      raw: [],
    });
  });

  it('/DELETE entries/:id', async () => {
    const createdEntry = await request(app.getHttpServer())
      .post('/entries')
      .send({
        amount: 300,
        date: new Date('2024-03-11T12:00:00Z'),
        currency: 'CAD',
        name: 'Delete Entry',
        comment: 'Entry to be deleted',
        category: 'Delete category',
      })
      .expect(201);

    const response = await request(app.getHttpServer())
      .delete(`/entries/${createdEntry.body.id}`)
      .expect(200);

    expect(response.body).toEqual({
      affected: 1,
      raw: [],
    });
  });
});

import { Injectable } from '@nestjs/common';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
  ) { }

  create(createEntryDto: CreateEntryDto) {
    const entry = new Entry();
    entry.amount = createEntryDto.amount;
    entry.currency = createEntryDto.currency;
    entry.name = createEntryDto.name;
    entry.description = createEntryDto.comment || createEntryDto.description;
    entry.category = createEntryDto.category;
    return this.entryRepository.save(entry);
  }

  findAll() {
    return this.entryRepository.find();
  }

  findOne(id: number) {
    return this.entryRepository.findOneBy({ id });
  }

  update(id: number, updateEntryDto: UpdateEntryDto) {
    const entry = new Entry();
    entry.amount = updateEntryDto.amount;
    entry.currency = updateEntryDto.currency;
    entry.name = updateEntryDto.name;
    entry.description = updateEntryDto.comment;
    entry.category = updateEntryDto.category;
    return this.entryRepository.update(id, entry);
  }

  remove(id: number) {
    return this.entryRepository.delete(id);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EntriesModule } from './entries/entries.module';
import { dbConfig } from 'data.source';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dbConfig),
    EntriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

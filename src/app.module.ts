import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EntriesModule } from './entries/entries.module';
import { dbConfig, testDbConfig } from '../data.source';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(
      process.env.NODE_ENV !== 'test' ? dbConfig : testDbConfig,
    ),
    EntriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

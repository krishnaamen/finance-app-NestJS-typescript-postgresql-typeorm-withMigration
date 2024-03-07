import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config();

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [resolve(__dirname, 'dist/**/*.entity{.ts,.js}')],
  migrations: [resolve(__dirname, 'dist/src/migrations/*{.ts,.js}')],
};

export const testDbConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  entities: [resolve(__dirname, 'dist/**/*.entity{.ts,.js}')],
  migrations: [resolve(__dirname, 'dist/src/migrations/*{.ts,.js}')],
  autoLoadEntities: true,
};

const dataSource = new DataSource(dbConfig as DataSourceOptions);
export default dataSource;

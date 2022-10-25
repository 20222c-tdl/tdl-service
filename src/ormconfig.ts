import { DataSourceOptions } from 'typeorm';

const config: DataSourceOptions = {
  type: 'postgres',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  url: process.env.DATABASE_URL,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],

  synchronize: true,

  migrationsRun: true,
  logging: true,
  logger: 'file',

  migrations: [`${__dirname}/app/infrastructure/migrations/**/*{.ts,.js}`],

};

export = config;

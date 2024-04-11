import { DynamicModule, Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolConfig } from 'pg';

@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'PG_OPTIONS',
          inject: [ConfigService],
          useFactory: (configService: ConfigService): PoolConfig => ({
            host: 'postgres',
            port: 5432,
            database: 'postgres',
            user: 'postgres',
            password: 'postgres',
          }),
        },
        {
          provide: 'PG_POOL',
          inject: ['PG_OPTIONS'],
          useFactory: (option) => new Pool(option),
        },
      ],
      exports: ['PG_POOL'],
    };
  }
}

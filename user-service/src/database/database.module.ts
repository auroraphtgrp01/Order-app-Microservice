import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool, PoolConfig } from 'pg';
import { DatabaseService } from './database.service';

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
          useFactory: (options) => new Pool(options),
        },
      ],
      exports: ['PG_POOL'],
    };
  }
}

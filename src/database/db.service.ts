import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly pool: Pool;

  constructor () {
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT) || 5432,
    });
  }

  getClient () {
    if (!this.pool) throw new Error('Database pool has not been initialized');
    return this.pool;
  }

  async onModuleDestroy () {
    if (this.pool) {
      await this.pool.end();
      console.log('Database pool has been closed.');
    }
  }
}
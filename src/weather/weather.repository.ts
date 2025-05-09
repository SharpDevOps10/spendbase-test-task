import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/db.service';

@Injectable()
export class WeatherRepository implements OnModuleInit {
  constructor (private readonly dbService: DatabaseService) {}

  async onModuleInit () {
    const client = this.dbService.getClient();
    await client.query(`
        CREATE TABLE IF NOT EXISTS weather_data
        (
            id   SERIAL PRIMARY KEY,
            lat  FLOAT,
            lon  FLOAT,
            part TEXT,
            data JSONB
        );
    `);

    await client.query(`
        CREATE UNIQUE INDEX IF NOT EXISTS idx_weather_unique
            ON weather_data (lat, lon, part);
    `);
  }

  async saveWeatherData (lat: number, lon: number, part: string, data: unknown) {
    const client = this.dbService.getClient();
    const query = `
        INSERT INTO weather_data (lat, lon, part, data)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (lat, lon, part) DO UPDATE
            SET data = EXCLUDED.data
    `;
    await client.query(query, [lat, lon, part, JSON.stringify(data)]);
  }

  async getWeatherByLocation (lat: number, lon: number, part: string) {
    const client = this.dbService.getClient();
    const query = `
        SELECT data
        FROM weather_data
        WHERE lat = $1
          AND lon = $2
          AND part = $3
    `;
    const result = await client.query(query, [lat, lon, part]);
    return result.rows.length > 0 ? result.rows[0].data : null;
  }
}
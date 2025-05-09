import { Injectable, NotFoundException } from '@nestjs/common';
import { WeatherRepository } from './weather.repository';
import { WeatherApiClient } from './weather-api.client';

@Injectable()
export class WeatherService {
  constructor (
    private readonly repository: WeatherRepository,
    private readonly apiClient: WeatherApiClient,
  ) {}

  async saveWeatherData (lat: number, lon: number, part: string): Promise<unknown> {
    const data = await this.apiClient.fetchWeather(lat, lon, part);
    await this.repository.saveWeatherData(lat, lon, part, data);
    return data;
  }

  async getWeatherData (lat: number, lon: number, part: string): Promise<unknown> {
    const data = await this.repository.getWeatherByLocation(lat, lon, part);
    if (!data) throw new NotFoundException('Weather data not found for given coordinates');
    return data;
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { WeatherRepository } from '@weather/weather.repository';
import { WeatherApiClient } from '@weather/weather-api.client';
import { WeatherDto } from '@weather/dtos/weather.dto';

@Injectable()
export class WeatherService {
  constructor (
    private readonly repository: WeatherRepository,
    private readonly apiClient: WeatherApiClient,
  ) {}

  async saveWeatherData (dto: WeatherDto): Promise<unknown> {
    const data = await this.apiClient.fetchWeather(dto.lat, dto.lon, dto.part);
    await this.repository.saveWeatherData(dto.lat, dto.lon, dto.part, data);
    return data;
  }

  async getWeatherData (dto: WeatherDto): Promise<unknown> {
    const data = await this.repository.getWeatherByLocation(dto.lat, dto.lon, dto.part);
    if (!data) throw new NotFoundException('Weather data not found for given coordinates');
    return data;
  }
}
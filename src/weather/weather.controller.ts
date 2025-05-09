import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor (private readonly weatherService: WeatherService) {}

  @Post()
  async postWeather (
    @Body() body: { lat: number; lon: number; part: string }
  ) {
    const { lat, lon, part } = body;
    return this.weatherService.saveWeatherData(lat, lon, part);
  }

  @Get()
  async getWeather (
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('part') part: string,
  ) {
    return this.weatherService.getWeatherData(lat, lon, part);
  }
}

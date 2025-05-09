import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherDto } from './dtos/weather.dto';

@Controller('weather')
export class WeatherController {
  constructor (private readonly weatherService: WeatherService) {}

  @Post()
  async postWeather (@Body() dto: WeatherDto) {
    return this.weatherService.saveWeatherData(dto);
  }

  @Get()
  async getWeather (@Query() dto: WeatherDto) {
    return this.weatherService.getWeatherData(dto);
  }
}
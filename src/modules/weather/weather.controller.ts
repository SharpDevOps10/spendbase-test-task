import { Controller, Post, Get, Body, Query, UseInterceptors } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherDto } from './dtos/weather.dto';
import { ResponseFormatInterceptor } from '@utils/interceptors/response-format.interceptor';

@Controller('weather')
export class WeatherController {
  constructor (private readonly weatherService: WeatherService) {}

  @Post()
  async postWeather (@Body() dto: WeatherDto) {
    return this.weatherService.saveWeatherData(dto);
  }

  @UseInterceptors(ResponseFormatInterceptor)
  @Get()
  async getWeather (@Query() dto: WeatherDto) {
    return this.weatherService.getWeatherData(dto);
  }
}
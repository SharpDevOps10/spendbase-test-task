import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherRepository } from './weather.repository';
import { WeatherApiClient } from './weather-api.client';
import { WeatherController } from './weather.controller';

@Module({
  providers: [WeatherService, WeatherRepository, WeatherApiClient],
  controllers: [WeatherController],
})
export class WeatherModule {}
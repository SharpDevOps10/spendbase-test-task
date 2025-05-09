import { Module } from '@nestjs/common';
import { WeatherService } from '@weather/weather.service';
import { WeatherRepository } from '@weather/weather.repository';
import { WeatherApiClient } from '@weather/weather-api.client';
import { WeatherController } from '@weather/weather.controller';

@Module({
  providers: [WeatherService, WeatherRepository, WeatherApiClient],
  controllers: [WeatherController],
})
export class WeatherModule {}
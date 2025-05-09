import { WeatherService } from '@weather/weather.service';
import { WeatherRepository } from '@weather/weather.repository';
import { WeatherApiClient } from '@weather/weather-api.client';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { WeatherDto } from '@weather/dtos/weather.dto';
import { validate } from 'class-validator';

const mockWeatherData = {
  current: {
    sunrise: 123,
    sunset: 456,
    temp: 20,
    feels_like: 21,
    pressure: 1000,
    humidity: 80,
    uvi: 3,
    wind_speed: 5,
  },
};

describe('WeatherService (unit)', () => {
  let service: WeatherService;
  let repo: jest.Mocked<WeatherRepository>;
  let api: jest.Mocked<WeatherApiClient>;

  beforeEach(() => {
    repo = {
      saveWeatherData: jest.fn(),
      getWeatherByLocation: jest.fn(),
    } as any;

    api = {
      fetchWeather: jest.fn(),
    } as any;

    service = new WeatherService(repo, api);
  });

  it('saveWeatherData should fetch from API and save to repo', async () => {
    api.fetchWeather.mockResolvedValue(mockWeatherData);

    const dto = { lat: 50.45, lon: 30.52, part: 'minutely,daily' };

    const result = await service.saveWeatherData(dto);

    expect(api.fetchWeather).toHaveBeenCalledWith(50.45, 30.52, 'minutely,daily');
    expect(repo.saveWeatherData).toHaveBeenCalledWith(50.45, 30.52, 'minutely,daily', mockWeatherData);
    expect(result).toBe(mockWeatherData);
  });

  it('getWeather should return data if found', async () => {
    repo.getWeatherByLocation.mockResolvedValue(mockWeatherData);
    const dto = { lat: 50.45, lon: 30.52, part: 'minutely,daily' };

    const result = await service.getWeatherData(dto);

    expect(repo.getWeatherByLocation).toHaveBeenCalledWith(50.45, 30.52, 'minutely,daily');
    expect(result).toBe(mockWeatherData);
  });

  it('getWeather should throw NotFoundException if no data', async () => {
    repo.getWeatherByLocation.mockResolvedValue(null);
    const dto = { lat: 50.45, lon: 30.52, part: 'minutely,daily' };

    await expect(
      service.getWeatherData(dto),
    ).rejects.toThrow(NotFoundException);
  });

  it('should overwrite existing data on repeated save', async () => {
    const dto = { lat: 50.45, lon: 30.52, part: 'minutely,daily' };
    api.fetchWeather.mockResolvedValue(mockWeatherData);

    await service.saveWeatherData(dto);
    await service.saveWeatherData(dto);

    expect(repo.saveWeatherData).toHaveBeenCalledTimes(2);
  });

  it('should normalize part before using', async () => {
    api.fetchWeather.mockResolvedValue(mockWeatherData);

    const raw = { lat: 50.45, lon: 30.52, part: 'minutely, daily' };
    const dto = plainToInstance(WeatherDto, raw);

    await service.saveWeatherData(dto);

    expect(api.fetchWeather).toHaveBeenCalledWith(50.45, 30.52, 'minutely,daily');
  });

  it('should fail validation if part contains invalid value', async () => {
    const input = { lat: 50.45, lon: 30.52, part: 'fortnightly,daily' };

    const dto = plainToInstance(WeatherDto, input);
    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    const partError = errors.find((e) => e.property === 'part');
    expect(partError?.constraints?.IsValidExcludeParts).toBeDefined();
  });

  it('should pass validation with valid part values', async () => {
    const input = { lat: 50.45, lon: 30.52, part: 'minutely,daily' };

    const dto = plainToInstance(WeatherDto, input);
    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });
});
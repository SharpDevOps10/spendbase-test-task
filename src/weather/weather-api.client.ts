import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherApiClient {
  private readonly apiKey = process.env.WEATHER_API_KEY;
  private readonly baseUrl = process.env.WEATHER_API_BASE_URL;

  async fetchWeather (lat: number, lon: number, part: string): Promise<unknown> {
    const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&exclude=${part}&appid=${this.apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`OpenWeather API error: ${response.statusText}`);

    return await response.json();
  }
}
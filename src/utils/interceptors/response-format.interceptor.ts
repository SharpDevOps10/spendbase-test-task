import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
  intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const current = data?.current;
        return {
          sunrise: current?.sunrise,
          sunset: current?.sunset,
          temp: current?.temp,
          feels_like: current?.feels_like,
          pressure: current?.pressure,
          humidity: current?.humidity,
          uvi: current?.uvi,
          wind_speed: current?.wind_speed,
        };
      }),
    );
  }
}

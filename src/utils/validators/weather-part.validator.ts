import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { WeatherPart } from '@enums/weather-part.enum';

@ValidatorConstraint({ name: 'IsValidExcludeParts', async: false })
export class IsValidExcludeParts implements ValidatorConstraintInterface {
  validate (value: string): boolean {
    if (typeof value !== 'string') return false;
    const parts = value.split(',');
    return parts.every((p) =>
      Object.values(WeatherPart).includes(p.trim() as WeatherPart),
    );
  }

  defaultMessage (): string {
    return `Each value in 'part' must be one of: ${Object.values(WeatherPart).join(', ')}`;
  }
}
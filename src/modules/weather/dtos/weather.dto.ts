import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';
import { IsValidExcludeParts } from '../../../utils/validators/weather-part.validator';
import { Transform } from 'class-transformer';
import { normalizePartTransform } from '../../../utils/transforms/normalize-part.transform';

export class WeatherDto {
  @IsNotEmpty()
  @IsLatitude()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
    lat: number;

  @IsNotEmpty()
  @IsLongitude()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
    lon: number;

  @IsNotEmpty()
  @Transform(normalizePartTransform)
  @Validate(IsValidExcludeParts)
  @IsString()
    part: string;
}
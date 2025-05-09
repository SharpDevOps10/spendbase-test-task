import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { WeatherModule } from '@weather/weather.module';
import { DatabaseModule } from '@database/db.module';

@Module({
  imports: [WeatherModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

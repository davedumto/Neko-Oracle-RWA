import { Module } from '@nestjs/common';
import { NormalizationModule } from './modules/normalization.module';

@Module({
  imports: [NormalizationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

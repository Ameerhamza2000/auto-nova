import { Module } from '@nestjs/common';
import { RefuelingService } from './refueling.service';
import { RefuelingController } from './refueling.controller';

@Module({
  controllers: [RefuelingController],
  providers: [RefuelingService],
})
export class RefuelingModule {}

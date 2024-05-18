import { Module } from '@nestjs/common';
import { RefuelingService } from './refueling.service';
import { RefuelingController } from './refueling.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RefuelSchema } from 'src/modals/refueling.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[MongooseModule.forFeature([{name:'Refueling' , schema: RefuelSchema}]),AuthModule],
  controllers: [RefuelingController],
  providers: [RefuelingService],
})
export class RefuelingModule {}

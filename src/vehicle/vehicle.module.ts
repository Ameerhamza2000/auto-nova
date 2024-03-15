import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from 'src/modals/vehicle.schema';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports:[MongooseModule.forFeature([{name:'Vehicle' , schema: VehicleSchema}]),AuthModule],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}

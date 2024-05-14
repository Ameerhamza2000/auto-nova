import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ServiceSchema } from 'src/modals/service.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'Service' , schema: ServiceSchema}]),AuthModule],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}

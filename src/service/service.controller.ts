import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('service')
@UseGuards(AuthGuard)
export class ServiceController {
  constructor(private readonly carServiceService: ServiceService) {}

  @Post("addService")
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.carServiceService.create(createServiceDto);
  }

  @Get('getAllService')
  findAll() {
    return this.carServiceService.findAll();
  }

  @Get('getAllVehicleService/:id')
  findAllVehicleExpenses(@Param('id') id:string) {
    return this.carServiceService.findAllVehicleServices(id);
  }

  @Get('getService/:id')
  findOne(@Param('id') id: string) {
    return this.carServiceService.findOne(id);
  }

  @Put('updateService/:id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.carServiceService.update(id, updateServiceDto);
  }

  @Delete('deleteService/:id')
  remove(@Param('id') id: string) {
    return this.carServiceService.remove(id);
  }

}

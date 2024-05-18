import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RefuelingService } from './refueling.service';
import { CreateRefuelingDto } from './dto/create-refueling.dto';
import { UpdateRefuelingDto } from './dto/update-refueling.dto';

@Controller('refueling')
export class RefuelingController {
  constructor(private readonly refuelingService: RefuelingService) {}

  @Post('addRefueling')
  create(@Body() createRefuelingDto: CreateRefuelingDto) {
    return this.refuelingService.create(createRefuelingDto);
  }

  @Get('getAllRefueling')
  findAll() {
    return this.refuelingService.findAll();
  }

  @Get('getAllVehicleRefueling/:id')
  findAllVehicleExpenses(@Param('id') id:string) {
    return this.refuelingService.findAllVehicleRefueling(id);
  }

  @Get('getRefueling/:id')
  findOne(@Param('id') id: string) {
    return this.refuelingService.findOne(id);
  }

  @Put('updateRefueling/:id')
  update(@Param('id') id: string, @Body() updateRefuelingDto: UpdateRefuelingDto) {
    return this.refuelingService.update(id, updateRefuelingDto);
  }

  @Delete('deleteRefueling/:id')
  remove(@Param('id') id: string) {
    return this.refuelingService.remove(id);
  }
}

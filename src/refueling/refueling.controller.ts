import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RefuelingService } from './refueling.service';
import { CreateRefuelingDto } from './dto/create-refueling.dto';
import { UpdateRefuelingDto } from './dto/update-refueling.dto';

@Controller('refueling')
export class RefuelingController {
  constructor(private readonly refuelingService: RefuelingService) {}

  @Post()
  create(@Body() createRefuelingDto: CreateRefuelingDto) {
    return this.refuelingService.create(createRefuelingDto);
  }

  @Get()
  findAll() {
    return this.refuelingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.refuelingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRefuelingDto: UpdateRefuelingDto) {
    return this.refuelingService.update(+id, updateRefuelingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.refuelingService.remove(+id);
  }
}

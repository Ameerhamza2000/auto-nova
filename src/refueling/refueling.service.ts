import { Injectable } from '@nestjs/common';
import { CreateRefuelingDto } from './dto/create-refueling.dto';
import { UpdateRefuelingDto } from './dto/update-refueling.dto';

@Injectable()
export class RefuelingService {
  create(createRefuelingDto: CreateRefuelingDto) {
    return 'This action adds a new refueling';
  }

  findAll() {
    return `This action returns all refueling`;
  }

  findOne(id: number) {
    return `This action returns a #${id} refueling`;
  }

  update(id: number, updateRefuelingDto: UpdateRefuelingDto) {
    return `This action updates a #${id} refueling`;
  }

  remove(id: number) {
    return `This action removes a #${id} refueling`;
  }
}

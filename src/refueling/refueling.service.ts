import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRefuelingDto } from './dto/create-refueling.dto';
import { UpdateRefuelingDto } from './dto/update-refueling.dto';
import mongoose from 'mongoose';
import { Refueling } from 'src/modals/refueling.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RefuelingService {
  constructor(
    @InjectModel(Refueling.name)
    private refuelingModel: mongoose.Model<Refueling>,
  ) {}

  async create(createRefuelingDto: CreateRefuelingDto) {
    const refuel = await this.refuelingModel.create(createRefuelingDto);
    return refuel;
  }

  async findAll() {
    const refuelings = await this.refuelingModel.find().populate('vehicleId');
    return refuelings;
  }

  async findAllVehicleRefueling(id) {
    try {
      const validId = mongoose.isValidObjectId(id);
      if (!validId) {
        throw new BadRequestException('Invalid Vehicle Id');
      }
      const refuelings = await this.refuelingModel.find({ vehicleId: id });
      return refuelings;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    const validId = mongoose.isValidObjectId(id);
    if (!validId) {
      throw new BadRequestException('Invalid Refuel Id');
    }
    const refueling = await this.refuelingModel.findOne({ _id: id });
    if (!refueling) {
      throw new NotFoundException('Not Found');
    }
    return refueling;
  }

  async update(id: string, updateRefuelDto: UpdateRefuelingDto) {
    const validId = mongoose.isValidObjectId(id);
    if (!validId) {
      throw new BadRequestException('Invalid Refuel Id');
    }
    const refuel = await this.refuelingModel.findByIdAndUpdate({ _id: id },{...updateRefuelDto},{new:true});
    if (!refuel) {
      throw new NotFoundException('Not Found');
    }
    return refuel;
  }

  async remove(id: string) {
    const validId = mongoose.isValidObjectId(id);
    if (!validId) {
      throw new BadRequestException('Invalid Refuel Id');
    }
    const refuel = await this.refuelingModel.findByIdAndDelete({ _id: id });
    if (!refuel) {
      throw new NotFoundException('Not Found');
    }
    return refuel;
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Service } from 'src/modals/service.schema';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name)
    private serviceModel: mongoose.Model<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const service = await this.serviceModel.create(createServiceDto);
    return service;
  }

  async findAll() {
    const carServices = await this.serviceModel.find().populate('vehicleId');
    return carServices;
  }

  async findAllVehicleServices(id) {
    try {
      const validId = mongoose.isValidObjectId(id);
      if (!validId) {
        throw new BadRequestException('Invalid Vehicle Id');
      }
      const carServices = await this.serviceModel.find({ vehicleId: id });
      return carServices;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    const validId = mongoose.isValidObjectId(id);
    if (!validId) {
      throw new BadRequestException('Invalid Service Id');
    }
    const carService = await this.serviceModel.findOne({ _id: id });
    if (!carService) {
      throw new NotFoundException('Not Found');
    }
    return carService;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const validId = mongoose.isValidObjectId(id);
    if (!validId) {
      throw new BadRequestException('Invalid Service Id');
    }
    const carService = await this.serviceModel.findByIdAndUpdate({ _id: id },{...updateServiceDto},{new:true});
    if (!carService) {
      throw new NotFoundException('Not Found');
    }
    return carService;
  }

  async remove(id: string) {
    const validId = mongoose.isValidObjectId(id);
    if (!validId) {
      throw new BadRequestException('Invalid Service Id');
    }
    const carService = await this.serviceModel.findByIdAndDelete({ _id: id });
    if (!carService) {
      throw new NotFoundException('Not Found');
    }
    return carService;
  }
}

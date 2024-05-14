import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Vehicle } from 'src/modals/vehicle.schema';
import * as mongoose from 'mongoose';
import { User } from 'src/modals/user.schema';

@Injectable()
export class VehicleService {
  constructor(@InjectModel(Vehicle.name)
  private vehicleModel:mongoose.Model<Vehicle>){}

  async create(createVehicleDto: CreateVehicleDto,user):Promise<Vehicle> {
    console.log("add vehicle hit")
   try{ const vehicle = await this.vehicleModel.create({
      ...createVehicleDto,
      owner:user.sub
    })
    return vehicle
  }catch(error){
    throw new InternalServerErrorException("Error while creating vehicle");
  }
  }

  async findAll(user) {
    const vehicles = await this.vehicleModel.find({owner:user.sub})
    return vehicles;
  }

  async findOne(id: string):Promise<Vehicle> {
    const validId= await mongoose.isValidObjectId(id);
    if(!validId){
      throw new BadRequestException("Invalid Id")
    }
    const vehicle = await this.vehicleModel.findById(id).populate('owner','-password');
    if(!vehicle){
      throw new NotFoundException("No vehicle with this id");
    }
    return vehicle;
  }

  update(id: string, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: string) {
    return `This action removes a #${id} vehicle`;
  }
}

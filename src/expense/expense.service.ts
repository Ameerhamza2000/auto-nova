import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from 'src/modals/expense.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name)
    private expenseModel: mongoose.Model<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const expense = await this.expenseModel.create(createExpenseDto);
    return expense;
  }

  async findAll() {
    const expenses = await this.expenseModel.find().populate('vehicleId');
    return expenses;
  }

  async findAllVehicleExpenses(id) {
    try {
      const validId = mongoose.isValidObjectId(id);
      if (!validId) {
        throw new BadRequestException('Invalid Vehicle Id');
      }
      const expenses = await this.expenseModel.find({ vehicleId: id });
      return expenses;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    const validId = mongoose.isValidObjectId(id);
    if (!validId) {
      throw new BadRequestException('Invalid Expense Id');
    }
    const expense = await this.expenseModel.findOne({ _id: id });
    if (!expense) {
      throw new NotFoundException('Not Found');
    }
    return expense;
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    const validId = mongoose.isValidObjectId(id);
    if (!validId) {
      throw new BadRequestException('Invalid Expense Id');
    }
    const expense = await this.expenseModel.findByIdAndUpdate({ _id: id },{...updateExpenseDto},{new:true});
    if (!expense) {
      throw new NotFoundException('Not Found');
    }
    return expense;
  }

  async remove(id: string) {
    const validId = mongoose.isValidObjectId(id);
    if (!validId) {
      throw new BadRequestException('Invalid Expense Id');
    }
    const expense = await this.expenseModel.findByIdAndDelete({ _id: id });
    if (!expense) {
      throw new NotFoundException('Not Found');
    }
    return expense;
  }
}

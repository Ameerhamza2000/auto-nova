import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { query } from 'express';

@Controller('expense')
@UseGuards(AuthGuard)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post("addExpense")
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(createExpenseDto);
  }

  @Get('getAllExpense')
  findAll() {
    return this.expenseService.findAll();
  }

  @Get('getAllVehicleExpense/:id')
  findAllVehicleExpenses(@Param('id') id:string) {
    return this.expenseService.findAllVehicleExpenses(id);
  }

  @Get('getExpense/:id')
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(id);
  }

  @Put('updateExpense/:id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete('deleteExpense/:id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(id);
  }
}

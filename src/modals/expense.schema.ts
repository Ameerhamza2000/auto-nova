import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { now } from "mongoose";

@Schema()

export class Expense{
    @Prop()
    name:string

    @Prop()
    odometer:number

    @Prop({default:'expense'})
    category:string

    @Prop()
    type:string

    @Prop()
    place?: string

    @Prop()
    amount: number

    @Prop({default:Date.now()})
    date: Date

    @Prop()
    driver?: string

    @Prop({type:mongoose.Schema.ObjectId, ref:'Vehicle'})
    vehicleId:string

    @Prop()
    description?: string
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense); 
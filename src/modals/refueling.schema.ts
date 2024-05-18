import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { now } from "mongoose";

@Schema()

export class Refueling{
    @Prop()
    name:string
    
    @Prop()
    odometer:number

    @Prop({default:'refuel'})
    category:string

    @Prop()
    type:string

    @Prop()
    place?: string

    @Prop()
    amount: number

    @Prop()
    quantity:number

    @Prop({default:false})
    fullTank:Boolean

    @Prop({default:Date.now()})
    date: Date

    @Prop()
    driver?: string

    @Prop({type:mongoose.Schema.ObjectId, ref:'Vehicle'})
    vehicleId:string

    @Prop()
    description?: string
}

export const RefuelSchema = SchemaFactory.createForClass(Refueling); 
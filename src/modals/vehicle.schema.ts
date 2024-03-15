import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()

export class Vehicle{
    @Prop()
    brand:string

    @Prop()
    model:string

    @Prop()
    fuelCapacity:string

    @Prop({type:mongoose.Schema.ObjectId, ref:'User'})
    owner:string

}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle); 
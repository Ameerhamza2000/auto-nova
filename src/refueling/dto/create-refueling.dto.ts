import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRefuelingDto {
    @IsString()
    @IsNotEmpty()
    name:string
    
    @IsNumber()
    @IsNotEmpty()
    odometer:number

    @IsString()
    @IsNotEmpty()
    type:string


    @IsNotEmpty()
    @IsNumber()
    quantity:number

    @IsOptional()
    fullTank:Boolean

    @IsOptional()
    date:Date

    @IsOptional()
    driver:string

    @IsNumber()
    @IsNotEmpty()
    amount:number

    @IsMongoId()
    @IsNotEmpty()
    vehicleId: string

    @IsOptional()
    description:string

    @IsOptional()
    place:string
}

import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateServiceDto {
    @IsString()
    @IsNotEmpty()
    name:string
    
    @IsNumber()
    @IsNotEmpty()
    odometer:number

    @IsString()
    @IsNotEmpty()
    type:string

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

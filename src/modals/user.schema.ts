import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()

export class User{
    @Prop()
    userName:string

    @Prop({unique:true})
    email: string

    @Prop()
    password:string
}


export const UserSchema= SchemaFactory.createForClass(User)
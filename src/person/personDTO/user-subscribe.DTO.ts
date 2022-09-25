import { IsEmail, IsNotEmpty } from "class-validator";

export class UserSubscribeDTO {

    usename: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;



}
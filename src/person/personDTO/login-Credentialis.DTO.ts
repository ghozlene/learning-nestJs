import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginCreadentialsDTO {

    @IsEmail()
    @IsNotEmpty()
    email: string;


    @IsNotEmpty()
    password: string;
}
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class AddPersonDTO {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(130)
    age: number;

    @IsNumber()
    @IsNotEmpty()
    cin: number;

    @IsString()
    @IsNotEmpty()
    job: string;

    @IsString()
    @IsOptional()
    path: string;
}
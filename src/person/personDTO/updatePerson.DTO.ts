import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdatePersonDTO {

    @IsOptional()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    firstName: string;

    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    @Min(1)
    @Max(130)
    age: number;

    @IsNumber()
    @IsNotEmpty()
    cin: number;

    @IsString()
    @IsOptional()
    job: string;

    @IsString()
    @IsOptional()
    path: string;
}
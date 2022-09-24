import { IsNumber, IsOptional } from "class-validator";

export class getAllTodoDto {

    @IsNumber()
    @IsOptional()
    page: number;
    @IsNumber()
    @IsOptional()
    item: number;
}
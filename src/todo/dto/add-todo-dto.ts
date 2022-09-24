import { IsString, MinLength, IsNotEmpty } from "class-validator";


export class AddTodoDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6, {
        message: 'the filed need to have 6 carac min'
    })
    name: string;
    @IsString()
    @IsNotEmpty()
    description: string;
}



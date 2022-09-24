import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { query } from 'express';
import { AddTodoDto } from './dto/add-todo-dto';
import { getAllTodoDto } from './dto/get-allTodo-dto';
import { TodoEntity } from './entity/todo.entity'; import { TodoService } from './todo.service';
'./entity/todo.entity';



@Controller('todo')
export class TodoController {




    constructor(
        private todoService: TodoService
    ) {

    }
    @Get('')
    getTodos(
        @Query() queryParams: getAllTodoDto
    ) {

        console.log(queryParams);
        return this.todoService.getTodo();
    }
    @Get('/:id')

    getTodoById(

        @Param('id') id
    ): TodoEntity {

        return this.todoService.getTodoId(id);

    }


    @Post('')
    postTodos(
        @Body() newTodo: AddTodoDto,

    ) {
        return this.todoService.addTodo(newTodo);


    }

    @Delete('/:id')
    deleteTodo(
        @Param('id') id
    ) {

        return this.todoService.deleteTodo(id);
    }

    @Put('/:id')
    updateTodo(
        @Param('id') id,
        @Body() newtodo: Partial<AddTodoDto>
    ) {
        return this.todoService.updateTodo(id, newtodo);

    }
}

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
    ) {

        const todo = this.todos.find(t => t.id == id);
        if (todo)
            return todo;

        throw new NotFoundException('todo not here');

    }


    @Post('')
    postTodos(
        @Body() newTodo: AddTodoDto,

    ) {

        const todo = new TodoEntity();
        const { name, description } = newTodo;
        todo.name = name;
        todo.description = description;
        if (this.todos.length) {
            todo.id = this.todos[this.todos.length - 1].id + 1;
        } else {
            todo.id = 1;
        }
        this.todos.push(todo);
        console.log(todo);
        return todo;

    }

    @Delete('/:id')
    deleteTodo(
        @Param('id') id
    ) {
        const index = this.todos.findIndex(todo => todo.id == id);
        if (index >= 0) {
            this.todos.splice(index, 1);
        } else {
            throw new NotFoundException('element doesn\'t existe');
        }
        return {
            count: 1,
            message: 'element doesn\'t existe'
        };

    }

    @Put('/:id')
    updateTodo(
        @Param('id') id,
        @Body() newtodo: Partial<AddTodoDto>
    ) {
        const todo = this.getTodoById(id);
        todo.description = newtodo.description ? newtodo.description : todo.description;
        todo.name = newtodo.name ? newtodo.name : todo.name;

        return todo;
    }
}

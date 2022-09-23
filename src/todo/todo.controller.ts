import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { query } from 'express';
import { TodoEntity } from './entity/todo.entity'; './entity/todo.entity';



@Controller('todo')
export class TodoController {

    todos: TodoEntity[];


    constructor() {
        this.todos = [];
    }
    @Get('')
    getTodos(
        @Query() queryParams
    ) {

        console.log(queryParams);
        return this.todos;
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
        @Body() newTodo: TodoEntity,

    ) {
        if (this.todos.length) {
            newTodo.id = this.todos[this.todos.length - 1].id + 1;
        } else {
            newTodo.id = 1;
        }
        this.todos.push(newTodo);
        console.log(newTodo);
        return newTodo;

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
        @Body() newtodo: Partial<TodoEntity>
    ) {
        const todo = this.getTodoById(id);
        todo.description = newtodo.description ? newtodo.description : todo.description;
        todo.name = newtodo.name ? newtodo.name : todo.name;

        return todo;
    }
}

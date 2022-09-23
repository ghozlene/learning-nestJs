import { Body, Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { TodoEntity } from './entity/todo.entity'; './entity/todo.entity';



@Controller('todo')
export class TodoController {

    todos: TodoEntity[];


    constructor() {
        this.todos = [];
    }
    @Get('')
    getTodos() {

        return this.todos;
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
    deleteTodo() {
        console.log('delete single  todo ');
        return "delete todo";
    }

    @Put('/:id')
    updateTodo() {
        console.log('update single  todo ');
        return "update todo";
    }
}

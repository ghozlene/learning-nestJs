import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('todo')
export class TodoController {

    @Get('')
    getTodos() {
        console.log('get  todo list');
        return "this is your list ";
    }

    @Post('')
    postTodos() {
        console.log('post  todo ');
        return "add todo";
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

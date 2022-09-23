import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';




@Controller('todo')
export class TodoController {

    @Get('')
    getTodos(
        @Req() request,
        @Res() response,
    ) {
        console.log(response.status(200).json({ message: 'message1' }));
        //console.log(request.headers.host);
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

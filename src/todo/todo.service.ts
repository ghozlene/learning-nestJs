import { Injectable } from '@nestjs/common';
import { TodoEntity } from './entity/todo.entity';
@Injectable()
export class TodoService {
    todos: TodoEntity[];

    getTodo(): TodoEntity[] {
        return this.todos;
    }
}

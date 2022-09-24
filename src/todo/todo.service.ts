import { Injectable, NotFoundException } from '@nestjs/common';
import { AddTodoDto } from './dto/add-todo-dto';
import { TodoEntity } from './entity/todo.entity';
@Injectable()
export class TodoService {
    todos: TodoEntity[] = [];

    getTodo(): TodoEntity[] {
        return this.todos;
    }

    addTodo(newTodo: AddTodoDto) {
        let id;
        const { name, description } = newTodo;

        if (this.todos.length) {
            id = this.todos[this.todos.length - 1].id + 1;
        } else {
            id = 1;
        }
        const todo = {
            id,
            name,
            description,
            createdAt: new Date().toLocaleDateString()
        };
        this.todos.push(todo);
        return todo;

    }

    getTodoId(id) {

        const todo = this.todos.find(t => t.id == id);
        if (todo)
            return todo;

        throw new NotFoundException('todo not here');
    }

    deleteTodo(id) {

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
    updateTodo(id: number, newTodo: Partial<AddTodoDto>) {

        const todo = this.getTodoId(id);
        todo.description = newTodo.description ? newTodo.description : todo.description;
        todo.name = newTodo.name ? newTodo.name : todo.name;
        return todo;
    }
}

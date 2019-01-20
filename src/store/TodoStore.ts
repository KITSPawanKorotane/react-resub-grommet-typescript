import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';

import { Todo } from '../models/TodoModels';

@AutoSubscribeStore
class TodosStore extends StoreBase {
    
    private _todos: Todo[] = [];
    
    addTodo(todoText: string) {
        const now = Date.now().valueOf();
        let newTodo: Todo = {
            id: now.toString(),
            creationTime: now,
            text: todoText,
        };
        this._todos = this._todos.concat(newTodo);
        this.trigger();
        return newTodo;
    }

    @autoSubscribe
    getTodos() {
        return this._todos;
    }

    @autoSubscribe
    getTodoById(todoId: string) {
        return this._todos.find(todo => todo.id === todoId);
    }

    deleteTodo(todoId: string) {
        this._todos = this._todos.filter(todo => todo.id !== todoId);
        this.trigger();
    }
}

export default new TodosStore();
import { CreateTodoInput, UpdateTodoInput } from 'src/todo/models/todo.model';
import { Todo as TodoEntity } from 'src/todo/entity/todo.entity';

export interface ITodoRepository {
  findAll(): Promise<TodoEntity[]>;
  create(todo: CreateTodoInput): Promise<TodoEntity>;
  update(todo: UpdateTodoInput): Promise<TodoEntity>;
  delete(id: string): Promise<string>;
}

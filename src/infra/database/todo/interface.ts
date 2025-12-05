import { Todo as TodoEntity } from '../entity/todo.entity';

export interface ITodoRepository {
  findAll(): Promise<TodoEntity[]>;
}

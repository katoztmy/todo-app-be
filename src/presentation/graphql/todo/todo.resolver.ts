import { Query, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.model';
import { Todo as TodoEntity } from '../../../infra/database/entity/todo.entity';
import { TodoRepository } from '../../../infra/database/todo/todo.repository';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoRepository: TodoRepository) {}

  @Query(() => [Todo])
  async todos(): Promise<Todo[]> {
    const todos: TodoEntity[] = await this.todoRepository.findAll();
    return todos.map((todo) => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    }));
  }
}

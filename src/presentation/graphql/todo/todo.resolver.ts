import { Query, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.model';
import { Todo as TodoEntity } from '../../../infra/database/entity/todo.entity';
import { ITodoRepository } from 'src/infra/database/todo/interface';
import { Inject } from '@nestjs/common';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(
    @Inject('ITodoRepository')
    private readonly todoRepository: ITodoRepository,
  ) {}

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

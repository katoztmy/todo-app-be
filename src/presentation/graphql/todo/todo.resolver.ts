import { Query, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.model';
import { TodoRepository } from '../../../infra/database/todo/todo.repository';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoRepository: TodoRepository) {}

  @Query(() => [Todo])
  async todos(): Promise<Todo[]> {
    return await this.todoRepository.findAll();
  }
}

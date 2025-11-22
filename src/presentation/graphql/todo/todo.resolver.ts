import { Query, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.model';
import { TodoRepository } from 'src/infra/database/todo/todo.repository';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoRepository: TodoRepository) {}
  
  @Query(() => [Todo])
  todos(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }
}


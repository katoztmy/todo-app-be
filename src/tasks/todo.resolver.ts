import { Query, Resolver } from '@nestjs/graphql';
import { Todo } from './models/todo.model';
import { TodoRepository } from 'src/domain/todo/repository/taskRepository';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoRepository: TodoRepository) {}
  @Query(() => [Todo])
  todos(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }
}

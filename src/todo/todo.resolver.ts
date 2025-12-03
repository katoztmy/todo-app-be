import { Query, Resolver } from '@nestjs/graphql';
import { Todo } from './models/todo.model';

@Resolver(() => Todo)
export class TodoResolver {
  @Query(() => [Todo])
  todos(): Promise<Todo[]> {
    return Promise.resolve([
      {
        id: '1',
        title: 'Todo 1',
        description: 'Description 1',
        dueDate: new Date(),
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}

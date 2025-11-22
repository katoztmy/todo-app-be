import { Query, Resolver } from '@nestjs/graphql';
import { Todo } from './models/todo.model';
import AppDataSource from 'src/typeorm/datasource';
import { Todo as TodoEntity } from './entity/todo';

@Resolver(() => Todo)
export class TodoResolver {
  @Query(() => [Todo])
  todos(): Promise<Todo[]> {
    return AppDataSource.getRepository(TodoEntity).find();
  }
}


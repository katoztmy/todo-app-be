import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './todo.model';
import { TodoRepository } from '../../../infra/database/todo/todo.repository';
import { CreateTodoInput } from 'src/todo/models/todo.model';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoRepository: TodoRepository) {}

  @Query(() => [Todo])
  async todos(): Promise<Todo[]> {
    return await this.todoRepository.findAll();
  }

  @Mutation(() => Todo)
  async createTodo(@Args('input') input: CreateTodoInput) {
    return await this.todoRepository.create(input);
  }
}

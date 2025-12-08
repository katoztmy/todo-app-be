import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import {
  Todo,
  CreateTodoInput,
  UpdateTodoInput,
} from 'src/todo/models/todo.model';
import { ITodoRepository } from 'src/infra/database/todo/interface';
import { Todo as TodoEntity } from 'src/todo/entity/todo.entity';

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

  @Mutation(() => Todo)
  async createTodo(@Args('input') input: CreateTodoInput): Promise<Todo> {
    const todo: TodoEntity = await this.todoRepository.create(input);
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  }

  @Mutation(() => Todo)
  async updateTodo(@Args('input') input: UpdateTodoInput): Promise<Todo> {
    const todo: TodoEntity = await this.todoRepository.update(input);
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    };
  }
}

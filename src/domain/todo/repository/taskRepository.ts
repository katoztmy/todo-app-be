import { Injectable } from '@nestjs/common';
import { Todo } from 'src/tasks/models/todo.model';
import AppDataSource from 'src/typeorm/datasource';
import { Todo as TodoEntity } from 'src/tasks/entity/todo';

@Injectable()
export class TodoRepository {
  async findAll(): Promise<Todo[]> {
    return AppDataSource.getRepository(TodoEntity).find();
  }
}

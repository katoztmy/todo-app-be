import { Injectable } from '@nestjs/common';
import { Todo as TodoEntity } from '../entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ITodoRepository } from './interface';
import { Repository } from 'typeorm';

@Injectable()
export class TodoRepository implements ITodoRepository {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async findAll(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }
}

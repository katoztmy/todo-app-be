import { Injectable } from '@nestjs/common';
import { Todo as TodoEntity } from '../../../todo/entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoInput } from 'src/todo/models/todo.model';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async findAll(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  async create(todo: CreateTodoInput): Promise<TodoEntity> {
    const newTodo = this.todoRepository.create({
      title: todo.title,
      description: todo.description,
      completed: false,
      dueDate: todo.dueDate,
    });
    return this.todoRepository.save(newTodo);
  }
}

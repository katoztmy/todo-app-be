import { Injectable } from '@nestjs/common';
import { Todo as TodoEntity } from '../../../todo/entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoInput, UpdateTodoInput } from 'src/todo/models/todo.model';

@Injectable()
export class TodoRepository {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async findAll(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }

  async create(todo: CreateTodoInput): Promise<TodoEntity> {
    const newTodo = await this.todoRepository.create({
      title: todo.title,
      description: todo.description,
      completed: false,
      dueDate: todo.dueDate,
    });
    return this.todoRepository.save(newTodo);
  }

  async update(todo: UpdateTodoInput): Promise<TodoEntity> {
    const existingTodo = await this.todoRepository.findOne({
      where: { id: todo.id },
    });

    if (!existingTodo) {
      throw new Error(`Todo with id ${todo.id} not found`);
    }

    const updatedTodo = await this.todoRepository.save({
      ...existingTodo,
      title: todo.title ?? existingTodo.title,
      description: todo.description ?? existingTodo.description,
      dueDate: todo.dueDate ?? existingTodo.dueDate,
      completed: todo.completed ?? existingTodo.completed,
    });

    return updatedTodo;
  }
}

// https://docs.nestjs.com/fundamentals/testing#end-to-end-testing
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { Todo } from 'src/presentation/graphql/todo/todo.model';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo as TodoEntity } from '../src/infra/database/entity/todo.entity';

describe('Todos', () => {
  let app: INestApplication;
  let todoRepository: Repository<TodoEntity>;
  const query = `
    query {
      todos {
        id
        title
        dueDate
        completed
        description
      }
    }
  `;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    todoRepository = moduleRef.get<Repository<TodoEntity>>(
      getRepositoryToken(TodoEntity),
    );
    await app.init();
  });

  beforeEach(async () => {
    await todoRepository.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('タスクが配列で返る', () => {
    it('タスクが存在する場合、配列として取得できること', async () => {
      const testTodos = [
        {
          title: 'テストタスク1',
          description: 'これはテスト用のタスクです',
          completed: false,
        },
        {
          title: 'テストタスク2',
          description: null,
          completed: true,
        },
      ];
      await todoRepository.save(testTodos);

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect(200);

      expect(res.body.errors).toBeUndefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.todos).toBeDefined();
      expect(Array.isArray(res.body.data.todos)).toBe(true);
      expect(res.body.data.todos).toHaveLength(2);
    });
  });

  describe('各タスクには id、title、completed が含まれる', () => {
    it('取得したタスクに必須フィールドが含まれること', async () => {
      const testTodo = {
        title: 'テストタスク',
        description: 'テスト用',
        completed: false,
      };
      await todoRepository.save(testTodo);

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect(200);

      expect(res.body.errors).toBeUndefined();
      const todos = res.body.data.todos;
      expect(todos).toHaveLength(1);

      const todo = todos[0];
      expect(todo).toHaveProperty('id');
      expect(todo).toHaveProperty('title');
      expect(todo).toHaveProperty('completed');
    });
  });

  describe('id、title、dueDate はそれぞれ string, string, Date 型である', () => {
    it('各フィールドの型が正しいこと', async () => {
      const testTodo = {
        title: 'テストタスク',
        description: 'テスト用',
        completed: false,
        dueDate: new Date('2025-12-31'),
      };
      await todoRepository.save(testTodo);

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect(200);

      expect(res.body.errors).toBeUndefined();
      const todos = res.body.data.todos;
      expect(todos).toHaveLength(1);

      const todo = todos[0];
      expect(typeof todo.id).toBe('string');
      expect(typeof todo.title).toBe('string');
      expect(typeof todo.completed).toBe('boolean');
      // GraphQLではDateはISO8601文字列として返される
      expect(typeof todo.dueDate).toBe('string');
      expect(() => new Date(todo.dueDate)).not.toThrow();
    });
  });

  describe('タスクが 0 件の場合、空の配列が返る', () => {
    it('Todoが存在しない場合、空の配列を返すこと', async () => {
      const res = await request(app.getHttpServer())
        .post('/graphql')
        .send({ query })
        .expect(200);

      expect(res.body.errors).toBeUndefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data.todos).toBeDefined();
      expect(Array.isArray(res.body.data.todos)).toBe(true);
      expect(res.body.data.todos).toEqual([]);
    });
  });
});

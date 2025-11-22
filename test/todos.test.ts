// https://docs.nestjs.com/fundamentals/testing#end-to-end-testing
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { Todo } from 'src/tasks/models/todo.model';

describe('Todos', () => {
  let app: INestApplication;
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
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return all todos', async () => {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(res.body.errors).toBeUndefined();
    expect(res.body.data).toBeDefined();
    expect(res.body.data.todos).toBeDefined();
    expect(Array.isArray(res.body.data.todos)).toBe(true);
    res.body.data.todos.forEach((todo: any) => {
      expect(todo).toHaveProperty('id');
      expect(todo).toHaveProperty('title');
      expect(todo).toHaveProperty('dueDate');
      expect(todo).toHaveProperty('completed');
      expect(todo).toHaveProperty('description');
      expect(typeof todo.id).toBe('string');
      expect(typeof todo.title).toBe('string');
      expect(typeof todo.completed).toBe('boolean');
    });
  });
});

import { TodoEntity } from '../todo/entity/todo';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '',
  database: 'todo_app',
  schema: 'todo',
  entities: [TodoEntity],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

export default AppDataSource;

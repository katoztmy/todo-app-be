import { User } from '../tasks/entity/user';
import { Todo } from '../tasks/entity/todo';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '',
  database: 'todo_app',
  schema: 'todo',
  entities: [User, Todo],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

export default AppDataSource;

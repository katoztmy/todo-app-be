import { User } from '../infra/database/entity/user.entity';
import { Todo } from '../infra/database/entity/todo.entity';
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

import { User } from '../infra/database/entity/user.entity';
import { Todo } from '../infra/database/entity/todo.entity';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: 'postgres',
  password: '',
  database: 'todo_app',
  schema: 'todo',
  entities: [User, Todo],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  migrationsTableName: 'public.migrations',
  migrationsTransactionMode: 'each',
});

export default AppDataSource;

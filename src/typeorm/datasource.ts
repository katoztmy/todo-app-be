import { User } from '../tasks/entity/user';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: '',
  database: 'todo_app',
  schema: 'todo',
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

export default AppDataSource;

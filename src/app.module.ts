import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppService } from './app.service';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './tasks/entity/user';
import { TodoResolver } from './tasks/todo.resolver';
import { Todo } from './tasks/entity/todo';
import { TodoRepository } from './domain/todo/repository/taskRepository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '',
      database: 'todo_app',
      entities: [User, Todo],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Todo]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TodoResolver, TodoRepository],
})
export class AppModule {}

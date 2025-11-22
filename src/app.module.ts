import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppService } from './app.service';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infra/database/entity/user.entity';
import { Todo } from './infra/database/entity/todo.entity';
import { TodoResolver } from './presentation/graphql/todo/todo.resolver';
import { TodoRepository } from './infra/database/todo/todo.repository';

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

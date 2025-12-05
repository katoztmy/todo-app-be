import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppService } from './app.service';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo/entity/todo.entity';
import { TodoResolver } from './presentation/todo.resolver';
import { TodoRepository } from './infra/database/todo/todo.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5433'),
      username: 'postgres',
      password: '',
      database: 'todo_app',
      schema: 'todo',
      entities: [Todo],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Todo]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      csrfPrevention: false,
      introspection: true,
      playground: false,
      // Apollo Studio Sandboxを表示
      includeStacktraceInErrorResponses: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TodoResolver,
    TodoRepository,
    {
      provide: 'ITodoRepository',
      useClass: TodoRepository,
    },
  ],
})
export class AppModule {}

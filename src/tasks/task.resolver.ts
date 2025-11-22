import { Query, Resolver } from '@nestjs/graphql';
import { Task } from './models/task.model';

@Resolver(() => Task)
export class TaskResolver {
  @Query(() => [Task])
  tasks(): Task[] {
    return [];
  }
}

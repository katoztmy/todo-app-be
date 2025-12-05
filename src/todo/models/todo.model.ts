import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  dueDate?: Date;

  @Field()
  completed: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateTodoInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  dueDate?: Date;
}

@InputType()
export class UpdateTodoInput {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  dueDate?: Date;

  @Field({ nullable: true })
  completed?: boolean;
}

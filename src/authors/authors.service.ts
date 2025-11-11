import { Injectable } from '@nestjs/common';
import { Author } from './model/author.model';

@Injectable()
export class AuthorsService {
  async findOneById(id: number): Promise<Author> {
    // 一時的な実装
    return {
      id,
      firstName: 'John',
      lastName: 'Doe',
      posts: [],
    };
  }
}


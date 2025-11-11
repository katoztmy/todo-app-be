import { Injectable } from '@nestjs/common';
import { Post } from './models/post.model';

@Injectable()
export class PostsService {
  async findAll(filters?: { authorId?: number }): Promise<Post[]> {
    // 一時的な実装
    return [];
  }
}




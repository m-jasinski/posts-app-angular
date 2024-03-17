import { Injectable } from '@angular/core';
import { CommentDTO, PostDTO } from './dto/Posts.dto';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  async fetchPosts(length: number): Promise<PostDTO[]> {
    return fetch(
      `https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/?number=${length}`
    )
      .then((response) => response.json())
      .then((data) => {
        return data.posts;
      })
      .catch((error) => {
        return [];
      });
  }

  async fetchComment(id: number, howMany: number = 1): Promise<CommentDTO[]> {
    const response = await fetch(
      `https://public-api.wordpress.com/rest/v1/sites/${id}/comments?number=${howMany}`
    );
    const data = await response.json();
    return data.comments as CommentDTO[];
  }
}

import { Component, effect, inject } from '@angular/core';
import { PostDTO, CommentDTO } from '../../api/dto/Posts.dto';
import { PostsService } from '../../api/posts.service';
import { PostComponent } from '../../components/post/post.component';
import { PostService } from '../../components/post/post.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  postLength: number | null = 0;
  posts: PostDTO[] = [];
  isFetchBtnEnabled = true;
  howManyComments = 1;
  postsService: PostsService = inject(PostsService);

  constructor(private postService: PostService) {
    effect(() => {
      this.postLength = this.postService.getPostNumber();
      this.fetchData(this.postLength);
    });
  }

  async fetchData(length: number | null): Promise<void> {
    if (length === 0) {
      this.posts = [];
      return;
    }
    const response = await this.postsService.fetchPosts(this.postLength);

    this.posts = response ? response : [];
    this.isFetchBtnEnabled = true;
  }

  async fetchComents(): Promise<void> {
    this.isFetchBtnEnabled = false;
    for (let post of this.posts) {
      if (post.discussion.comment_count > 0) {
        const comments: CommentDTO[] = await this.postsService.fetchComment(
          post.ID,
          this.howManyComments
        );
        post.comments = comments;
        post = { ...post };
        this.posts = [...this.posts];
      }
    }
  }
}

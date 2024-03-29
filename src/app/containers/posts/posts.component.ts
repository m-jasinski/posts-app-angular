import { Component, Input, OnInit, inject } from '@angular/core';
import { PostDTO, CommentDTO } from '../../api/dto/Posts.dto';
import { PostsService } from '../../api/posts.service';
import { PostComponent } from '../../components/post/post.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
  providers: [PostsService],
})
export class PostsComponent implements OnInit {
  @Input() set howManyPosts(data: number) {
    this.postLenth = data;
    this.fetchData(this.postLenth);
  }
  postLenth: number = 0;
  posts: PostDTO[] = [];
  isFetchBtnEnabled = true;
  howManyComments = 1;
  postsService: PostsService = inject(PostsService);

  ngOnInit(): void {
    this.fetchData(this.postLenth);
  }

  async fetchData(length: number): Promise<void> {
    if (length === 0) {
      this.posts = [];
      return;
    }
    const response = await this.postsService.fetchPosts(length);

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

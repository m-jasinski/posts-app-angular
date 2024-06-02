import { Component, Input } from '@angular/core';
import { PostDTO } from '../../api/dto/Posts.dto';
import { NgOptimizedImage } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NgOptimizedImage, CommentComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  @Input() post!: PostDTO;
  @Input() showComments: boolean = false;
}

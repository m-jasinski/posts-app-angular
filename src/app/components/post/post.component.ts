import { Component, Input } from '@angular/core';
import { PostDTO } from '../../api/dto/Posts.dto';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  @Input() post!: PostDTO;
}

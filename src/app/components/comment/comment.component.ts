import { Component, Input } from '@angular/core';
import { CommentDTO } from '../../api/dto/Posts.dto';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  @Input() comment!: CommentDTO;
}

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../post/post.service';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.css',
})
export class PostInputComponent implements OnInit {
  postsLengthControl = this.fb.control(0, [
    Validators.required,
    Validators.min(1),
    Validators.max(20),
  ]);

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit(): void {
    this.postsLengthControl.setValue(this.postService.getPostNumber());
    this.postsLengthControl.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((value) => this.postService.setPostNumber(value));
  }
}

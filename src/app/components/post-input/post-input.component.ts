import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostService } from '../post/post.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

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
  @ViewChild('el', { static: true }) inputEl: any;

  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit(): void {
    this.postsLengthControl.setValue(this.postService.getPostNumber());
    this.inputEl.nativeElement.style.setProperty(
      '--value',
      '' + this.postService.getPostNumber()
    );
    this.postsLengthControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        this.inputEl.nativeElement.style.setProperty('--value', '' + value);
        // this.postService.setPostNumber(value);
      });
  }

  setPostLength(): void {
    this.postService.setPostNumber(this.postsLengthControl.value);
  }
}

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Subscription,
  debounce,
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.css',
})
export class PostInputComponent implements OnInit, OnDestroy {
  @Input() howManyPosts!: number;
  @Output() changeNumberPostEvent = new EventEmitter<number>(false);
  postsLengthControl = this.fb.control(0, [
    Validators.required,
    Validators.min(0),
    Validators.max(20),
  ]);

  subs$ = new Subscription();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.postsLengthControl.setValue(this.howManyPosts);
    this.subs$ = this.postsLengthControl.valueChanges
      .pipe(
        map((val) => this.validateInput(val)),
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe((value) =>
        this.changeNumberPostEvent.emit(!!value ? value : 0)
      );
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }

  validateInput(value: number | null): number {
    if (!value || value < 1) {
      this.postsLengthControl.patchValue(0);
      return 0;
    }
    if (value > 20) {
      this.postsLengthControl.patchValue(20);
      return 20;
    }
    return value;
  }

  submit(event: Event): void {
    event.preventDefault();
  }
}

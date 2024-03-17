import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostInputComponent } from './components/post-input/post-input.component';
import { PostsComponent } from './containers/posts/posts.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PostInputComponent, PostsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  howManyPosts = 3;

  updatePostNumber(value: number): void {
    this.howManyPosts = value;
  }
}

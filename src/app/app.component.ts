import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostInputComponent } from './components/post-input/post-input.component';
import { PostsComponent } from './containers/posts/posts.component';
import { PostService } from './components/post/post.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PostInputComponent, PostsComponent],
  providers: [PostService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}

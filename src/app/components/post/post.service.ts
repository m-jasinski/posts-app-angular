import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private howManyPosts: WritableSignal<number | null> = signal(3);

  getPostNumber(): number | null {
    return this.howManyPosts();
  }

  setPostNumber(num: number | null): void {
    this.howManyPosts.set(num);
  }
}

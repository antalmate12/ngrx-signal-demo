import { Component, inject } from '@angular/core';
import { PostsStore } from '../../../shared/store/posts/posts.store';
import { PostsService } from '../../../shared/store/posts/posts.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [PostsStore, PostsService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  readonly store = inject(PostsStore);

  addPostForm = new FormGroup({
    title: new FormControl<string>('my title', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    body: new FormControl<string>('my body', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    userId: new FormControl<number>(1, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor() {
    this.store.loadPosts();
  }

  onSubmit = (): void => {
    this.store.addPost(this.addPostForm.getRawValue());
  }
}

import { Component, effect, inject } from '@angular/core';
import { BooksStore } from '../../../shared/store/books.store';
import { getState } from '@ngrx/signals';
import { BooksService } from '../../../shared/store/books.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [],
  providers: [BooksStore, BooksService, JsonPipe],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {
  readonly store = inject(BooksStore);

  constructor() {
    effect(() => {
      // 👇 The effect will be re-executed whenever the state changes.
      const state = getState(this.store);
      console.log('books state changed', state);
    });

    effect(() => {
      // 👇 The effect will be re-executed whenever the store is initialized.
      this.store.loadByQuery('angular');
      console.log('books loading...');
    });
  }
}

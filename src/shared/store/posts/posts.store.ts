import { computed, inject } from '@angular/core';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { PostsService } from './posts.service';
import { Post } from './post';

type PostsState = {
  posts: Post[];
  isLoading: boolean;
  // filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  // filter: { query: '', order: 'asc' },
};

// It's kinda cool AF
export const PostsStore = signalStore(
  withState(initialState),
  withComputed(({ posts }) => ({
    postsCount: computed(() => posts().length),
  })),
  withMethods((store, postsService = inject(PostsService)) => ({
    loadPosts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return postsService.getAll().pipe(
            tapResponse({
              next: (posts) => patchState(store, { posts: posts }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            }),
          );
        }),
      ),
    ),
    addPost: rxMethod<Partial<Post>>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((post) => {
          return postsService.add(post).pipe(
            tapResponse({
              next: (post) =>
                patchState(store, { posts: [post, ...store.posts()] }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            }),
          );
        }),
      ),
    ),
    // updateQuery(query: string): void {
    //   patchState(store, (state) => ({ filter: { ...state.filter, query } }));
    // },
    // updateOrder(order: 'asc' | 'desc'): void {
    //   patchState(store, (state) => ({ filter: { ...state.filter, order } }));
    // },
    //   loadByQuery: rxMethod<string>(
    //     pipe(
    //       debounceTime(300),
    //       distinctUntilChanged(),
    //       tap(() => patchState(store, { isLoading: true })),
    //       switchMap((query) => {
    //         return postsService.getByQuery(query).pipe(
    //           tapResponse({
    //             next: (posts) => patchState(store, { posts: posts.items }),
    //             error: console.error,
    //             finalize: () => patchState(store, { isLoading: false }),
    //           })
    //         );
    //       })
    //     )
    //   ),
  })),
);

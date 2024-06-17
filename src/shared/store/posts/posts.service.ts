import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Post } from './post';
import { CrudService } from '../../services/crud.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService extends CrudService<Post> {
  constructor() {
    super('posts', inject(HttpClient));
  }
}

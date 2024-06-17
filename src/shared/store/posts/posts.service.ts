import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Post } from "./post";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  private http = inject(HttpClient)

  getPosts() {
    return this.http.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
  }

  addPost(post: Partial<Post>) {
    return this.http.post<Post>("https://jsonplaceholder.typicode.com/posts", post);
  }
}

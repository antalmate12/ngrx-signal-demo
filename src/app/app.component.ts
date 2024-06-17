import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BooksComponent } from "./components/books/books.component";
import { PostsComponent } from "./components/posts/posts.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, BooksComponent, PostsComponent]
})
export class AppComponent {
  title = 'ngrx-signal-demo';
}

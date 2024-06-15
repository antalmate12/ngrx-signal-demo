import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadBookResponse } from './book';

@Injectable()
export class BooksService {
  constructor(private http: HttpClient) {}

  getByQuery(query: string): Observable<LoadBookResponse> {
    return this.http.get<LoadBookResponse>(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`,
    );
  }
}

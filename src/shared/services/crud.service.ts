import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CrudService<T> {
  constructor(
    @Inject('entityName') private entityName: string,
    private http: HttpClient,
  ) {}

  getAll = (): Observable<T[]> => {
    return this.http.get<T[]>(
      `https://jsonplaceholder.typicode.com/${this.entityName}`,
    );
  };

  get = (id: number): Observable<T> => {
    return this.http.get<T>(
      `https://jsonplaceholder.typicode.com/${this.entityName}/${id}`,
    );
  };

  add = (item: Partial<T>): Observable<T> => {
    return this.http.post<T>(
      `https://jsonplaceholder.typicode.com/${this.entityName}`,
      item,
    );
  };

  update = (id: number, item: Partial<T>): Observable<T> => {
    return this.http.put<T>(
      `https://jsonplaceholder.typicode.com/${this.entityName}/${id}`,
      item,
    );
  };

  delete = (id: number): Observable<T> => {
    return this.http.delete<T>(
      `https://jsonplaceholder.typicode.com/${this.entityName}/${id}`,
    );
  }
}

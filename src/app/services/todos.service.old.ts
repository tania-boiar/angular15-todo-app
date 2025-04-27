import { Injectable } from '@angular/core';
import { Todo } from '../types/todo';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

const USER_ID = '0003';
const API_URL = 'https://mate.academy/students-api/';

@Injectable({
  providedIn: 'root'
})

export class TodosService {
  refresh$$ = new BehaviorSubject(null);

  todos$ = this.refresh$$.pipe(
    switchMap(() => this.getTodos()),
  )

  constructor(
    private http: HttpClient,
  ) {}

  getTodos() {
    return this.http.get<Todo[]>(`${API_URL}/todos?userId=${USER_ID}`);
  }

  createTodo(title: string) {
    return this.http.post<Todo>(`${API_URL}/todos`, {
      title,
      userId: USER_ID,
      completed: false,
    })
    .pipe(
      tap(() => this.refresh$$.next(null))
    )
  }

  updateTodo(todo: Todo) {
    return this.http.patch<Todo>(`${API_URL}/todos/${todo.id}`, todo)
    .pipe(
      tap(() => this.refresh$$.next(null))
    )
  }

  deleteTodo(todo: Todo) {
    return this.http.delete<Todo>(`${API_URL}/todos/${todo.id}`)
    .pipe(
      tap(() => this.refresh$$.next(null))
    )
  }
}

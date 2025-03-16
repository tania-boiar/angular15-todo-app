import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Todo } from './types/todo';

const todosFromServer = [
  { id: 1, title: 'Body keeps the score', completed: true},
  { id: 2, title: 'Foundation', completed: true},
  { id: 3, title: 'Klara and the Sun', completed: true},
  { id: 4, title: 'Lessons in Chemistry', completed: false},
  { id: 5, title: 'The Language of War', completed: false},
  { id: 6, title: 'New Dark Ages. Book 1. Colony', completed: false},
  { id: 7, title: 'The Bell Jar', completed: false},
  { id: 8, title: 'The Culture Map', completed: false},
  { id: 9, title: 'The Road To Unfreedom', completed: false}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  _todos: Todo[] = [];
  activeTodos: Todo[] = [];

  get todos() {
    return this._todos;
  }

  set todos(todos: Todo[]) {
    if (todos === this._todos) {
      return;
    }

    this._todos = todos;
    this.activeTodos = this._todos.filter(todo => !todo.completed);
  }

  constructor() {}

  ngOnInit(): void {
    this.todos = todosFromServer;
  }

  trackById(i: number, todo: Todo) {}

  addTodo(newTitle: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title: newTitle,
      completed: false,
    }

    this.todos = [...this.todos, newTodo];
  }

  toggleTodo(todoId: number) {
    this.todos = this.todos.map(todo => {
      if (todo.id !== todoId) {
        return todo;
      }
      return { ...todo, completed: !todo.completed }
    })
  }

  renameTodo(todoId: number, newTitle: string) {
    this.todos = this.todos.map(todo => {
      if (todo.id !== todoId) {
        return todo;
      }
      return {
        ...todo,
        title: newTitle
      }
    })
  }

  deleteTodo(todoId: number) {
    this.todos = this.todos.filter(todo => todo.id !== todoId) 
  }
}

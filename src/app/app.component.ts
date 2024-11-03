import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo } from './types/todo';

const todos = [
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
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todos = todos;
  todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(2),
      ],
    }),
  });
 
  get title() {
    return this.todoForm.get('title') as FormControl;
  }

  get activeTodos() {
    return this.todos.filter(todo => !todo.completed)
  }

  addTodo() {
    if(this.todoForm.invalid) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: this.title.value,
      completed: false,
    }

    this.todos.push(newTodo);
    this.todoForm.reset();
  }
}

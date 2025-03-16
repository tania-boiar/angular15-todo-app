import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  @Output() save = new EventEmitter<string>();

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

  handleFormSubmit() {
    if(this.todoForm.invalid) {
      return;
    }

    this.save.emit(this.title.value);
    this.todoForm.reset();
  }
}

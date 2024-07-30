
// src/app/add-todo.component.ts
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { TodoService, Todo } from '@myworkspace/shared-data';



@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
})
export class AddTodoComponent implements OnChanges {
  @Input() todoToEdit?: Todo;
  @Output() update = new EventEmitter<void>();
  title = '';
  priority: number | null = null;
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnChanges() {
    if (this.todoToEdit) {
      this.title = this.todoToEdit.title;
      this.priority = this.todoToEdit.priority;
    }
  }

   addOrUpdateTodo() {
    if (this.todoToEdit) {
      const updatedTodo: Todo = {
        ...this.todoToEdit,
        title: this.title,
        priority: this.priority || 1,
      };
      this.todoService.updateTodo(updatedTodo).subscribe(() => {
        this.resetForm();
        this.update.emit();
      });
    } else {
      this.todoService.addTodo(this.title, this.priority || 1).subscribe(() => {
        this.resetForm();
        this.update.emit();
      });
    }
  }

  resetForm() {
    this.title = '';
    this.priority = null;
    this.todoToEdit = undefined;
  }
}

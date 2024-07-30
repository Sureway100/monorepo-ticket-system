
import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from '@myworkspace/shared-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  todoToEdit?: Todo;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  onEditTodoEvent(todo: Todo) {
    this.todoToEdit = todo;
  }

  refreshTodos() {
    this.loadTodos();
  }
}


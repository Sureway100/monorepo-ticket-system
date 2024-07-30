


// src/app/delete-todo.component.ts
import { Component, EventEmitter, Input, Output , OnInit} from '@angular/core';
import { TodoService, Todo } from '@myworkspace/shared-data';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.css']
})
export class DeleteTodoComponent implements OnInit{
  @Input() todos: Todo[] = [];
  @Output() editTodoEvent = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<void>();

    constructor(private todoService: TodoService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }
 

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.delete.emit();
    });
  }

  editTodo(todo: Todo) {
    this.editTodoEvent.emit(todo);
  }

  formatDate(dateString: string): string | null {
    return this.datePipe.transform(dateString, 'M/d/yyyy, h:mm:ss a');
  }
}

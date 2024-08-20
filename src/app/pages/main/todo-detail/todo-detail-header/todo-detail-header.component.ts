import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../todo-list/model/todo.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoDeleteModalComponent } from '../../todo-list/todo-delete-modal/todo-delete-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-detail-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './todo-detail-header.component.html',
  styleUrl: './todo-detail-header.component.scss',
})
export class TodoDetailHeaderComponent {
  @Input() todo: Todo | undefined;
  @Input() isEditMode!: boolean;

  @Output() saveTodo: EventEmitter<void> = new EventEmitter();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog
  ) {}

  navigateBack() {
    this.router.navigate(['main']);
  }

  closeEditMode() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { editmode: null },
    });
  }

  openEditMode() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { editmode: true },
    });
  }

  deleteTodo() {
    if (!this.todo) return;

    const dialog = this.matDialog.open(TodoDeleteModalComponent, {
      data: { todo: this.todo },
      width: '500px',
    });

    dialog.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.router.navigate(['main']);
      }
    });
  }

  updateTodo() {
    this.saveTodo.emit();
  }
}

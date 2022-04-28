import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
})
export class ListTaskComponent implements OnInit {
  listTask: Array<any>;

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.listTask = [];
  }

  ngOnInit() {
    this.taskService.getTasks().subscribe({
      next: (v) => {
        this.listTask = v;
      },
      error: (e) => console.log(e),
    });
  }

  changeStatus(selectTask: any, status: any) {
    const temporalStatus = selectTask.status;
    selectTask.status = status;
    this.taskService.editTask(selectTask).subscribe({
      next: (v) => {
        selectTask.status = status;
      },
      error: (e) => {
        console.log(e);
        selectTask.status = temporalStatus;
        if (e instanceof HttpErrorResponse) {
          if (e.status === 401) {
            this.snackBar.open('No estas logeado... Enviando a Login', 'X', {
              duration: 2000,
            });
            this.router.navigate(['/login']);
          }
        }
      },
    });
  }
  delete(deleteTask: any) {
    this.taskService.deleteTask(deleteTask).subscribe({
      next: (v) => {
        const index = this.listTask.indexOf(deleteTask);// 
        if (index > -1) {
          this.listTask.splice(index, 1);
          this.snackBar.open('Tarea Borrada', 'X', {
            duration: 2000,
          });
        }
      },
      error: (e) => {
        if (e instanceof HttpErrorResponse) {
          if (e.status === 401) {
            this.snackBar.open('No estas logeado', 'X', {
              duration: 2000,
            });
            this.router.navigate(['/login']);
          }
        }
      },
    });
  }
}

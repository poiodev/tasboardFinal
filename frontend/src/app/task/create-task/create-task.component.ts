import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  createTask: any;
  selectedFile: any;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.createTask = {}; //name, description y status
    this.selectedFile = null; // 
  }

  ngOnInit() {}

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  createUploadImage() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    fd.append('name', this.createTask.name);
    fd.append('description', this.createTask.description);
    this.taskService.createImageUpload(fd).subscribe({
      next: (v) => {
        this.router.navigate(['/tasks']);
      },
      error: (e) => {
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

  create() {
    this.taskService.createTask(this.createTask).subscribe({
      next: (v) => {
        this.router.navigate(['/tasks']);
      },
      error: (e) => {
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
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TaskService } from '../task.service'

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskForm: FormGroup;
  taskId: number;

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    ) { }

  ngOnInit() {
    if (!this.authService.isSignin()) {
      this.router.navigate(['auth']);
    }

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.taskForm = this.fb.group({
        text: [params['text'], [Validators.required, Validators.minLength(6), Validators.maxLength(200)]],
        status: [null]
      });
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      this.taskId = params['id'];
    });
  }

  editTask() {
    if (this.taskForm.invalid) {
      return;
    }
    let status = this.taskForm.value.status ? 10 : 0;
    
    let task = {
      text: this.taskForm.value.text,
      status: status
    }


    this.taskService.update(task,this.taskId);

  }

}

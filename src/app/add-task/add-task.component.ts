import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TaskService } from '../task.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  taskForm: FormGroup;
  submit: boolean = false;
  resizedImage:any = null;
  resizedImageTrusted: SafeUrl = null;

  constructor(private router:Router, private fb: FormBuilder, private taskService: TaskService, private ng2ImgToolsService: Ng2ImgToolsService, private sanitizer: DomSanitizer, ) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(200)]],
      email: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(200)]],
      text: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(200)]]
    });
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    if (!(/\.(gif|jpg|png)$/i).test(file.name)) {
      alert('invalid format');
      return;
    }

    if (this.resizedImage !== null) {
      window.URL.revokeObjectURL(this.resizedImage);
    }

    this.resizeImage(file);
  }

  private resizeImage(file: File) {
    this.ng2ImgToolsService.resize([file], 320, 240).subscribe(result => {
      this.resizedImage = result;
      this.resizedImageTrusted = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(result));
    });
  }

  addTask() {
    this.submit = true;

    if(this.taskForm.invalid || !this.resizedImage){
      return;
    }

    let task = this.taskForm.value;
    task.image =  this.resizedImage;
    this.taskService.create(task).then(()=>{
      this.router.navigate(['']);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TaskService } from '../task.service'
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  submit: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]]
    });
  }

  signin() {
    this.submit = true;
    if(this.loginForm.invalid){
      return;
    }

    if(this.authService.signin(this.loginForm.value)){
      this.router.navigate(['']);
    }else{
      alert('Неверный логин или пароль');
    };
  }

}

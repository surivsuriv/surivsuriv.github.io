import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private router:Router) { }

  signin(data) {
    if (data.login === 'admin' && data.password === '123') {
      localStorage.setItem('login', 'admin');
      localStorage.setItem('password', '123');
      return true;
    } else {
      return false;
    }
  }

  isSignin() {
    let login = localStorage.getItem('login');
    let password = localStorage.getItem('password');

    if (login === 'admin' && password === '123') {
      return true;
    } else {
      return false;
    }
  }

  signout() {
    localStorage.setItem('login', '');
    localStorage.setItem('password', '');
    this.router.navigate(['']);
  }

}

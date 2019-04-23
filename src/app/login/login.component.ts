import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  errorMsg: string;

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.email, this.password)
    .catch(error => this.errorMsg = error.message);
  }

  ngOnInit() {
  }

}

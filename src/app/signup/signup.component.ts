import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  displayName: string;
  password: string;
  email: string;
  errorMsg: string;

  constructor(private general:GeneralService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signUp() {
    let email = this.email;
    let password = this.password;
    let displayName = this.displayName;
    this.authService.signUp(email, password, displayName)
      .then(resolve => {
        if (resolve) {
          this.router.navigate(['home'])
        }
        else {
          this.errorMsg = (this.authService.errorMsg === undefined || this.authService.errorMsg === "") ? "Unknown Error Occured" : this.authService.errorMsg;
        }
      });
  }
}

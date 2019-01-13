import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

// need this for the recaptcha
export interface FormModel {
  captcha?: string;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginError: boolean = false;
  showResetForm: boolean = false;
  resetEmailSent: boolean = false;
  working: boolean = false;
  public formModel: FormModel = {};
  public resetEmail:string = '';
  
  constructor(
    private userService: UserService, 
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  OnSubmit(email, password) {
    this.userService.userAuthentication(email, password).subscribe((data: any) => {
      localStorage.setItem('_token', data.token);
      this.toastr.success('Login Successful', 'Welcome ' + data.user.name, {
        timeOut: 2000,
      });
      this.router.navigate(['/dashboard/content/courses']);
    },(err : HttpErrorResponse) => {
      this.toastr.error('Please try again', 'Login Failed', {
        timeOut: 3000,
      });
    });
  }

  SendResetRequest(email) {
    if(!email) return;
    this.working = true;
    this.userService.Forgot(email).subscribe(
      (resp: any) => {
        this.resetEmailSent = true;
        this.working = false;
      },
      (err: HttpErrorResponse) => {
        alert("Error");
        console.error(err);
        this.working = false;
      }
    );
  }

}

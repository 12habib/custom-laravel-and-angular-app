import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UrlsService } from '../../shared/urls.service';
import { UserService } from '../../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';

// need this for the recaptcha
export interface FormModel {
  captcha?: string;
}

@Component({
  selector: 'app-do-password-reset',
  templateUrl: './do-password-reset.component.html',
  styleUrls: ['./do-password-reset.component.scss']
})
export class DoPasswordResetComponent implements OnInit {
  public submittingForm = false;
  public token: string;
  public resetSuccess: boolean = false;
  public formModel: FormModel = {};

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private urlSvc: UrlsService,
    private userSvc: UserService
  ) { 
    this.activeRoute.params.subscribe(data => {
      this.token = data.token;
    });
  }

  ngOnInit() {
  }


  SendResetInformation(email, pw1, pw2) {
    if (!email) {
      alert("Please enter the email");
      return;
    }
    if (pw1 != pw2) {
      alert("The passwords do not match");
      return;
    }

    let token = this.token;

    this.submittingForm = true;
    this.userSvc.DoPWReset({ email, pw1, pw2, token }).subscribe(
      (resp: any) => {
        this.submittingForm = false;
        this.resetSuccess = true;
        const that = this;
        setTimeout(() => {
          that.router.navigateByUrl("/login");
        }, 1000);
      },
      (err: HttpErrorResponse) => {
        alert("Error resetting your password.");
        this.submittingForm = false;
      }
    );
  }

  // eof
}

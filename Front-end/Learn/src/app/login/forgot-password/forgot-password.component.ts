import { Component, OnInit } from "@angular/core";
import { UrlServiceService } from "src/app/shared/urlservice/url-service.service";
import { LoginTokenService } from "src/app/shared/loginToken/login-token.service";
import { Router } from "@angular/router";
import { LoginService } from "src/app/shared/login/login.service";
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from "@angular/common/http";

// need this for the recaptcha
export interface FormModel {
  captcha?: string;
}

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit {
  public signupUrl: string;
  public formModel: FormModel = {}; // need this for the recaptcha
  public submittingForm = false;
  public emailSent: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private logintoken: LoginTokenService,
    private urlSvc: UrlServiceService,
    private toastr:ToastrService
  ) {
    this.signupUrl = urlSvc.signupUrl;
  }

  ngOnInit() {
    this.logintoken.LoadComplete(false);
    this.logintoken.checkToken();
    if ((this, this.logintoken.isToken === true)) {
      this.router.navigate(["/lessons"]);
    }
  }

  SendResetRequest(email) {
    this.submittingForm = true;
    this.loginService.Forgot(email).subscribe(
      (resp: any) => {
        this.emailSent = true;
        this.submittingForm = false;
      },
      (err: HttpErrorResponse) => {
        this.toastr.error("Email does not exist");
        console.error(err);
        this.submittingForm = false;
      }
    );
  }

  // eof
}

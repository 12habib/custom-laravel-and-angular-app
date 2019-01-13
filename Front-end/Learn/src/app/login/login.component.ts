import { Component, OnInit } from "@angular/core";
import { LoginService } from "../shared/login/login.service";
import { HttpErrorResponse } from "../../../node_modules/@angular/common/http";
import { Router } from "../../../node_modules/@angular/router";
import { LoginTokenService } from "../shared/loginToken/login-token.service";
import { UrlServiceService } from "../shared/urlservice/url-service.service";

// need this for the recaptcha
export interface FormModel {
  captcha?: string;
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  submittingForm: boolean = false;
  user: any = {};
  public signupUrl: string;
  public formModel: FormModel = {}; // need this for the recaptcha

  constructor(
    private loginService: LoginService,
    private router: Router,
    private logintoken: LoginTokenService,
    private urlSvc: UrlServiceService
  ) {
    this.user.email = "";
    this.user.password = "";
    this.signupUrl = urlSvc.signupUrl;
  }

  ngOnInit() {
    this.logintoken.LoadComplete(false);
    this.logintoken.checkToken();
    if ((this, this.logintoken.isToken === true)) {
      this.router.navigate(["/lessons"]);
    }
  }

  Login(email, password) {
    this.submittingForm = true;
    this.loginService.Login(email, password).subscribe(
      (resp: any) => {
        localStorage.setItem("_token", resp.token);
        this.router.navigateByUrl("/lessons"); // TODO: for the demo, later set to dashboard
        this.logintoken.checkToken();
        this.logintoken.LoadComplete(true);
        this.logintoken.loggedInNow(true);
        this.submittingForm = false;
      },
      (err: HttpErrorResponse) => {
        alert("Error Logging in.");
        console.error(err);
        this.submittingForm = false;
      }
    );
  }
}

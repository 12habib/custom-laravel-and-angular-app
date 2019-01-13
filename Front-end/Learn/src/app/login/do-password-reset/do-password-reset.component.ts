import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/shared/login/login.service";
import { Router, ActivatedRoute } from "@angular/router";
import { LoginTokenService } from "src/app/shared/loginToken/login-token.service";
import { UrlServiceService } from "src/app/shared/urlservice/url-service.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: "app-do-password-reset",
  templateUrl: "./do-password-reset.component.html",
  styleUrls: ["./do-password-reset.component.scss"]
})
export class DoPasswordResetComponent implements OnInit {
  public signupUrl: string;
  public submittingForm = false;
  public token: string;
  public resetSuccess: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private logintoken: LoginTokenService,
    private urlSvc: UrlServiceService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.signupUrl = urlSvc.signupUrl;
    if ((this, this.logintoken.isToken === true)) {
      this.router.navigate(["/lessons"]);
    }
    this.activeRoute.params.subscribe(data => {
      this.token = data.token;
    });
  }

  ngOnInit() {
    this.logintoken.LoadComplete(false);
    this.logintoken.checkToken();
  }

  SendResetInformation(email, pw1, pw2) {
    if (!email) {
      this.toastr.error("Please enter the email");
      return;
    }
    if (pw1 != pw2) {
      this.toastr.error("The passwords do not match");
      return;
    }
    if (pw1.length<6 && pw2.length<6) {
      this.toastr.error("Password Must have 6 characters");
      return;
    }

    let token = this.token;

    this.submittingForm = true;
    this.loginService.DoPWReset({ email, pw1, pw2, token }).subscribe(
      (resp: any) => {
        this.submittingForm = false;
        this.resetSuccess = true;
        const that = this;
        setTimeout(() => {
          that.router.navigateByUrl("/login");
        }, 1000);
      },
      (err: HttpErrorResponse) => {
        this.toastr.error("You have entered Invalid Email or Url is invalid");
        this.submittingForm = false;
      }
    );
  }
}

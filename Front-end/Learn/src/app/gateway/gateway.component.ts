import { Component, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  Params,
  Router
} from "../../../node_modules/@angular/router";
import { LoginTokenService } from "../shared/loginToken/login-token.service";
import { HttpErrorResponse } from "../../../node_modules/@angular/common/http";

@Component({
  selector: "app-gateway",
  templateUrl: "./gateway.component.html",
  styleUrls: ["./gateway.component.scss"]
})
export class GatewayComponent implements OnInit {
  public token: string;
  public working: boolean = true;
  public isTokenValid: boolean = false;
  fullName: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private loginToken: LoginTokenService,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.token = params.token;
    });
    this.loginToken.LoadComplete(false);
  }

  ngOnInit() {
    this.ValidateToken();
  }

  ValidateToken() {
    if (this.token) {
      this.loginToken.ValidateToken(this.token).subscribe(
        (resp: any) => {
          // valid token
          localStorage.setItem("_token", resp.token);
          this.router.navigateByUrl("/lessons");
          this.working = false;
        },
        (err: HttpErrorResponse) => {
          // invalid token
          this.isTokenValid = false;
          this.working = false;
        }
      );
    }
  }

  // SaveName() {
  //   if(this.fullName && this.token && this.isTokenValid) {
  //     this.working = true;
  //     this.loginToken.SaveName(this.token, this.fullName).subscribe((resp: any) => {
  //       localStorage.setItem('_token', resp.token);
  //       this.router.navigateByUrl('/profile');
  //       this.working = false;
  //     }, (err: HttpErrorResponse) => {
  //       console.error(err);
  //       this.working = false;
  //     });
  //   }
  // }

  // eof
}

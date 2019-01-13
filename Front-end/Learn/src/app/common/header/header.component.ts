import { Component } from "@angular/core";
// For MDB Angular Free
import { NavbarModule, WavesModule } from "angular-bootstrap-md";
import * as $ from "jquery";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { LoginTokenService } from "../../shared/loginToken/login-token.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.scss"]
})
export class HeaderComponent {
  isTokenValid: boolean;
  loading = true;

  constructor(
    private logintoken: LoginTokenService,
    private router: Router,
    private toaster: ToastrService
  ) {
    this.logintoken.TokenChange.subscribe(value => (this.isTokenValid = value));
    this.logintoken.Loaded.subscribe(value => (this.loading = value));
  }

  logOut() {
    this.logintoken.logout();
    this.isTokenValid = this.logintoken.isToken;
    this.router.navigate(["/login"]);

    this.toaster.success("You are logged out!");
  }

  public ngOnInit() {
    /* $("#menu-close").click(function (e) {
      e.preventDefault();
      $("#sidebar-wrapper").toggleClass("active");
      $("#overolly").toggleClass("overolly-active");
    }); */
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#sidebar-wrapper").toggleClass("active");
      $("#overolly").toggleClass("overolly-active");
    });
    $("#overolly").click(function(e) {
      e.preventDefault();
      $("#sidebar-wrapper").toggleClass("active");
      $("#overolly").toggleClass("overolly-active");
    });
    $("#sidebar-wrapper").click(function(e) {
      if (!$(e.target).hasClass("ext-link")) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
        $("#overolly").toggleClass("overolly-active");
      }
    });
  }
}

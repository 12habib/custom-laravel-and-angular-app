import { Component, OnInit } from "@angular/core";

import { EventEmitter } from "@angular/core";
import { UserService } from "../../shared/user/user.service";
import { HttpErrorResponse } from "../../../../node_modules/@angular/common/http";
import { Router } from "../../../../node_modules/@angular/router";
import { LoginTokenService } from "../../shared/loginToken/login-token.service";

@Component({
  selector: "app-profile",
  templateUrl: "./updateprofile.component.html",
  styleUrls: ["./updateprofile.component.scss"]
})
export class UpdateprofileComponent implements OnInit {
  user: any = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private logintoken: LoginTokenService
  ) {
    this.logintoken.LoadComplete(true);
  }

  ngOnInit() {
    this.GetCurrentUser();
  }

  GetCurrentUser() {
    this.userService.CurrentUser().subscribe(
      (resp: any) => {
        this.user = resp;
        this.logintoken.LoadComplete(false);
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this.logintoken.LoadComplete(false);
      }
    );
  }

  ProcessUploadedPhoto(event) {
    let file = event.target.files[0];
    let self = this;

    if (file.size > 200 * 1024) {
      alert("Please select a file less than 200KB");
      return;
    }

    let reader = new FileReader();

    reader.onload = event => {
      let target: any = event.target;
      self.user.profile_picture = target.result;
    };

    reader.readAsDataURL(file);
  }

  UpdateProfile() {
    var data: any = {};
    data.id = this.user.id;
    data.name = this.user.name;
    data.profile_picture = this.user.profile_picture;
    if (this.user.password) {
      if (this.user.password != this.user.password_confirmation) {
        alert("Please make sure the passwords match"); // TODO: change to toast.
      } else {
        data.password = this.user.password;
        data.password_confirmation = this.user.password_confirmation;
      }
    }

    this.logintoken.LoadComplete(true);
    this.userService.Update(data).subscribe(
      (resp: any) => {
        this.logintoken.LoadComplete(false);
        this.router.navigateByUrl("/profile");
      },
      (err: HttpErrorResponse) => {
        alert("Error updating profile"); // TODO: Change to toast
        console.error(err);

        this.logintoken.LoadComplete(false);
      }
    );
  }
}

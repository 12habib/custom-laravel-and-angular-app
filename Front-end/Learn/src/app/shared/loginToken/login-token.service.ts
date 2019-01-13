import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders
} from "../../../../node_modules/@angular/common/http";
import { UrlServiceService } from "../urlservice/url-service.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoginTokenService {
  isToken: boolean;
  loading: boolean;
  loggedin: boolean;
  Loaded: Subject<boolean> = new Subject<boolean>();
  LoggedInNow: Subject<boolean> = new Subject<boolean>();
  TokenChange: Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient, private urlSvc: UrlServiceService) {
    this.TokenChange.subscribe(value => {
      this.isToken = value;
    });
    this.Loaded.subscribe(value => {
      this.loading = value;
    });
    this.LoggedInNow.subscribe(value => {
      this.loggedin = value;
    });
  }

  ValidateToken(token) {
    var reqHeader = new HttpHeaders({ "No-Auth": "True" });
    return this.http.post(
      this.urlSvc.apiUrl + "/token.validate",
      { token: token },
      { headers: reqHeader }
    );
  }

  SaveName(token, name) {
    var reqHeader = new HttpHeaders({ "No-Auth": "True" });
    return this.http.post(
      this.urlSvc.apiUrl + "/login.viaToken",
      { token: token, name: name },
      { headers: reqHeader }
    );
  }
  logout() {
    localStorage.removeItem("_token");
    this.TokenChange.next(false);
  }
  checkToken() {
    if (localStorage.getItem("_token") != null) {
      this.TokenChange.next(true);
    } else {
      this.TokenChange.next(false);
    }
  }
  LoadComplete(value) {
    this.Loaded.next(value);
  }
  loggedInNow(value) {
    this.LoggedInNow.next(value);
  }
}

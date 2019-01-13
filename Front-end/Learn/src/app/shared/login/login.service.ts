import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders
} from "../../../../node_modules/@angular/common/http";
import { UrlServiceService } from "../urlservice/url-service.service";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private urlService: UrlServiceService
  ) {}

  Login(email, password) {
    var reqHeader = new HttpHeaders({ "No-Auth": "True" });
    return this.http.post(
      this.urlService.apiUrl + "/login",
      { email, password },
      { headers: reqHeader }
    );
  }

  Forgot(email) {
    var reqHeader = new HttpHeaders({ "No-Auth": "True" });
    return this.http.post(
      this.urlService.pwResetURL,
      { email: email },
      { headers: reqHeader }
    );
  }

  DoPWReset({ email, pw1, pw2, token }) {
    var reqHeader = new HttpHeaders({ "No-Auth": "True" });
    return this.http.post(
      this.urlService.doPWResetURL,
      { email: email, password: pw1, password_confirmation: pw2, token: token },
      { headers: reqHeader }
    );
  }

  //EOF
}

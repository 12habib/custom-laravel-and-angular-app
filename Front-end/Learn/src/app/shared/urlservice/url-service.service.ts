// The odd naming is to make sure that the generic name that would have been otherwise is avoided.

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UrlServiceService {
  public apiRoot: string = "https://api.myedugami.com/api";
   //public apiRoot: string = "http://localhost:8000/api";
  public apiUrl: string = this.apiRoot + "/v1";
  public pwResetURL: string = this.apiRoot + "/user.forgotPassword";
  public doPWResetURL: string = this.apiRoot + "/user.doResetPw";

  public signupUrl = "https://myedugami.com/get-started";

  constructor() {}
}

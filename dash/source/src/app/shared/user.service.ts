import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { UrlsService } from './urls.service';

@Injectable()
export class UserService {
  readonly rootUrl = UrlsService.apiUrl;
  constructor(private http: HttpClient, private urlService: UrlsService) { }

  userAuthentication(userName, password): Observable<any> {
    var data = {
      'email' : userName, 
      'password' : password
    };
    var reqHeader = new HttpHeaders({ 'No-Auth':'True' });
    return this.http.post(this.rootUrl + '/login', data, { headers: reqHeader });
  }

  getUserInfo(): Observable<any> {
    return this.http.get(this.rootUrl + '/user');
  }

  Forgot(email): Observable<any> {
    var reqHeader = new HttpHeaders({ "No-Auth": "True" });
    return this.http.post(
      this.urlService.pwResetURL,
      { email: email },
      { headers: reqHeader }
    );
  }

  DoPWReset({ email, pw1, pw2, token }): Observable<any> {
    var reqHeader = new HttpHeaders({ "No-Auth": "True" });
    return this.http.post(
      this.urlService.doPWResetURL,
      { email: email, password: pw1, password_confirmation: pw2, token: token },
      { headers: reqHeader }
    );
  }

}

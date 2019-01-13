import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders
} from "../../../../node_modules/@angular/common/http";
import { UrlServiceService } from "../urlservice/url-service.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private http: HttpClient,
    private urlService: UrlServiceService
  ) {}

  CurrentUser(): Observable<any> {
    return this.http.get(this.urlService.apiUrl + "/user");
  }

  Update(user): Observable<any> {
    return this.http.post(this.urlService.apiUrl + "/user", user);
  }

  GetIntelProfile(): Observable<any> {
    return this.http.get(this.urlService.apiUrl + "/user.intel");
  }

  GetAllLevels(): Observable<any> {
    return this.http.get(this.urlService.apiUrl + "/levels.get");
  }

  ChangeLevel(level_id): Observable<any> {
    return this.http.post(this.urlService.apiUrl + "/levels.change", {
      level_id: level_id
    });
  }
}

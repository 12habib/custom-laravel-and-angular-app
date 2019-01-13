import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UrlsService } from "../urls.service";

@Injectable()
export class LanguageService {
  rootUrl: string = UrlsService.apiUrl;

  constructor(private http: HttpClient) {}

  getLanguages(): Observable<any> {
    return this.http.get(this.rootUrl + "/languages");
  }

  UpdateLanguage(lang): Observable<any> {
    return this.http.post(this.rootUrl + "/languages/" + lang.id, {
      name: lang.name,
      abbr: lang.abbr,
      _method: "PUT"
    });
  }

  StoreNewLanguage(lang): Observable<any> {
    return this.http.post(this.rootUrl + "/languages", lang);
  }

  DeleteLanguage(id): Observable<any> {
    return this.http.post(this.rootUrl + "/languages/" + id, {
      _method: "DELETE"
    });
  }
}

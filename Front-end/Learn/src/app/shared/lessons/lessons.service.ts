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
export class LessonsService {
  partData = null;

  constructor(
    private http: HttpClient,
    private urlService: UrlServiceService
  ) {}
  Lessons(): Observable<any> {
    return this.http.get(this.urlService.apiUrl + "/lessons.getLessonsForDemo");
  }
  LessonParts(lesson_id): Observable<any> {
    return this.http.post(this.urlService.apiUrl + "/lessons.getPartsForDemo", {
      lesson_id
    });
  }

  SaveProgress(data): Observable<any> {
    // console.log(data);
    return this.http.post(this.urlService.apiUrl + "/progress.save", data);
  }

  // EOF
}

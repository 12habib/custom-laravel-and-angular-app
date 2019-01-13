import { Injectable } from "@angular/core";
import { UrlsService } from "../urls.service";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CourseLevelService {
  rootUrl: string = UrlsService.apiUrl;

  constructor(private http: HttpClient) {}

  getCourseLevels(): Observable<any> {
    return this.http.get(this.rootUrl + "/course-levels");
  }

  UpdateCourseLevel(level): Observable<any> {
    level._method = "PUT";
    return this.http.post(this.rootUrl + "/course-levels/" + level.id, level);
  }

  StoreNewCourseLevel(newLevel): Observable<any> {
    return this.http.post(this.rootUrl + "/course-levels", newLevel);
  }

  DeleteCourseLevel(id): Observable<any> {
    return this.http.post(this.rootUrl + "/course-levels/" + id, {
      _method: "DELETE"
    });
  }

  SaveOrder(obj): Observable<any> {
    return this.http.post(this.rootUrl + "/course-levels/saveOrder", {
      order: obj
    });
  }
}

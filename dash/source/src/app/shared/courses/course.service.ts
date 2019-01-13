import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from '../urls.service';
import { Observable } from 'rxjs';

@Injectable()
export class CourseService {
  
  apiUrl: string = UrlsService.apiUrl;

  constructor(private http: HttpClient) {
  }

  GetCourses(): Observable<any> {
    return this.http.get(this.apiUrl + '/courses');
  }
  

  GetCourse(id) {
    return this.http.get(this.apiUrl + '/courses/' + id);
  }

  SaveCourse(model): Observable<any> {
    return this.http.post(this.apiUrl + '/courses/', model);
  }

  UpdateCoverPhoto( data: FormData ): Observable<any> {
    data.append('_method', 'PUT');
    return this.http.post(this.apiUrl + '/courses/updateCoverPhoto/' + data.get('id'), data);
  }

  RemoveCoverPhoto( id ): Observable<any> {
    return this.http.post(this.apiUrl + '/courses/removeCoverPhoto/' + id, {});
  }

  UpdateCourse(id, data): Observable<any> {
    data._method = 'PUT';
    return this.http.post(this.apiUrl + '/courses/' + id, data);
  } 

  DeleteCourse(id): Observable<any> {
    let data = { _method : 'DELETE' };
    return this.http.post(this.apiUrl + '/courses/' + id, data);
  } 

}
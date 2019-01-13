import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from '../urls.service';
import { Observable } from 'rxjs';

@Injectable()
export class LessonService {

  apiUrl = UrlsService.apiUrl;

  constructor(
    private http: HttpClient
  ) { 

  }

  GetLesson(id) : Observable<any> {
    return this.http.get(this.apiUrl + '/lessons/' + id);
  }

  SaveLesson(model): Observable<any> {
    return this.http.post(this.apiUrl + '/lessons', model);
  }

  UpdateLesson(id, data): Observable<any> {
    data._method = 'PUT';
    return this.http.post(this.apiUrl + '/lessons/' + id, data);
  } 

  DeleteLesson(id): Observable<any> {
    let data = { _method : 'DELETE' };
    return this.http.post(this.apiUrl + '/lessons/' + id, data);
  } 

  UpdateExerciseSorting(lesson_id, sorting): Observable<any> {
    return this.http.post(this.apiUrl + '/exercises/update_sorting', { lesson_id: lesson_id,  sorting: sorting});
  }


}

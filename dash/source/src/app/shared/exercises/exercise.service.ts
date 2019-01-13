import { Injectable } from '@angular/core';
import { UrlsService } from '../urls.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ExerciseService {

  rootUrl: string = UrlsService.apiUrl;

  constructor(private http: HttpClient) { }

  // Get ALL exercises
  getExercises(lesson_id): Observable<any> {
    return this.http.get(this.rootUrl + '/get_exercises/' + lesson_id);
  }
  
  // get a single exercise
  GetExercise(exercise_id): Observable<any> {
    return this.http.get(this.rootUrl + '/exercises/' + exercise_id);
  }

  UpdateExercise(intel): Observable<any> {
    return this.http.post(this.rootUrl + '/exercises/' + intel.id, { title: intel.newTitle, _method: 'PUT' });
  }

  StoreNewExercise(lesson_id): Observable<any> {
    let newIntel = {
      title: 'Exercise Title',
      lesson_id: lesson_id,
      public: false
    };
    return this.http.post(this.rootUrl + '/exercises', newIntel);
  }

  DeleteExercise(id): Observable<any> {
    return this.http.post(this.rootUrl + '/exercises/' + id, { _method: 'DELETE' });
  }

  UpdateExerciseStatus(id, status): Observable<any> {
    return this.http.post(this.rootUrl + '/exercises/update_status', { id: id,  status: status});
  }

  UpdateExerciseTitle(id, title): Observable<any> {
    return this.http.post(this.rootUrl + '/exercises/update_title', { id: id,  title: title});
  }

  


}

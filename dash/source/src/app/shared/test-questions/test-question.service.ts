import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from '../urls.service';
import { Observable } from 'rxjs';


@Injectable()
export class TestQuestionService {
  
  apiUrl = UrlsService.apiUrl;

  constructor( private http: HttpClient ) { }

  StoreNewQuestion(data): Observable<any> {
    return this.http.post( this.apiUrl + '/test-questions', data );
  }

  GetQuestions(): Observable<any> {
    return this.http.get(this.apiUrl + '/test-questions/');
  }

  UpdateQuestion(id, data): Observable<any> {
    data._method = 'PUT';
    return this.http.post(this.apiUrl + '/test-questions/' + id, data);
  }

  DeleteQuestion(id): Observable<any> {
    let data = { _method : 'DELETE' };
    return this.http.post(this.apiUrl + '/test-questions/' + id, data);
  }

}

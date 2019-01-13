import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlsService } from '../urls.service';

@Injectable()
export class CourseModuleService {

  apiUrl = UrlsService.apiUrl;

  constructor( private http: HttpClient ) { }

  StoreNewModule(data): Observable<any> {
    return this.http.post( this.apiUrl + '/modules', data );
  }

  GetModule(id): Observable<any> {
    return this.http.get(this.apiUrl + '/modules/' + id);
  }

  UpdateModule(id, data): Observable<any> {
    data._method = 'PUT';
    return this.http.post(this.apiUrl + '/modules/' + id, data);
  }

  DeleteModule(id): Observable<any> {
    let data = { _method : 'DELETE' };
    return this.http.post(this.apiUrl + '/modules/' + id, data);
  } 

}

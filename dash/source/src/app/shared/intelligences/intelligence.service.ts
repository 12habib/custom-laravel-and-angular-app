import { Injectable } from '@angular/core';
import { UrlsService } from '../urls.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class IntelligenceService {

  rootUrl: string = UrlsService.apiUrl;

  constructor(private http: HttpClient) { }

  getIntelligences(): Observable<any> {
    return this.http.get(this.rootUrl + '/intelligences');
  }

  UpdateIntelligence(intel): Observable<any> {
    return this.http.post(this.rootUrl + '/intelligences/' + intel.id, { title: intel.newTitle, _method: 'PUT' });
  }

  StoreNewIntelligence(newIntel): Observable<any> {
    return this.http.post(this.rootUrl + '/intelligences', newIntel);
  }

  DeleteIntelligence(id): Observable<any> {
    return this.http.post(this.rootUrl + '/intelligences/' + id, { _method: 'DELETE' });
  }

}

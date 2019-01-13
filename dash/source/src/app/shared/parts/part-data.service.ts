import { Injectable } from '@angular/core';
import { UrlsService } from '../urls.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PartDataService {
  
  rootUrl: string = UrlsService.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  GetPart(part_id) {
    return this.http.get(this.rootUrl + '/get_part/' + part_id);
  } 

  SavePart( data ) : Observable<any>{
    return this.http.post(this.rootUrl + '/save_part', data);
  }

  GetPartsByLesson(lesson_id) : Observable<any> {
    return this.http.post(this.rootUrl + '/get_parts_by_lesson/' + lesson_id, {});
  }


  DeletePart(id): Observable<any> {
    return this.http.post(this.rootUrl + '/delete_part', {id: id});
  }

  DuplicateContent(from_id, to_id) {
    return this.http.post(this.rootUrl + '/duplicate_content', {from_id: from_id, to_id: to_id});
  }

}

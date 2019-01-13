import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlServiceService } from '../urlservice/url-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadHelperService {
  private apiUrl: string;

  constructor(private http: HttpClient, private urlSvc: UrlServiceService) {
    this.apiUrl = urlSvc.apiUrl;
  }

  GetImagesResized(images): Observable<any> {
    return this.http.post(this.apiUrl + '/resize_photos', { images: images });
  }
}

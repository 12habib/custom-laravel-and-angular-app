import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { UserService } from '../user.service';
import { UrlsService } from '../urls.service';

@Injectable()
export class UsersService {

  readonly rootUrl = UrlsService.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UrlsService } from '../shared/urls.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public samplePagesCollapsed = true;
  userInfo: any;
  rootUrl: string = UrlsService.apiUrl;
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.http.get(this.rootUrl + '/user').subscribe((data: any) => {
      this.userInfo = data;
    });
  }

  isActive(link: string) {
    return this.router.isActive(link, true);
  }

}

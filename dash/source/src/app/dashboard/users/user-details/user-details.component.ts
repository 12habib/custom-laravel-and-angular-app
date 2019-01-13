import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UrlsService } from '../../../shared/urls.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  rootUrl = UrlsService.apiUrl + '/users';
  userId: number;
  userInfo: any;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService
  ) { 
    this.route.params.subscribe(res => {
      this.userId = res.id;
    });
  }

  ngOnInit() {
    this.http.get(this.rootUrl + '/view/' + this.userId).subscribe((data : any) => {
      this.userInfo = data.user;
    }, (err: HttpErrorResponse) => {
            
    });
  }

  Delete(id: number) {
    if(confirm("Are you sure? \nThis action cannot be undone.")) {
      this.http.post(this.rootUrl + '/delete/' + id, {}).subscribe(res => {
        this.router.navigateByUrl('/dashboard/users');
        this.toastr.success('The user has been deleted', 'Success');
      });
    }
    return false;
  }

}

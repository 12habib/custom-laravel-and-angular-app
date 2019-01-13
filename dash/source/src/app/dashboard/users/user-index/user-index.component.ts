import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../../../shared/urls.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../shared/user.model';
import { DataTablesResponse } from '../../../shared/users/users.model';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent implements OnInit {

  readonly rootUrl = UrlsService.apiUrl + '/users';
  dtOptions: DataTables.Settings = {};
  users: User[];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      language: {
        'emptyTable': 'Nothing available for display',
        'loadingRecords': 'Loading...',
        'processing':   'Working...',
        "zeroRecords":  "Nothing found",
      },
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            that.rootUrl,
            dataTablesParameters,
            {}
          ).subscribe(resp => {
            that.users = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        { data: 'id' },
        { data: 'name', searchable: true },
        { data: 'email', searchable: true },
        { data: 'user_type', searchable: true },
        { data: 'active', searchable: true },
        { data: 'id' }

      ]
    };
    
  }

  

}

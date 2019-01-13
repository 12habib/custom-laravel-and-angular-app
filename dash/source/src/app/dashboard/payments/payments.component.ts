import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../../shared/urls.service';
import { DataTablesResponse } from '../../shared/users/users.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  payments: any = [];
  readonly rootUrl = UrlsService.apiUrl + '/payments';
  dtOptions: DataTables.Settings = {};

  constructor(private http: HttpClient) { }

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
            that.payments = resp.data;
            that.payments.map((row, index) => {
              // the gateway_data property is json encoded. We have to decode it.
              row.gateway_data = $.parseJSON(row.gateway_data.replace(/&quot;/g, '"'));
              // so is the module
              row.module = $.parseJSON(row.module.replace(/&quot;/g, '"'));
              // and the user
              row.user = $.parseJSON(row.user.replace(/&quot;/g, '"'));

            });
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: []
            });
          });
      },
      columns: [
        { data: 'created_at' },
        { data: 'user', searchable: true },
        { data: 'amount', searchable: true },
        { data: 'gateway', searchable: true },
        { data: 'gateway_data', searchable: true },
        { data: 'module', searchable: true },
        // { data: 'created_at' },
      ]
    };
  }

}

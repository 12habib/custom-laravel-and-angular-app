import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { UrlsService } from '../../../shared/urls.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  rootUrl = UrlsService.apiUrl;
  userCreateForm: FormGroup;
  userInfo: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.userCreateForm = formBuilder.group({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      active: new FormControl('', Validators.required),
      user_type: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {

  }

  Save(userCreateForm) {
    if(userCreateForm.valid) {
      this.http.post(this.rootUrl + '/users/store', userCreateForm.value).subscribe((data : any) => {
        this.router.navigateByUrl('/dashboard/users/view/' + data.user.id);
        this.toastr.success('The user has been added', 'Success');
      }, (err: HttpErrorResponse) => {
        this.toastr.error('Check the inputs', 'Invalid input');
        // TODO: Error display in the form.
      });
    }
    else {
      this.toastr.error("Please check all form input", "Invalid Inputs");
    }
  }

}

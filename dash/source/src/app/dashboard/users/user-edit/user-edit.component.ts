import { Component, OnInit } from '@angular/core';
import { UrlsService } from '../../../shared/urls.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {


  rootUrl = UrlsService.apiUrl + '/users';
  userId: number;
  userUpdateForm: FormGroup;
  userInfo: any;


  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { 
    this.route.params.subscribe(res => {
      this.userId = res.id;
    });
    this.userUpdateForm = this.formBuilder.group({
      'name'      : new FormControl('', Validators.required),
      'email'     : new FormControl('', Validators.required),
      'password'  : new FormControl(''),
      'active'    : new FormControl('', Validators.required),
      'user_type' : new FormControl('', Validators.required)
    });    
    
  }

  ngOnInit() {
    this.http.get(this.rootUrl + '/view/' + this.userId).subscribe((data : any) => {
      this.userUpdateForm.controls['name'].setValue(data.user.name);
      this.userUpdateForm.controls['email'].setValue(data.user.email);
      this.userUpdateForm.controls['user_type'].setValue(data.user.user_type);
      this.userUpdateForm.controls['active'].setValue(data.user.active);

    }, (err: HttpErrorResponse) => {
            
    });

    
  }

  PostData(userUpdateForm) {
    
    if(!userUpdateForm.valid) {
      this.toastr.error('Please check all form inputs', 'Invalid Form Inputs');
    }
    else {
      this.http.post(this.rootUrl + '/update/' + this.userId, userUpdateForm.value)
          .subscribe((res : any) => {
            this.router.navigateByUrl('/dashboard/users/view/' + this.userId);
            this.toastr.success("The user has been updated", "Success");
          }, (err: HttpErrorResponse) => {
            this.toastr.error('Please check all form inputs', 'Invalid Form Inputs');
          });
    }

  }

}

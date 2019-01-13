import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UrlsService } from '../../../shared/urls.service';
import { IntelligenceService } from '../../../shared/intelligences/intelligence.service';
import { ToastrService } from 'ngx-toastr';
import { NewIntelModule } from './new-intel/new-intel.module';

@Component({
  selector: 'app-intelligences',
  templateUrl: './intelligences.component.html',
  styleUrls: ['./intelligences.component.scss']
})
export class IntelligencesComponent implements OnInit {
  
  intelligences: any =  [];
  working = true;
  rootUrl = UrlsService.apiUrl;
  newIntel: NewIntelModule = { title: '' };

  constructor(private http: HttpClient, private IntelSvs: IntelligenceService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getIntelligencs();
  }

  getIntelligencs() {
    this.working = true;
    this.IntelSvs.getIntelligences().subscribe((resp : any) => {
      resp.map((row, index) => {
        row.editing = false;
        row.newTitle = row.title;
        row.working = false;
      });
      this.intelligences = resp;
      this.working = false;
    }, (err: HttpErrorResponse) => {
      console.log('error fetching Intels:', err);
      this.working = false;
    });
  }

  UpdateIntelligence(intel) {
    intel.working = true;
    if(intel.title === '') {
      this.toastr.error('The title cannot be empty', 'Invalid Input');
      intel.working = false;
    }
    else {
      this.IntelSvs.UpdateIntelligence(intel).subscribe((resp : any) => {
        intel.title = resp.data.title;
        intel.editing = false;
        intel.working = false;
        this.toastr.success("The intelligence was updated.", "Success");
      }, (err: HttpErrorResponse) => {
        console.error(err);
        this.toastr.error("Sorry, there was an error processing your request. Please check your input and try again.", "Failed")
        intel.working = false;
      });
    }
  }

  AddIntelligence() {
    this.working = true;
    if(this.newIntel.title == '' || this.newIntel.title.length < 1) {
      this.toastr.error("Please provide a title for the intelligence.", "Invalid Input");
      this.working = false;
    }
    else {
      this.IntelSvs.StoreNewIntelligence(this.newIntel).subscribe((resp : any) => {
        resp.data.map((row, index) => {
          row.editing = false;
          row.newTitle = row.title;
          row.working = false;
          this.working = false;
          this.newIntel.title = '';
        });
        this.toastr.success("Please wait while the list reloads", "Success");
        this.intelligences = resp.data;
      }, (err : HttpErrorResponse) => {
        this.toastr.error("Please check the input", "Unable to store");
        this.working = false;
      });
    }
  }

  RemoveIntelligence(intel) {
    if(confirm('WARNING! \nAre you sure you want to do this? \nThis action cannote be undone.')) {
      intel.working = true;
      this.IntelSvs.DeleteIntelligence(intel.id).subscribe((resp : any)=> {
        this.intelligences.splice( this.intelligences.indexOf(intel), 1 );
        this.toastr.success('The item was removed.', 'Removed');
      }, (err: HttpErrorResponse)=> {
        this.toastr.error('There was a problem deleting the item. Please try again.', 'Error');
        intel.working = false;
        console.log(err);
      });

    }
  }

}

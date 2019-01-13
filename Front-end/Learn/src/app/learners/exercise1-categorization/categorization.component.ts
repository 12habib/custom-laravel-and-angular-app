import { Component, OnInit } from '@angular/core';
import { LessonsService } from '../../shared/lessons/lessons.service';
@Component({
  selector: 'app-categorization',
  templateUrl: './categorization.component.html',
  styleUrls: ['./categorization.component.scss']
})
export class CategorizationComponent implements OnInit {
 partData:any;
  constructor(private lessonsService : LessonsService) {
    this.partData = lessonsService.partData;
    console.log(this.partData);
   }
  public input1="";
  public input2="";
  public input3="";
  public hasError=true;

  checkform(){
    if(this.input1 !="" && this.input2 !=""  && this.input3 !=""){
      this.hasError=false;
    }
  }

  ngOnInit() {
  }

}

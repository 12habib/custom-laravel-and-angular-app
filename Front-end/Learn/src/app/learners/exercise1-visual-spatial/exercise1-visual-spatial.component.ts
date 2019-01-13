import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise1-visual-spatial',
  templateUrl: './exercise1-visual-spatial.component.html',
  styleUrls: ['./exercise1-visual-spatial.component.scss']
})
export class Exercise1VisualSpatialComponent implements OnInit {

  constructor() { }
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

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intra',
  templateUrl: './intra.component.html',
  styleUrls: ['./intra.component.scss']
})
export class IntraComponent implements OnInit {

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

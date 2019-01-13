import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise5-verbaloral',
  templateUrl: './exercise5-verbaloral.component.html',
  styleUrls: ['./exercise5-verbaloral.component.scss']
})
export class Exercise5VerbaloralComponent implements OnInit {
  public input1="";
  public input2="";
  public input3="";
  public input4="";
  public input5="";
  public input6="";
  public hasError=true;
  checkform(){
    if(this.input1 !="" && this.input2 !=""  && this.input3 !="" && this.input4 !="" && this.input5!="" && this.input6 !=""){
      this.hasError=false;
    }
  }
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intralesson2',
  templateUrl: './intralesson2.component.html',
  styleUrls: ['./intralesson2.component.scss']
})
export class Intralesson2Component implements OnInit {
  public input1="";
  public input2="";
  public input3="";
  public input4="";
  public hasError=true;
  constructor() { }
  checkform(){
    if(this.input1 !="" && this.input2 !="" && this.input3 !="" && this.input4 !=""){
      this.hasError=false;
  }
  }

  ngOnInit() {
  }

}

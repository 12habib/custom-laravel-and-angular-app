import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bodilylesson2part1',
  templateUrl: './bodilylesson2part1.component.html',
  styleUrls: ['./bodilylesson2part1.component.scss']
})
export class Bodilylesson2part1Component implements OnInit {
  public input1="";
  public input2="";
  public input3="";
  public input4="";
  public hasError=true;

  checkform(){
    if(this.input1 !="" && this.input2 !="" && this.input3!="" && this.input4 !="" ){
      console.log("jkkkk")
      this.hasError=false;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-verballesson2',
  templateUrl: './verballesson2.component.html',
  styleUrls: ['./verballesson2.component.scss']
})
export class Verballesson2Component implements OnInit {
  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  checkpage(){
    this.emitFunctionOfParent.emit();
   }

  public input1="";
  public input2="";
  public input3="";
  public input4="";
  public hasError=true;
  checkform(){
    if(this.input1 !="" && this.input2 !=""  && this.input4 !=""){
      this.hasError=false;
    }
   console.log("fire");
   console.log(this.hasError);

   }
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bodilylesson',
  templateUrl: './bodilylesson.component.html',
  styleUrls: ['./bodilylesson.component.scss']
})
export class BodilylessonComponent implements OnInit {
  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  checkpage(){
    this.emitFunctionOfParent.emit();
   }
   public input1="";
   public input2="";
   public input3="";
   public input4="";
   public input5="";
   public input6="";
   public input7="";
   public hasError=true;

checkform(){
  if(this.input1 !="" && this.input2 !=""  && this.input4 !="" && this.input5 !="" && this.input6 !=""){
    this.hasError=false;
  }
console.log("fire");
console.log(this.hasError);
console.log(this.input6);
}

  constructor() { }

  ngOnInit() {

  }

}

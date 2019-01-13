import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-exercise5-interpersonal',
  templateUrl: './exercise5-interpersonal.component.html',
  styleUrls: ['./exercise5-interpersonal.component.scss']
})
export class Exercise5InterpersonalComponent implements OnInit {

  public input1="";
   public input2="";
   public input3="";
   public input4="";
   public hasError=true;
   public needMore=false;
   public showyesorno=false;
   @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();

checkform(){
  if(this.input1 !="" && this.input2 !=""  && this.input4 !="" ){
    this.showyesorno=true;
  }
}
no(){
  this.hasError=false;
  this.showyesorno=false;
}
yes(){
  this.needMore=true;
  this.showyesorno=false;
}
checkpage(){
  this.emitFunctionOfParent.emit();
 }
  constructor() { }

  ngOnInit() {
  }

}

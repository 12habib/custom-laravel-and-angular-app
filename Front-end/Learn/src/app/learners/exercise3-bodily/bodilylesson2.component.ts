import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bodilylesson2',
  templateUrl: './bodilylesson2.component.html',
  styleUrls: ['./bodilylesson2.component.scss']
})
export class Bodilylesson2Component implements OnInit {
  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  checkpage(){
    this.emitFunctionOfParent.emit();
   }
   public input1="";
  public hasError=true;
  checkform(){
    if(this.input1 !="" ){
      this.hasError=false;
    }
   console.log("fire");
   console.log(this.hasError);

   }
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-handslesson',
  templateUrl: './handslesson.component.html',
  styleUrls: ['./handslesson.component.scss']
})
export class HandslessonComponent implements OnInit {
  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  public ans="check in";
  public questions=['carry on luggage','boarding passes','check luggage','to present','counter','check in'];
  public disable=[];
  public dropsuc;
  public x=0;
  public y=0;
  public hasError=true;
  public dropstyle=[];
  public i;
  public dropstyle2;
  checkpage(){
    this.emitFunctionOfParent.emit();
   }
   disableall(){
     for(var j=0; j<this.questions.length-1; j++){
      this.dropstyle[j]={"background-color":"grey"};
     }
   }
  dropDataend(event) {
    this.i=this.questions.indexOf(event.dropData);
        if(event.dropData==this.ans){
            this.dropsuc=event.dropData;
            this.disableall();
            this.dropstyle[this.i]={ "display":"none"};
            this.dropstyle2={ 'border':'1px solid green'};
            this.y=this.y+1;
            this.hasError=false;

        }else{
          if(this.hasError==true){
          this.dropsuc="wrong ans";
          this.dropstyle2={ 'border':'1px solid red'};
          this.dropstyle[this.i]={"background-color":"grey"};
          this.disable[this.i]=true;
          }
        }
      }

  constructor() { }

  ngOnInit() {
  }

}

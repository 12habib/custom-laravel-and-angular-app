import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-visuallesson',
  templateUrl: './visuallesson.component.html',
  styleUrls: ['./visuallesson.component.scss']
})
export class VisuallessonComponent implements OnInit {
  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  checkpage(){
    this.emitFunctionOfParent.emit();
   }
  title = 'app';
  public dropsuc=[];
  public transferdata=[" I was late because","When she was walking to work she stopped and realized",
  "Her husband hadn’t bought a gift for her anniversary","We argued with each other because the train had gone"];

  public ans=["I’d forgotten to set my alarm","She’d forgotten her mobile phone at home",
  "so she was angry","We had missed it because we’d arrived too late"];
  public x=0;
  public y=0;
  public hasError=true;
  public dropstyle=[];
  public datalength=this.transferdata.length;
  public dropstyle1=new Array<string>(this.datalength);
  public dropstyle2=[];
  dropDataend(event,i) {
    if(this.dropstyle1[i]==null){
        if(event.dropData==this.ans[i]){
            this.dropsuc[i]=event.dropData;
            this.dropstyle[i]={ "display":"none"};
            this.dropstyle2[i]={ 'border':'1px solid green'};
            this.dropstyle1[i]="block";
            this.y=this.y+1;
            if( this.y==this.datalength){
              this.hasError=false;
              }

        }else{

          this.dropsuc[i]="wrong ans";
          this.dropstyle2[i]={ 'border':'1px solid red'};
        }
      }else{
        this.dropstyle2[i]={ 'border':'1px solid green'};
      }
  }

  constructor() { }

  ngOnInit() {
  }


}

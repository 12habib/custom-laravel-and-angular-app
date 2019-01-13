import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-visuallesson2',
  templateUrl: './visuallesson2.component.html',
  styleUrls: ['./visuallesson2.component.scss']
})
export class Visuallesson2Component implements OnInit {
  public ans=["going to hotel","booking a room","travelling to airport"];
  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  checkpage(){
    this.emitFunctionOfParent.emit();
   }

  public dropsuc=[];
  public x=0;
  public y=0;
  public hasError=true;
  public dropstyle=[];
  public datalength=this.ans.length;
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
            if( this.dropsuc.length==this.datalength){
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

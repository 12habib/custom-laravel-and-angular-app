import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';

@Component({
  selector: 'app-logical',
  templateUrl: './logical.component.html',
  styleUrls: ['./logical.component.scss']
})
export class LogicalComponent implements OnInit {

  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  checkpage(){
    this.emitFunctionOfParent.emit();
   }
  public ans=["ing","ed"];
  public transferdata=[" It was embarrass",
  "I was embarrass"];

  public dropsuc=[];
  public x=0;
  public y=0;
  public hasError=true;
  public dropstyle=[];
  public datalength=this.ans.length;
  public dropstyle1=new Array<string>(this.datalength);
  public dropstyle2=[];
  public dragerror=true;
  public input1="";
  public input2="";
  public input3="";
  public input4="";
  public input5="";
  public input6="";




  dropDataend(event,i) {

    if(this.dropstyle1[i]==null){
        if(event.dropData==this.ans[i]){
            this.dropsuc[i]=event.dropData;
            this.dropstyle[i]={ "display":"none"};
            this.dropstyle2[i]={ 'border':'1px solid green'};
            this.dropstyle1[i]="block";
            this.y=this.y+1;
            if( this.dropsuc.length==this.datalength){
              this.dragerror=false;
              }
              this.checkform();

        }else{

          this.dropsuc[i]="wrong ans";
          this.dropstyle2[i]={ 'border':'1px solid red'};
        }
      }else{
        this.dropstyle2[i]={ 'border':'1px solid green'};
      }
  }
  checkform(){
    if(this.input1 !="" && this.input2 !=""  && this.input4 !="" && this.input5 !="" && this.input6 !="" && this.dragerror==false){
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

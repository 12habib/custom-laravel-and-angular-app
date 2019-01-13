import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hands2',
  templateUrl: './hands2.component.html',
  styleUrls: ['./hands2.component.scss']
})
export class Hands2Component implements OnInit {
  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  checkpage(){
    this.emitFunctionOfParent.emit();
   }
  title = 'app';
  public dropsuc=[];
  public transferdata=["Check luggage "];

  public ans=["to put your larger(suitcases) in the bottom of the airplane"];
  public questions:Array<Object> = [
    {vocabulary : 'To check in', text: 'to get your boarding passes (tickets) and check your luggage'},
    {vocabulary : 'Counter', text: 'the desk or place where you do business (check in, pay money, etc.)'},
    {vocabulary : 'to present', text: 'to show and give something to someone'},
    {vocabulary : 'Boarding passes', text: 'your ticket, which you must have to get on the plane '},
    {vocabulary : 'Agent', text: 'The person at the check-in counter who works for the airline'},
    {vocabulary : 'Check luggage', text: 'to put your (larger) suitcases in the bottom of the airplane'},
    {vocabulary : 'Carry-on Luggage', text: 'Smaller bags that you can carry on the plane (small suitcases, backpack etc)'}

];
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

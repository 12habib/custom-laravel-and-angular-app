import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bodilylesson2part2',
  templateUrl: './bodilylesson2part2.component.html',
  styleUrls: ['./bodilylesson2part2.component.scss']
})
export class Bodilylesson2part2Component implements OnInit {
  public icons=["ban","blind","motorcycle","truck","wheelchair","ambulance","usd"];
  public i;
  public x;
  public y;
  public positionstyle=[];
  dropData(event){
    console.log(event.dropData);
     this.i=this.icons.indexOf(event.dropData);
     this.positionstyle[this.i]={'position':'relative',
                                  'top':this.y+'px',
                                 'left':this.x +'px',

                                }
      console.log(this.x+','+ this.y);
  }
  dragEnd(event){
    this.x=event.x;
    this.y=event.y;
    console.log(event.x,event.y);
  }

  constructor() { }

  ngOnInit() {
  }

}

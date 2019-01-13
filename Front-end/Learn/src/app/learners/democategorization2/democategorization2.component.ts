import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-democategorization2',
  templateUrl: './democategorization2.component.html',
  styleUrls: ['./democategorization2.component.scss']
})
export class Democategorization2Component implements OnInit {
  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  checkpage(){
    this.emitFunctionOfParent.emit();
   }

  constructor() { }

  ngOnInit() {
  }

}

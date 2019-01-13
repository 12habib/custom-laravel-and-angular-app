import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-demomusical2',
  templateUrl: './demomusical2.component.html',
  styleUrls: ['./demomusical2.component.scss']
})
export class Demomusical2Component implements OnInit {
  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  checkpage(){
    this.emitFunctionOfParent.emit();
   }

  constructor() { }

  ngOnInit() {
  }

}

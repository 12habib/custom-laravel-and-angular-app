import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-intrapersonal2',
  templateUrl: './intrapersonal2.component.html',
  styleUrls: ['./intrapersonal2.component.scss']
})
export class Intrapersonal2Component implements OnInit {
  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  checkpage(){
    this.emitFunctionOfParent.emit();
   }

  constructor() { }

  ngOnInit() {
  }

}

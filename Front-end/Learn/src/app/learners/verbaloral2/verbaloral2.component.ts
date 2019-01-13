import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-verbaloral2',
  templateUrl: './verbaloral2.component.html',
  styleUrls: ['./verbaloral2.component.scss']
})
export class Verbaloral2Component implements OnInit {
  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  checkpage(){
    this.emitFunctionOfParent.emit();
   }
  constructor() { }

  ngOnInit() {
  }

}

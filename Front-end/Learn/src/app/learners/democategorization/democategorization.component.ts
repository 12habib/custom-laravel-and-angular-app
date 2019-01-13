import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-democategorization',
  templateUrl: './democategorization.component.html',
  styleUrls: ['./democategorization.component.scss']
})
export class DemocategorizationComponent implements OnInit {
  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  checkpage(){
    this.emitFunctionOfParent.emit();
   }
  constructor() { }

  ngOnInit() {
  }

}

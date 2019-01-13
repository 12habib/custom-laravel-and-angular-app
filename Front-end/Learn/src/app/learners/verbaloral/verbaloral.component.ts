import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-verbaloral',
  templateUrl: './verbaloral.component.html',
  styleUrls: ['./verbaloral.component.scss']
})
export class VerbaloralComponent implements OnInit {
  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  checkpage(){
    this.emitFunctionOfParent.emit();
   }

  constructor() { }

  ngOnInit() {
  }

}

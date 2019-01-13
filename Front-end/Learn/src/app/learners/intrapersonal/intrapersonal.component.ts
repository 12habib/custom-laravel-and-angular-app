import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-intrapersonal',
  templateUrl: './intrapersonal.component.html',
  styleUrls: ['./intrapersonal.component.scss']
})
export class IntrapersonalComponent implements OnInit {
  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  checkpage(){
    this.emitFunctionOfParent.emit();
   }

  constructor() { }

  ngOnInit() {
  }

}

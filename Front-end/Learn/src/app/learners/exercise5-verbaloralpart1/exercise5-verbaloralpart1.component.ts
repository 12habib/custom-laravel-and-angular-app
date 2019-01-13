import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-exercise5-verbaloralpart1',
  templateUrl: './exercise5-verbaloralpart1.component.html',
  styleUrls: ['./exercise5-verbaloralpart1.component.scss']
})
export class Exercise5Verbaloralpart1Component implements OnInit {
  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  checkpage(){
    this.emitFunctionOfParent.emit();
   }
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { DummyDataService } from '../../dummy-data.service';

@Component({
  selector: 'app-dummy-data',
  templateUrl: './dummy-data.component.html',
  styleUrls: ['./dummy-data.component.scss']
})
export class DummyDataComponent implements OnInit {

  partData: any = null;
  currentScreen  = 0;
  currentElement = 0;

  constructor(private dummy: DummyDataService) {
    this.partData = dummy.partData;
  }

  ngOnInit() {

    
    

  }

}

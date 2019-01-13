import { Component, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-exercise5-visualspatial',
  templateUrl: './exercise5-visualspatial.component.html',
  styleUrls: ['./exercise5-visualspatial.component.scss']
})
export class Exercise5VisualspatialComponent implements OnInit {
  public dropstyle2=[];
  questions=['When he <span class="box-fill" mwlDroppable [ngStyle]="dropstyle2[i]"></span> (finish) his swim he <span class="box-fill" mwlDroppable [ngStyle]="dropstyle2[i]"  (drop)="dropbox($event)"></span>  (realize) he <span class="box-fill" mwlDroppable [ngStyle]="dropstyle2[i]"  (drop)="dropbox($event)"></span>  <span class="box-fill" mwlDroppable [ngStyle]="dropstyle2[i]"  (drop)="dropbox($event)"></span>  (forget) his clothes.',
            'I <span class="box-fill"></span>  (be) late because I  <span class="box-fill"></span>  (forget) to set my alarm.',
            'Her husband <span class="box-fill"></span>  (not bought) a gift for her anniversary so she <span class="box-fill"></span>  (be) angry.',
            '<span class="box-fill"></span>   (remember) to buy his wife an anniversary gift? No, he <span class="box-fill"></span>  (not).'];

  questionanswer=[{
    firstbox:'Past Simple Verb',secondbox:'Past Simple Verb',
    thirdbox:'Auxiliary Verb',fourthbox:'Past participle'
  }];
  dragbutton=['Past Simple Verb','Auxiliary Verb','Past participle'];
  dragbuttonstyle=[{'background':'#f26530'},{'background':'#55ce63'},{'background':'yellow'}]
  constructor(private ref: ElementRef, private cRef: ChangeDetectorRef) {

  }
  dropbox(event){
    console.log(event);
  }
  ngOnInit() {
    this.cRef.detectChanges();
  }
  ngAfterViewInit(){
    this.cRef.detectChanges();
    this.ref.nativeElement.querySelectorAll('.box-fill').forEach(
      a => a.addEventListener('drop', (evt) => this.dropbox(this))
    );

  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LessonsService } from '../../shared/lessons/lessons.service';

@Component({
  selector: 'app-buildman-lesson',
  templateUrl: './buildman-lesson.component.html',
  styleUrls: ['./buildman-lesson.component.scss']
})
export class BuildmanLessonComponent implements OnInit {
  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  checkpage(){
    this.emitFunctionOfParent.emit();
   }
  public question=['A','E','B','C','D','W','T','Y','S','N','R','M','V','F','G','H','I','J','K','L','O','P','Q','R','Z']
  public stringans=null;
  partData:any;
  title:any;
  public stringansl=null;
  public answer:any;
  public displaymodal=false;
  public displaywrongmodal=false;
  public indices=[];
  public str;
  public wrongstr=0;
  public substrindices=[];
  public substr=0;
  public substrl;
  public enterstyle=[];
  public styleimg;
  public styleimg1;
  public disable=[];
  public clickbuttonstyle=[];
  public linkstyle={
    'color': '#000',
    'cursor': 'not-allowed',
    'opacity': '1',
    'text-decoration': 'none'
  };
  public wrongansl=0;
  constructor(private lessonsService : LessonsService) {
    this.partData = lessonsService.partData;
    this.stringans=this.partData.screens[0].elements[1].word;
    this.stringansl=this.stringans.length;
    this.stringans=this.stringans.toUpperCase();
    console.log(this.stringans);
    this.answer=new Array<string>(this.stringansl);
    this.title=this.partData.screens[0].elements[1].title;
    console.log(this.partData.screens[0].elements[1]);
   }
  closemodal(){
    this.displaymodal=false;
  }
  closewrongmodal(){
    this.displaywrongmodal=false;
  }
  opengoodrobot(per){
      if(per<=20){
      this.styleimg={ 'position':'absolute',
        'top':'0%',
        'left':'0%',
        'bottom':'40%',
        'right':'0%',
        'background-color':'#fff'
      }
    }else if( per<=30 ){
      this.styleimg={ 'position':'absolute',
        'top':'0%',
        'left':'32%',
        'bottom':'40%',
        'right':'0%',
        'background-color':'#fff'
      }

    }else if(per<=60 ){
      this.styleimg={ 'position':'absolute',
        'top':'0px',
        'left':'32%',
        'bottom':'50%',
        'right':'30%',
        'background-color':'#fff'
      }
    }else if(per<=80 ){
      this.styleimg={ 'position':'absolute',
        'top':'0%',
        'left':'32%',
        'bottom':'70%',
        'right':'35%',
        'background-color':'#fff'
      }
    }else if(per==100 ){
      this.styleimg={ 'position':'absolute',
        'top':'0%',
        'left':'50%',
        'bottom':'100%',
        'right':'50%',
        'background-color':'#fff'
      }
    }else{
      console.log('error');
    }

  }
  openbadrobot(per){
    if(per<=31){
     this.styleimg1={ 'position':'absolute',
       'top':'0%',
       'left':'0%',
       'bottom':'40%',
       'right':'0%',
       'background-color':'#fff'
     }
   }else if(per<=70 ){
     this.styleimg1={ 'position':'absolute',
       'top':'0px',
       'left':'32%',
       'bottom':'50%',
       'right':'30%',
       'background-color':'#fff'
     }
   }else if(per<=96 ){
     this.styleimg1={ 'position':'absolute',
       'top':'0%',
       'left':'32%',
       'bottom':'70%',
       'right':'35%',
       'background-color':'#fff'
     }
   }else if(per>=100 ){
     this.styleimg1={ 'position':'absolute',
       'top':'0%',
       'left':'50%',
       'bottom':'100%',
       'right':'50%',
       'background-color':'#fff'
     }
   }else{
     console.log('error');
   }

}
  adddata(data,y){
    if(typeof this.answer != undefined){
      for(var i=0; i<this.stringansl;i++) {
          if (this.stringans[i] === data) {
            this.indices.push(i);
          }else{
            this.clickbuttonstyle[y]={
              'background-color':'red',
              'color': '#fff'
            };
            this.disable[y]=true;
          }
      }
      if(this.indices.length==0){
        this.wrongstr+=1;
        this.wrongansl=this.wrongansl+30+this.wrongstr;
        this.openbadrobot(this.wrongansl);
        if(this.wrongansl>=130){
          this.displaywrongmodal=true;
          for(var i=0; i<this.question.length;i++){
            this.disable[i]=true;
          }
        }
      }else{
        for(var j=0; j<this.indices.length;j++) {
          var ansindex=this.indices[j];
          this.answer[ansindex]=data;

          this.enterstyle[ansindex]={'border':'none'};
          this.clickbuttonstyle[y]={
            'background-color':'#989e9a',
            'color': '#000'
          };

          this.disable[y]=true;
        }
        this.substr=this.substr + this.indices.length;
          this.substrl=((this.substr) * 100)/this.stringansl
          console.log(this.substr);
          console.log(this.substrl);
          this.opengoodrobot(this.substrl);

    }
      this.indices=[];
      this.str=this.answer.join("");
      if(this.str===this.stringans){
        this.linkstyle={
          'color': '#000',
        'cursor': 'pointer',
        'opacity': '1',
        'text-decoration': 'none'};
      }


      if(this.str==this.stringans){
        this.displaymodal=true;

        this.linkstyle={
          'cursor': 'pointer',
          'opacity': '1',
          'text-decoration': 'none',
          'color':'#ffa700'

        };
      }

      console.log(this.str);
    }else{
      console.log("wrong input")
    }

  }

  tryagain(){
    this.answer=new Array<string>(this.stringansl);
    this.enterstyle=[];
    this.clickbuttonstyle=[];
    this.disable=[];
    this.styleimg={
    'top':'0%',
    'left':'0%',
    'bottom':'20%',
    'right':'0%',
    'background-color':'#fff'
  }
  this.styleimg1={
    'top':'0%',
    'left':'0%',
    'bottom':'20%',
    'right':'0%',
    'background-color':'#fff'
  }
  this.substr=0;
  this.wrongstr=0;
  this.wrongansl=0;
  this.linkstyle={
    'color': '#000',
    'cursor': 'not-allowed',
    'opacity': '1',
    'text-decoration': 'none'
  };
  }


  ngOnInit() {
  }

}

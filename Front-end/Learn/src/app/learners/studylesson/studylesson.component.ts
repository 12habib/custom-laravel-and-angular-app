import { Component, OnInit } from '@angular/core';
import { LessonsService } from '../../shared/lessons/lessons.service';
import { NgSwitch } from '@angular/common';
interface KeyboardEvent {
  code: string;
}
@Component({
  selector: 'app-studylesson',
  templateUrl: './studylesson.component.html',
  styleUrls: ['./studylesson.component.scss']
})
export class StudylessonComponent implements OnInit {
  haselError=true;
  //match_words_to_pictures
  mawpImage=[];
  mawpQues=[];
  mawpdroppedData=[];
  mawpdropStyle=[];
  mawpdropStyle1=[];
  mawpdropStyle2=[];
  mawpTitle:any;
  mawpcompleted=false;
  mawpindex=0;
  mawpdatalength:any;

  //write from memory
  memLines:any;
  memTitle:any;
  memLineInput:any;
  memAns:any;
  memi=0;
  memStyle=[];
  memtempAns;
  lineModelArray=[];
  memCompleteArray=[];
  memcompleted=false;
  //paragraph
  paraGraph:any;
  //mcq horizontal
  mcqhorChoice=[];
  mcqhorQues:any;
  mcqhorStyle=[];
  mcqhi=0;
  mcqhj=0;
  mcqhcompleted=false;
  //mcq ver
  mcqverChoice=[];
  mcqverQues:any;
  mcqverStyle=[];
  mcqi=0;
  mcqj=0;
  mcqvcompleted=false;
  mcqvind=0;

  //reorder sentence
  reorSenQues=[];
  reorSenAns=[];
  reorSenDropStyle=[];
  reorSenDropStyle2=[];
  reorSenDroppedData=[];
  public reorSendatalength:any;
  reorseni=0;
  reorsenj=0;
  reSendrop=0;
  reSencompleted=false;
  //Reorder Paragraph
  reorderQuestions=[];
  reorderDropStyle=[];
  reorderDropStyle2=[];
  reorderDroppedData=[];
  public redatalength:any;
  public rey=0;
  rei=0;
  public dropComplete=false;
  //QA
  qaTitle:any;
  qaInput:any;
  qaSplitstring:any;
  qaSplitArray=[];
  qaStyle:any;
  qaIndex=0;
  qacompleted=false;
  //match sides
  leftSideData=[];
  rightSideData=[];
  droppedData=[];
  dropStyle2=[];
  dropStyle=[];
  hasError=true;
  matchSidesTitle:any;
  y=0;
  matchcompleted=false;
  public datalength=this.leftSideData.length;
  public dropstyle1=new Array<string>(this.datalength);
  //hidden word
  public showButton:any;
  hiddenWord:any;
  hiddencompleted=false;
  //fib_simple
  public ngmodelarray=[]
  public i=0;
  public j=0;
  splitstring:any;
  public splitstringarray=[];
  public ans=[];
  public fixed=[];
  public formStyle=[];
  fibIndex=0;
  fibcompleted=false;
  //music
  public playing;
  public playingAudio=[];
  public previousAudio;
  public previousAudioindex;
  public varInterval;
  public audios=[];
  musiccompleted=false;
  //buildman
  public question=['A','E','B','C','D','W','T','Y','S','N','R','M','V','F','G','H','I','J','K','L','O','P','Q','R','Z']
  public stringans="";
  partData:any;
  title:any;
  show=false;
  buildmancompleted=false;

  playAudioTitle:any;
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
    this.partData = lessonsService;
    this.partData.screens.forEach(screen => {
      screen.elements.forEach(element => {
        switch(element.type){
          case'buildman':
            this.stringans=element.word;
            this.stringansl=this.stringans.length;
            this.stringans=this.stringans.toUpperCase();
            console.log(this.stringans);
            this.answer=new Array<string>(this.stringansl);
            this.title=element.title;
            break;
          case'audio_simple':
            this.audios=element.audio_data;
            this.playAudioTitle=element.title;
            break;
          case'fib_simple':
          this.fixed=[];
          this.splitstringarray=[];
            element.data.forEach(data1 => {
              if(data1.type=="fixed"){
                this.fixed[this.i]=data1.node;
                this.i++;
              }else{
                this.splitstringarray[this.j]=data1.node;
                this.j++;

              }
            });
            this.ngmodelarray=new Array<string>(this.fixed.length);

            break;
          case'hidden_word':
            this.showButton=element.button_text;
            this.hiddenWord=element.word;
            break;
          case'match_sides':
            this.leftSideData=element.sides.left;
            this.rightSideData=element.sides.right;
            this.matchSidesTitle=element.title;
            break;
            case'qa':

                this.qaTitle=element.title;
                this.qaSplitstring=element.keywords;

              break;
          case'reorder_paragraphs':
            this.reorderQuestions=element.paragraphs;
            this.redatalength=this.reorderQuestions.length;
            break;
          case 'reorder_sentence':
            element.data.forEach(data1 => {
              if(data1.type==='fixed'){
                this.reorSenQues[this.reorseni]=data1.node;
                this.reorseni++;
              }else{
                this.reorSenAns[this,this.reorsenj]=data1.node;
                this.reorsenj++;
              }
              this.reorSendatalength=this.reorSenAns.length;

            });
            break;
        case 'mcq_horizontal':
            element.choices.forEach(choices => {
              this.mcqhorChoice[this.mcqhi]=choices;
              this.mcqhi++;
            });
            this.mcqhorQues=element.question;
            break;
        case'paragraph':
            this.paraGraph=element.source;
            break;
        case'write_from_memory':
            this.memLines=element.lines;
            this.memTitle=element.title;
            this.memAns=this.memLines.split('\n');
            this.memLineInput=this.memAns.length;
            this.lineModelArray=new Array<string>(this.memLineInput);
            break;
        case'mcq_vertical':
            element.choices.forEach(choices => {
              this.mcqverChoice[this.mcqi]=choices;
              this.mcqi++;
            });
            this.mcqverQues=element.question;
            console.log(this.mcqverChoice);
            break;
        case'match_words_to_pictures':
            this.mawpImage=element.pictures;
            this.mawpQues=element.phrases;
            this.mawpTitle=element.title;
            this.mawpdatalength=this.mawpQues.length;

            break;
        }


      });



 });
 for(let j=0; j<=this.reorSenAns.length; j++){
  this.reorSenDropStyle2[j]={  'width': '10%',
 'border':'1px dashed #70AD47',
  'height': '30px',
  'display': 'inline-block',

  'margin-top': '1%',
  'margin-left': '1%'
  }
  }
  console.log(this.partData);
}
dropPhrase(event,l){
  if(this.mawpdropStyle1[l]==null){
    if(event.dropData==this.mawpQues[l]){
        this.mawpdroppedData[l]=event.dropData;

        this.mawpdropStyle[l]={ "display":"none"};
        this.mawpdropStyle2[l]={ 'border':'1px solid green'};
        this.mawpdropStyle1[l]="block";
        this.mawpindex=this.mawpindex+1;
        if( this.mawpindex==this.mawpdatalength){
            this.mawpcompleted=true;
            this.checkNext();

          }

    }else{

      this.mawpdroppedData[l]="Wrong Answer; Please Try Again";
      this.mawpdropStyle2[l]={ 'border':'1px solid red'};
    }
  }else{
    this.mawpdropStyle2[l]={ 'border':'1px solid green'};
  }
}
checkLines(m){
  console.log(m);
  if(this.memAns[m]===this.lineModelArray[m].trim('\n')){
    this.memStyle[m]={
      'border-bottom':'1px solid green'
    };
    this.memCompleteArray[m]=this.memAns[m]
    if(this.memCompleteArray.length===this.memAns.length){
      this.memcompleted=true;
      this.checkNext();

    }
  }else{
    this.memStyle[m]={
      'border-bottom':'1px solid red'
    };
  }


}

checkBoxfired(value){

   if(value.userAnswer===true && value.correct===true){
        value.msqclick=4;
        this.mcqhcompleted=true;
        this.checkNext();


   }else if(value.userAnswer===true && value.correct===undefined){
        value.mcqclick=2;

   }else {
    value.mcqclick=3;

   }


}
checkAnswer(buttonind){
  if(this.mcqverChoice[buttonind].correct===true){
      this.mcqverStyle[buttonind]={
        'background-color':'green'
      };
      this.mcqvcompleted=true;
      this.checkNext();
        console.log(buttonind);
  }else if(this.mcqverChoice[buttonind].correct===undefined){
    this.mcqverStyle[buttonind]={
      'background-color':'red'
    };

  }else{
    this.mcqverStyle[buttonind]={
      'background-color':'blue'
    };
  }
}

reOrSenDrop(event){
    if(event.dropData==this.reorSenAns[this.reSendrop]){
      this.reorSenDroppedData[this.reSendrop]=event.dropData;

      this.reorSenDropStyle[this.reSendrop]={ "display":"none"};
      this.reorSenDropStyle2[this.reSendrop]={
      'border':'none'
    }
      this.reSendrop++;
    if( this.reSendrop==this.reorSendatalength){
          this.reSencompleted=true;
          this.checkNext();

      }

  }else{

  this.reorSenDropStyle2[this.reSendrop]={  'width': '10%',
  'border':'1px dashed red',
  'height': '30px',
  'display': 'inline-block',

  'margin-top': '1%',
  'margin-left': '1%'
  }
  }
}
reOrderParagraphDrop(event) {
  if(event.dropData==this.reorderQuestions[this.rei]){
       this.reorderDroppedData[this.rei]=event.dropData;

       this.reorderDropStyle[this.rei]={ "display":"none"};
        this.rei++;


      this.rey=this.rey+1;

      if( this.rey===this.redatalength){

        this.dropComplete=true;
        this.checkNext();

        }

  }else{

    this.reorderDropStyle2[this.rei]={ 'border':'1px solid red'};
  }

}
dropDataend(event,i) {
  if(this.dropstyle1[i]==null){
      if(event.dropData==this.rightSideData[i]){
          this.droppedData[i]=event.dropData;

          this.dropStyle[i]={ "display":"none"};
          this.dropStyle2[i]={ 'border':'1px solid green','padding':'10px'};
          this.dropstyle1[i]="block";
          this.y=this.y+1;
          if( this.y==this.datalength){
            this.hasError=false;
            this.checkNext();

            }

      }else{

        this.droppedData[i]="Wrong Answer; Please Try Again";
        this.dropStyle2[i]={ 'border':'1px solid red'};
      }
    }else{
      this.dropStyle2[i]={ 'border':'1px solid green',
                          'padding':'10px;' };
    }
}
show_Hidden_word(){
  this.show=true;
  this.hiddencompleted=true;
  this.checkNext();

}
check_Diff_ans_from_Form(){

  for(let i=0; i<this.splitstringarray.length; i++){
    this.ans=this.splitstringarray[i].split(",",);
    if(this.ans.includes(this.ngmodelarray[i])){
      this.formStyle[i]={ 'border-bottom': '1px solid #00c851',
        'box-shadow': '0 1px 0 0 #00c851'}
        this.fibIndex++;
        if(this.fibIndex===this.splitstringarray.length){
          this.fibcompleted=true;
          this.checkNext();

      }
    }else{
      this.formStyle[i]={ 'border-bottom': '1px solid red',
        'box-shadow': '0 1px 0 0 red'};
    }
  }

}
check_Diff_ans_from_Qa(){
    this.qaSplitArray=this.qaSplitstring.split(",",);
    if(this.qaSplitArray.includes(this.qaInput)){
      this.qaStyle={ 'border-bottom': '1px solid #00c851',
        'box-shadow': '0 1px 0 0 #00c851'};
        this.qacompleted=true;
        if(this.qacompleted==true){
          this.checkNext();

        }

    }else{
      this.qaStyle={ 'border-bottom': '1px solid red',
        'box-shadow': '0 1px 0 0 red'};
    }


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
        this.checkNext();
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

  playAudio(i){
    if(this.playing==true){
      this.previousAudio.pause();
      this.playingAudio[this.previousAudioindex]=false;
      let audio = new Audio();
      this.playing=true;
      this.playingAudio[i]=true;
      this.previousAudioindex=i;
      audio.src = this.audios[i].fileData;
      audio.load();
      audio.play();
      this.previousAudio= audio;
      console.log(i);
      this.varInterval=setInterval(() =>{
        if(audio.ended==true){
          this.pauseAudio(i);
          clearInterval(this.varInterval);
        }
      },1000);

    }else{
      let audio = new Audio();
      this.playing=true;
      audio.src = this.audios[i].fileData;
      audio.load();
      audio.play();
      this.previousAudio= audio;
      this.playingAudio[i]=true;
      this.previousAudioindex=i;
      console.log(this.audios[i].fileData);
      this.varInterval=setInterval(() =>{
        if(audio.ended==true){
          this.pauseAudio(i);
          clearInterval(this.varInterval);
        }
      },1000);

    }
  }
    pauseAudio(i){

        this.playingAudio[i]=false;
        this.previousAudio.pause();

  }
  checkNext(){
    if(this.qacompleted==true && this.matchcompleted==true && this.hiddencompleted==true
      && this.memcompleted==true && this.mcqhcompleted==true && this.mcqvcompleted==true && this.buildmancompleted==true && this.fibcompleted==true
      && this.reSencompleted==true && this.dropComplete==true && this.hasError==false){
          this.haselError=false;
    }
  }
  ngOnInit() {
  }

}

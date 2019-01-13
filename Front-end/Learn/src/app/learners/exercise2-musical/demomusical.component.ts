import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginTokenService } from '../../shared/loginToken/login-token.service';



@Component({
  selector: 'app-demomusical',
  templateUrl: './demomusical.component.html',
  styleUrls: ['./demomusical.component.scss']
})
export class DemomusicalComponent implements OnInit {

  constructor(private logintoken:LoginTokenService){
    this.logintoken.LoadComplete(false);
  }
  ngOnInit() {
      this.timer();
  }
  public timerclock;
  public showTimer=false;
  public showVocabulary=false;
  public input1="";
  public time=0;
  public timecalc;
  public varInterval;
  public hasError=true;
  public playing;
  public playingAudio=[];
  public previousAudio;
  public previousAudioindex;
  public audios=['Focus_GLB_1_MP3_001.mp3'];
  public questions:Array<Object> = [
    {vocabulary : 'To check in', text: 'to get your boarding passes (tickets) and check your luggage'},
    {vocabulary : 'Counter', text: 'the desk or place where you do business (check in, pay money, etc.)'},
    {vocabulary : 'to present', text: 'to show and give something to someone'},
    {vocabulary : 'Boarding passes', text: 'your ticket, which you must have to get on the plane '},
    {vocabulary : 'Agent', text: 'The person at the check-in counter who works for the airline'},
    {vocabulary : 'Check luggage', text: 'to put your (larger) suitcases in the bottom of the airplane'},
    {vocabulary : 'Carry-on Luggage', text: 'Smaller bags that you can carry on the plane (small suitcases, backpack etc)'}

];
calculatetime(){

}


timer(){
  console.log("timer");
   this.timerclock=setInterval(()=>{
    this.showTimer=true;
    this.time++;
    this.timecalc= 50-this.time;
    if(this.time==50){
       this.showVocabulary=true;
      this.checkform();
      clearInterval(this.timerclock);
    }
  },1000);
}



checkform(){
  if(this.input1 !="" && this.showVocabulary==true){
      this.hasError=false;
  }
}

}

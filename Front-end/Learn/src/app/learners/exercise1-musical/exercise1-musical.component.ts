import { Component, OnInit } from '@angular/core';
import { LessonsService } from '../../shared/lessons/lessons.service';

@Component({
  selector: 'app-exercise1-musical',
  templateUrl: './exercise1-musical.component.html',
  styleUrls: ['./exercise1-musical.component.scss']
})
export class Exercise1MusicalComponent implements OnInit {
  public partData:any;
  public input1="";
  public input2="";
  public input3="";
  public hasError=true;
  public playing;
  public playingAudio=[];
  public previousAudio;
  public previousAudioindex;
  public varInterval;
  public audios=[];
  constructor(private lessonsService : LessonsService) {
    this.partData = lessonsService.partData;
    this.audios=this.partData.screens[0].elements[0].audio_data;
    console.log(this.partData.screens[0].elements[0]);
   }
  ngOnInit() {
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



checkform(){
  if(this.input1 !="" && this.input2 !=""  && this.input3){
      this.hasError=false;
  }
}
}

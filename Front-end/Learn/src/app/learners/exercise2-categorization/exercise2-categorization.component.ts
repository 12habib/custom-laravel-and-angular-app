import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';


@Component({
  selector: 'app-exercise2-categorization',
  templateUrl: './exercise2-categorization.component.html',
  styleUrls: ['./exercise2-categorization.component.scss']

})
export class Exercise2CategorizationComponent implements OnInit {

  public questions:Array<Object> = [
    {vocabulary : 'To check in', text: 'to get your boarding passes (tickets) and check your luggage'},
    {vocabulary : 'Counter', text: 'the desk or place where you do business (check in, pay money, etc.)'},
    {vocabulary : 'to present', text: 'to show and give something to someone'},
    {vocabulary : 'Boarding passes', text: 'your ticket, which you must have to get on the plane '},
    {vocabulary : 'Agent', text: 'The person at the check-in counter who works for the airline'},
    {vocabulary : 'Check luggage', text: 'to put your (larger) suitcases in the bottom of the airplane'},
    {vocabulary : 'Carry-on Luggage', text: 'Smaller bags that you can carry on the plane (small suitcases, backpack etc)'}

];
public dragbuttons =[];
  constructor() {
    for(let j=0; j<this.questions.length; j++){
      this.dragbuttons[j]=this.questions[j]['vocabulary']
      }
    }

   ngOnInit() {
  }



public answer_of_Verb=['To check in','to present','Check luggage'];
public answer_of_Noun=['Counter','Carry-on Luggage'];
public answer_of_ProperNoun=['Agent','Boarding passes'];
public insert_in_Verb_col=[];
public insert_in_Noun_col=[];
public insert_in_PropNoun_col=[];
public tableLength=Math.floor((this.questions.length/2));
public hasError=true;
public tablerowArray = Array(this.tableLength).fill({col1:1,col2:2,col3:3})
public disable=[];
public border=[];
public border1=[];
public border2=[];
public data;

dropVerbData(event,i){
  if(this.answer_of_Verb.includes(event.dropData)){
    this.insert_in_Verb_col[i]=event.dropData;
    this.border[i]={'border-color':'green'}
   for(let j=0; j<this.dragbuttons.length; j++){
     if(this.dragbuttons[j]===event.dropData){
       this.dragbuttons.splice(j,1);
     }
   }
   this.checkanswerInsertedPerfectly();

  }else{
    // this.insert_in_Verb_col[i]="Wrong Answer"
    this.border[i]={'border-color':'red'}
  }
}
dropNounData(event,i){
  if(this.answer_of_Noun.includes(event.dropData)){
    this.insert_in_Noun_col[i]=event.dropData;
    this.border1[i]={'border-color':'green'}
    for(let j=0; j<this.dragbuttons.length; j++){
      if(this.dragbuttons[j]===event.dropData){
        this.dragbuttons.splice(j,1);
      }
    }
    this.checkanswerInsertedPerfectly();
  }else{
    // this.insert_in_Noun_col[i]="Wrong Answer"
    this.border1[i]={'border-color':'red'}
  }
}
dropProperNounData(event,i){
  if(this.answer_of_ProperNoun.includes(event.dropData)){
    this.insert_in_PropNoun_col[i]=event.dropData;
    this.border2[i]={'border-color':'green'}
    for(let j=0; j<this.dragbuttons.length; j++){
      if(this.dragbuttons[j]===event.dropData){
        this.dragbuttons.splice(j,1);
      }
    }
    this.checkanswerInsertedPerfectly();

  }else{
    // this.insert_in_PropNoun_col[i]="Wrong Answer"
    this.border2[i]={'border-color':'red'}
  }
}
checkanswerInsertedPerfectly(){
    if(this.insert_in_Verb_col.length==this.answer_of_Verb.length && this.insert_in_PropNoun_col.length==this.answer_of_ProperNoun.length && this.answer_of_Noun.length==this.insert_in_Noun_col.length){
      for(let i=0; i<this.insert_in_Noun_col.length; i++){
        this.border1[i]={'border-color':'green'};
      }
      for(let i=0; i<this.insert_in_PropNoun_col.length; i++){
        this.border2[i]={'border-color':'green'};
      }
      for(let i=0; i<this.insert_in_Verb_col.length; i++){
        this.border[i]={'border-color':'green'};
      }
      this.hasError=false;

    }
}

}

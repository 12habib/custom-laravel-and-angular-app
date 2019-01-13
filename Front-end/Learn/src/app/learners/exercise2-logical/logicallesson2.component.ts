import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-logicallesson2',
  templateUrl: './logicallesson2.component.html',
  styleUrls: ['./logicallesson2.component.scss']
})
export class Logicallesson2Component implements OnInit {
  @Output()
  emitFunctionOfParent: EventEmitter<any> = new EventEmitter<any>();
  checkpage(){
    this.emitFunctionOfParent.emit();
   }
  title = 'app';
  public questions:Array<Object> = [
    {vocabulary : 'To check in', text: 'to get your boarding passes (tickets) and check your luggage', example:'We need to check in at 11am'},
    {vocabulary : 'Counter', text: 'the desk or place where you do business (check in, pay money, etc.)', example:'Where is the counter?'},
    {vocabulary : 'to present', text: 'to show and give something to someone', example:'You must present your passport?'},
    {vocabulary : 'Boarding passes', text: 'your ticket, which you must have to get on the plane ', example:'You need a boarding pass to get on the plane'},
    {vocabulary : 'Agent', text: 'The person at the check-in counter who works for the airline', example:'The Agent can help us'},
    {vocabulary : 'Check luggage', text: 'to put your (larger) suitcases in the bottom of the airplane', example:'I don’t have any check luggage'},
    {vocabulary : 'Carry-on Luggage', text: 'Smaller bags that you can carry on the plane (small suitcases, backpack etc)', example:'I don’t have any check luggage'}

];
public dragbuttons =[];
  constructor() {
    for(let j=0; j<this.questions.length; j++){
      this.dragbuttons[j]=this.questions[j]['text']
      }


    for(let i=0; i<this.questions.length; i++){
      this.dragbuttons.push(this.questions[i]['example'])
      }

    }

   ngOnInit() {
  }



public answer_of_defination=['to get your boarding passes (tickets) and check your luggage',
                            'the desk or place where you do business (check in, pay money, etc.)',
                            'to show and give something to someone',
                            'your ticket, which you must have to get on the plane ',
                            'The person at the check-in counter who works for the airline',
                            'to put your (larger) suitcases in the bottom of the airplane',
                            'Smaller bags that you can carry on the plane (small suitcases, backpack etc)',
                          ];
public answer_of_Example=['We need to check in at 11am','Where is the counter?' ,
                          'You must present your passport?','You need a boarding pass to get on the plane',
                          'The Agent can help us','I don’t have any check luggage','I don’t have any check luggage'
                          ];

public insert_in_defination_col=[];
public insert_in_Example_col=[];

public tableLength=Math.floor((this.questions.length));
public hasError=true;
public tablerowArray = Array(this.tableLength).fill({col1:1,col2:2,col3:3})
public disable=[];
public border=[];
public border1=[];

public data;

dropDefinationData(event,i){
  if(this.answer_of_defination.includes(event.dropData) && this.answer_of_defination[i]==event.dropData){
    this.insert_in_defination_col[i]=event.dropData;
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
dropExampleData(event,i){
  if(this.answer_of_Example.includes(event.dropData) && this.answer_of_Example[i]==event.dropData){
    this.insert_in_Example_col[i]=event.dropData;
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

checkanswerInsertedPerfectly(){
    if(this.insert_in_defination_col.length==this.answer_of_defination.length && this.insert_in_Example_col.length==this.answer_of_Example.length ){
      for(let i=0; i<this.insert_in_Example_col.length; i++){
        this.border1[i]={'border-color':'green'};
      }

      for(let i=0; i<this.insert_in_defination_col.length; i++){
        this.border[i]={'border-color':'green'};
      }
      this.hasError=false;

    }
}

}

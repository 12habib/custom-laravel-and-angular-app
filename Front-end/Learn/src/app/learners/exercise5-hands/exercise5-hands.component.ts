import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginTokenService } from 'src/app/shared/loginToken/login-token.service';

@Component({
	selector: 'app-exercise5-hands',
	templateUrl: './exercise5-hands.component.html',
	styleUrls: [ './exercise5-hands.component.scss' ]
})
export class Exercise5HandsComponent implements OnInit {
	dragDropQuestions = {
		columns: [ 'Noun', 'Verb', 'Proper Noun', 'Conjunction' ],
		entries: [
			[ 'Cat', 'eats', 'milk', 'and' ],
			[ 'Cow', 'says', 'moo', 'or' ],
			[ 'Lions', 'rule', 'the jungle', 'and' ]
		]
	};
	tempArr = [];
	randomArr = [];

	matrixDrop(data) {
		console.log(data);

		console.log(this.dragDropQuestions);
	}
	constructor(private logintoken: LoginTokenService) {
		this.logintoken.LoadComplete(false);
	}

	ngOnInit() {
		let lengthofArr = this.dragDropQuestions.entries.length;

		for (let i = 0; i < lengthofArr; i++) {
			let tempArrlength = this.dragDropQuestions.entries[i].length;
			for (let j = 0; j < tempArrlength; j++) {
				this.tempArr[j] = this.dragDropQuestions.entries[i][j];
			}
			while (tempArrlength > 0) {
				const index = Math.floor(Math.random() * tempArrlength);
				tempArrlength--;
				const temp = this.tempArr[tempArrlength];
				this.tempArr[tempArrlength] = this.tempArr[index];
				this.tempArr[index] = temp;
			}
			this.randomArr.push(this.tempArr);
			this.tempArr = [];
		}
	}
}

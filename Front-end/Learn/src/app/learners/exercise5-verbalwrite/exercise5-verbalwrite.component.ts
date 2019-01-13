import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginTokenService } from 'src/app/shared/loginToken/login-token.service';

@Component({
	selector: 'app-exercise5-verbalwrite',
	templateUrl: './exercise5-verbalwrite.component.html',
	styleUrls: [ './exercise5-verbalwrite.component.scss' ]
})
export class Exercise5VerbalwriteComponent implements OnInit {
	constructor(private logintoken: LoginTokenService) {
		this.logintoken.LoadComplete(false);
	}

	questions = [
		{ type: 'fixed', text: 'he' },
		{ type: 'movable', text: 'Past Simple Verb' },
		{ type: 'fixed', text: '(finish) his swim he' },
		{ type: 'movable', text: 'Past participle' },
		{ type: 'fixed', text: '(realize) he' },
		{ type: 'movable', text: 'Past participle' },
		{ type: 'fixed', text: '(forget) his clothes' }
	];
	blanksDrop(data) {
		console.log('fired');
	}
	ngOnInit() {}
}

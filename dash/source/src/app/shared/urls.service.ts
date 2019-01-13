import { Injectable } from '@angular/core';

@Injectable()
export class UrlsService {
	//apiRoot = 'https://api.myedugami.com/api';
	 apiRoot = 'http://localhost:8000/api';
	//static apiUrl = 'https://api.myedugami.com/api';
	 static apiUrl = 'http://localhost:8000/api';

	pwResetURL = this.apiRoot + '/user.forgotPassword';
	doPWResetURL = this.apiRoot + '/user.doResetPw';

	signupUrl = 'https://api.myedugami.com/api';
	constructor() {}
}

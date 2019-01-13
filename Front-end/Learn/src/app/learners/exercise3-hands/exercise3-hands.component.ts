import { Component, OnInit } from '@angular/core';
import { LoginTokenService } from '../../shared/loginToken/login-token.service';
import * as $ from 'jquery';

@Component({
	selector: 'app-exercise3-hands',
	templateUrl: './exercise3-hands.component.html',
	styleUrls: [ './exercise3-hands.component.scss' ]
})
export class Exercise3HandsComponent implements OnInit {
	imagesrc = 'assets/img/Robot1.png';

	waiting = true;
	timerclock: any;
	time = 0;
	backgColor = [];
	timecalc: any;
	next = false;
	progress: any;
	width: any;
	tempArrlength: any;
	tempArr = [];

	public dropstyle = [];
	public dropstyle2 = [];
	public hasError = true;
	newspaperStyle = 'marpadnewspaper';
	newspaperClass = 'col-md-6 col-sm-6 offset-md-3 newsbackground';
	invisible = [];
	public i = 0;
	public questions = [
		'item 1 dummy text dummy text dummy text dummy text dummy text dummy text1',
		'item2 dummy text dummy text dummy text dummy text dummy text dummy text',
		'item3 dummy text dummy text dummy text dummy text dummy text dummy text',
		'item4 dummy text dummy text dummy text dummy text dummy text dummy text',
		'item 5 dummy text dummy text dummy text dummy text dummy text dummy text'
	];
	public dropsuc = [];
	public news = '<p>There are man<span style="text-decoration: line-through;">y variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure th</span>ere isn\'t anything emba<em>rrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, makin</em>g this the first tru<span style="color: #ff9900;">e generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lore</span>m Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>\n<p><img style="display: block; margin-left: auto; margin-right: auto;" src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0QzVENzI2MTkwMTMxMUU4QTA5MTg2RkJDM0EwRURFNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0QzVENzI2MjkwMTMxMUU4QTA5MTg2RkJDM0EwRURFNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRDNUQ3MjVGOTAxMzExRThBMDkxODZGQkMzQTBFREU2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRDNUQ3MjYwOTAxMzExRThBMDkxODZGQkMzQTBFREU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJ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" alt="" width="128" height="128" /></p>\n<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be <a href="https://lipsum.com/">sure</a> there isn\'t anything embarrassing <strong>hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structu</strong>res, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>';
	public datalength = this.questions.length;
	public y = 0;
	public dropcomplete = false;
	dragDropQuestions = {
		columns: [ 'Noun', 'Verb', 'Proper Noun' ],
		entries: [ [ 'Cat', 'eats', 'milk' ], [ 'Cow', 'says', 'moo' ], [ 'Lions', 'rule', 'the jungle' ] ]
	};
	tempDraglength: number;

	// tempkArr: [][] = [];
	// tempdArr = [];

	constructor(private logintoken: LoginTokenService) {
		this.logintoken.LoadComplete(false);
	}
	clear(timer) {
		clearInterval(timer);
		this.waiting = false;
	}

	ngOnInit() {
		this.timerclock = setInterval(() => {
			this.time++;
			if (this.imagesrc === 'assets/img/Robot1.png') {
				this.imagesrc = 'assets/img/Robot2.png';
			} else {
				this.imagesrc = 'assets/img/Robot1.png';
			}
			this.progress = Math.floor(this.time / 10 * 100);
			this.width = {
				width: this.progress + '%'
			};

			if (this.time === 10) {
				this.clear(this.timerclock);
			}
		}, 1000);

		this.tempArrlength = this.questions.length;
		for (let j = 0; j < this.tempArrlength; j++) {
			this.tempArr[j] = this.questions[j];
		}
		while (this.tempArrlength > 0) {
			const index = Math.floor(Math.random() * this.tempArrlength);
			this.tempArrlength--;
			const temp = this.tempArr[this.tempArrlength];
			this.tempArr[this.tempArrlength] = this.tempArr[index];
			this.tempArr[index] = temp;
		}
		//   this.tempDraglength= this.dragDropQuestions.entries.length;
		//   for(var k=0;k<this.tempDraglength; k++){
		//     for(var l=k;l<this.dragDropQuestions.entries[k].length; l++){
		//     this.tempkArr[k][l]=this.dragDropQuestions.entries[k][l];
		//     }
		//   }
		//   var i=this.dragDropQuestions.entries[0].length;
		//   while (this.tempDraglength > 0) {

		//     while(i>0){
		//     let indexi = Math.floor(Math.random() * this.dragDropQuestions.entries[i].length);
		//     this.dragDropQuestions.entries[i].length--;
		//     let temp1 = this.tempdArr[this.dragDropQuestions.entries[i].length];
		//     this.tempdArr[this.dragDropQuestions.entries[i].length] = this.tempdArr[indexi];
		//     this.tempdArr[indexi] = temp1;
		//     }
		//     this.tempDraglength--;
		//   }

		//   console.log(this.tempkArr);
		// }
	}
	matrixDrop(data) {
		console.log(data);

		this.invisible[data.in] = {
			display: 'none'
		};
		console.log(this.dragDropQuestions);
	}

	checkDragandDrop(p, data) {
		const newid1 = data.array[p];
		if (this.tempArr[newid1] === this.questions[p]) {
			this.backgColor[newid1] = {
				background: 'green'
			};
		} else {
			this.backgColor[newid1] = {
				background: 'red'
			};
		}
	}
	// checkprevNext(p,data){
	//   var newid1=p+1;
	//   var newid=p-1;
	//   for(var k=newid1; k<this.questions.length; k++){
	//     this.checkDragandDrop(k,data);
	//     console.log(0, "fired");
	//   }
	//   this.checkDragandDrop(newid,data);

	// }

	HandleSorableData(data) {
		// console.log(data);
		// if(this.tempArr[data.index]===this.questions[data.new_index]){

		//   var p=data.new_index;
		// if(p>0 && p<this.questions.length-1){
		//   // p=data.new_index;
		//   // this.checkprevNext(p,data);
		//   // this.backgColor[data.index]={
		//   //   'background':'green'
		//   // }
		for (let k = 0; k < this.questions.length; k++) {
			this.checkDragandDrop(k, data);
		}

		// }else
		// if(p===this.questions.length-1){
		//   p=data.new_index;
		// for(var j=p; j>0; j--){
		// this.checkDragandDrop(j,data);
		// }

		// }else{
		//   for(var k=0; k<this.questions.length; k++){
		//     this.checkDragandDrop(k,data);

		//   }

		// }

		// }else{
		//   var p=data.new_index;

		//   // if(p>0 && p<this.questions.length-1){
		//   //    p=data.new_index;
		//   //   this.checkprevNext(p,data);
		//   //   this.backgColor[data.index]={
		//   //     'background':'red'
		//   //   }
		//   //   console.log(p,"1st");

		//   // }else
		//   // if(p===this.questions.length-1){
		//   //   p=data.new_index;
		//   //   for(var j=p; j>0; j--){
		//   //   this.checkDragandDrop(j,data);
		//   //   }
		//   // }else{
		//     for(var k=0; k<this.questions.length; k++){
		//       this.checkDragandDrop(k,data);

		//     }

		//   // }

		// }
	}
}

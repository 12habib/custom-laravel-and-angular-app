import { Component, OnInit } from '@angular/core';
import { LessonsService } from '../../shared/lessons/lessons.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginTokenService } from '../../shared/loginToken/login-token.service';
import { BingApiService } from 'src/app/shared/bing/bing-api.service';
import { element } from 'protractor';
import { UploadHelperService } from 'src/app/shared/upload-service/upload-helper.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
// import Recorder from "recorder-js";

// declare some global variables to be used
declare let MediaRecorder: any;
declare let $: any; // jquery
declare let BingSpeech: any; // for Bing Speech Recognition API
declare let Recorder: any;
declare let webkitAudioContext: any;

@Component({
	selector: 'app-study',
	templateUrl: './study.component.html',
	styleUrls: [ './study.component.scss' ]
})
export class StudyComponent implements OnInit {
	lessonid: any;
	lessonparts = [];
	//
	qaInput: any;
	qaSplitArray = [];
	qamatch: any;
	//  yousof
	currentPart = 0;
	currentScreen = 0;
	//fib_simple
	fibfix = [];
	//music
	playing = [];
	mui = 0;
	varInterval: any;
	//buildman
	public question = [
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'Y',
		'Z'
	];
	public stringans = '';
	title: any;

	buildmancompleted = false;
	public stringansl = null;
	public answer: any;
	public displaymodal = false;
	public displaywrongmodal = false;
	public indices = [];
	public str;
	public wrongstr = 0;
	public substrindices = [];
	public substr = 0;
	public substrl;
	public enterstyle = [];
	public styleimg;
	public styleimg1;
	public disable = [];
	public clickbuttonstyle = [];
	public linkstyle = {
		color: '#000',
		cursor: 'not-allowed',
		opacity: '1',
		'text-decoration': 'none'
	};
	public wrongansl = 0;

	// needed for audio recorder
	bingClientRecognition: any;
	recorder: any = null;
	maxSecondsToRecord: number;
	audioContext: any;
	streamRef: any;
	working: boolean;

	constructor(
		private lessonsService: LessonsService,
		private router: Router,
		private route: ActivatedRoute,
		private logintoken: LoginTokenService,
		private BingSvc: BingApiService,
		private uploadSvc: UploadHelperService,
		private toastr: ToastrService
	) {
		logintoken.LoadComplete(true);
		logintoken.checkToken();
		this.maxSecondsToRecord = 10; // seconds
	}

	checkNext() {
		this.lessonparts[this.currentPart].screens[this.currentScreen].elements.comPletedelements.push('done');
		let elementcheck = this.lessonparts[this.currentPart].screens[this.currentScreen].elements;
		if (elementcheck.length === elementcheck.comPletedelements.length) {
			elementcheck.completed = true;
			this.SaveProgress();
		}
	}

	SaveProgress() {
		this.lessonsService
			.SaveProgress({ lesson_id: this.lessonid, data: this.lessonparts })
			.subscribe((resp: any) => {}, (err: HttpErrorResponse) => {});
	}

	resetCheckNext() {
		let elementcheck = this.lessonparts[this.currentPart].screens[this.currentScreen].elements;
		elementcheck.completed = false;
		if (elementcheck.length === elementcheck.comPletedelements.length) {
			this.lessonparts[this.currentPart].screens[this.currentScreen].elements.comPletedelements.splice(-1, 1); // remove one 'done'
		}
	}

	trackByFn(index, item) {
		return index;
	}

	loadElements(j, sc) {
		this.question = [
			'A',
			'B',
			'C',
			'D',
			'E',
			'F',
			'G',
			'H',
			'I',
			'J',
			'K',
			'L',
			'M',
			'N',
			'O',
			'P',
			'Q',
			'R',
			'R',
			'S',
			'T',
			'U',
			'V',
			'W',
			'Y',
			'Z'
		];
		this.stringans = '';
		this.buildmancompleted = false;
		this.stringansl = null;
		this.displaymodal = false;
		this.displaywrongmodal = false;
		this.indices = [];
		this.str = '';
		this.wrongstr = 0;
		this.substrindices = [];
		this.substr = 0;
		this.substrl;
		this.enterstyle = [];
		this.styleimg;
		this.styleimg1;
		this.disable = [];
		this.clickbuttonstyle = [];
		this.linkstyle = {
			color: '#000',
			cursor: 'not-allowed',
			opacity: '1',
			'text-decoration': 'none'
		};
		this.wrongansl = 0;
		console.log(this.lessonparts[j]);
		if (typeof this.lessonparts[j].screens[sc].elements.comPletedelements === 'undefined')
			this.lessonparts[j].screens[sc].elements.comPletedelements = [];

		this.currentPart = j;
		this.currentScreen = sc;
		this.PrepareForStudy();

		// this.lessonparts[j].screens[sc].elements.forEach(element => {
		//   switch (element.type) {
		//     case "buildman":
		//       this.stringans = element.word;
		//       this.stringansl = this.stringans.length;
		//       this.stringans = this.stringans.toUpperCase();
		//       console.log(this.stringans);
		//       this.answer = new Array<string>(this.stringansl);
		//       this.title = element.title;
		//       break;

		//     case "reorder_paragraphs":
		//       if (typeof element.tempArrlength === "undefined")
		//         element.tempArrlength = element.paragraphs.length;

		//       if (typeof element.tempArr === "undefined") element.tempArr = [];
		//       for (var j = 0; j < element.tempArrlength; j++) {
		//         element.tempArr[j] = element.paragraphs[j];
		//       }
		//       while (element.tempArrlength > 0) {
		//         let index = Math.floor(Math.random() * element.tempArrlength);
		//         element.tempArrlength--;
		//         let temp = element.tempArr[element.tempArrlength];
		//         element.tempArr[element.tempArrlength] = element.tempArr[index];
		//         element.tempArr[index] = temp;
		//       }
		//       if (typeof element.paragraphsCompleted == "undefined")
		//         element.paragraphsCompleted = [];
		//       if (typeof element.hideDiv === "undefined") element.hideDiv = false;
		//       break;

		//     case "reorder_sentence":
		//       if (typeof element.sentenceArray === "undefined")
		//         element.sentenceArray = [];
		//       if (typeof element.dropStyle === "undefined") element.dropStyle = [];
		//       element.data.forEach(data => {
		//         if (data.type === "movable") {
		//           if (typeof data.dropStyle2 === "undefined")
		//             data.dropStyle2 = {
		//               width: "10%",
		//               border: "1px dashed #70AD47",
		//               height: "30px",
		//               display: "inline-block",
		//               "margin-top": "1%",
		//               "margin-left": "1%"
		//             };
		//         }
		//       });
		//       if (typeof element.tempArr === "undefined") element.tempArr = [];
		//       element.data.forEach(data => {
		//         if (data.type === "movable") {
		//           element.sentenceArray.push(data.node);
		//           element.tempArr.push(data.node);
		//         }
		//       });
		//       console.log(element.tempArr);
		//       if (typeof element.tempArrlength === "undefined")
		//         element.tempArrlength = element.tempArr.length;
		//       while (element.tempArrlength > 0) {
		//         let index = Math.floor(Math.random() * element.tempArrlength);
		//         element.tempArrlength--;
		//         let temp = element.tempArr[element.tempArrlength];
		//         element.tempArr[element.tempArrlength] = element.tempArr[index];
		//         element.tempArr[index] = temp;
		//       }

		//       break;

		//     case "match_words_to_pictures":
		//       if (typeof element.tempArrlength === "undefined")
		//         element.tempArrlength = element.phrases.length;

		//       if (typeof element.tempArr === "undefined") element.tempArr = [];
		//       for (var j = 0; j < element.tempArrlength; j++) {
		//         element.tempArr[j] = element.phrases[j];
		//       }
		//       while (element.tempArrlength > 0) {
		//         let index = Math.floor(Math.random() * element.tempArrlength);
		//         element.tempArrlength--;
		//         let temp = element.tempArr[element.tempArrlength];
		//         element.tempArr[element.tempArrlength] = element.tempArr[index];
		//         element.tempArr[index] = temp;
		//       }

		//       if (typeof element.phraseDropped === "undefined")
		//         element.phraseDropped = [];
		//       if (typeof element.dropStyle === "undefined") element.dropStyle = [];
		//       if (typeof element.dropStyle2 === "undefined")
		//         element.dropStyle2 = [];
		//       break;

		//     case "write_from_memory":
		//       if (typeof element.lineArray === "undefined") element.lineArray = [];
		//       element.lineArray = element.lines.split("\n");
		//       if (typeof element.lineModelArray === "undefined")
		//         element.lineModelArray = [];
		//       if (typeof element.dropStyle === "undefined") element.dropStyle = [];
		//       if (typeof element.lineComplete === "undefined")
		//         element.lineComplete = [];
		//       break;
		//     case "qa":
		//       if (typeof element.qaArray === "undefined") element.qaArray = [];
		//       if (typeof element.qaStyle === "undefined") element.qaStyle = "";
		//       if (typeof element.qaInput === "undefined") element.qaInput = "";
		//       if (typeof element.qaInputArray === "undefined")
		//         element.qaInputArray = "";
		//       if (typeof element.qai === "undefined") element.qai = "";
		//       break;

		//     case "match_sides":
		//       if (typeof element.tempArrlength === "undefined")
		//         element.tempArrlength = element.sides.right.length;

		//       if (typeof element.tempArr === "undefined") element.tempArr = [];
		//       for (var j = 0; j < element.tempArrlength; j++) {
		//         element.tempArr[j] = element.sides.right[j];
		//       }
		//       while (element.tempArrlength > 0) {
		//         let index = Math.floor(Math.random() * element.tempArrlength);
		//         element.tempArrlength--;
		//         let temp = element.tempArr[element.tempArrlength];
		//         element.tempArr[element.tempArrlength] = element.tempArr[index];
		//         element.tempArr[index] = temp;
		//       }
		//       if (typeof element.leftDropStyle === "undefined")
		//         element.leftDropStyle = [];
		//       if (typeof element.rightDropStyle === "undefined")
		//         element.rightDropStyle = [];
		//       if (typeof element.wordDropped === "undefined")
		//         element.wordDropped = [];
		//       break;

		//     case "fib_simple":
		//       if (typeof element.data.ngmodelInput === "undefined")
		//         if (typeof element.checkArray === "undefined")
		//           element.checkArray = [];
		//       if (typeof element.data.checkStyle === "undefined")
		//         element.data.forEach(data => {
		//           if (data.type === "choices") {
		//             data.checkStyle = "";
		//             data.ngmodelInput = "";
		//           }
		//         });

		//       break;

		//     case "colored_blanks":
		//       if (typeof element.data.ngmodelInput === "undefined") {
		//         if (typeof element.checkArray === "undefined") {
		//           element.checkArray = [];
		//         }
		//       }

		//       if (typeof element.data.checkStyle === "undefined") {
		//         element.data.forEach(data => {
		//           if (data.type === "choices") {
		//             data.checkStyle = "";
		//             data.ngmodelInput = "";
		//           }
		//         });
		//       }

		//       break;

		//     case "paragraph":
		//       this.checkNext();
		//       break;

		//     case "mcq_vertical":
		//       if (typeof element.cmpAns === "undefined") element.cmpAns = [];

		//       element.choices.forEach(choice => {
		//         if (typeof choice.formClass === "undefined")
		//           choice.formClass = "form-check-input";
		//         if (typeof choice.formlabelClass === "undefined")
		//           choice.formlabelClass = "form-check-label";
		//         if (choice.correct === true) {
		//           element.cmpAns.push(choice.text);
		//         }
		//       });
		//       break;

		//     case "hidden_word":
		//       if (typeof element.showAnim === "undefined") element.showAnim = "";

		//       break;

		//     case "voice_recording":
		//       break;

		//      default:
		//       this.checkNext();
		//       break;
		//   }
		// });
	}
	ngOnInit() {
		// prep the recorder data
		try {
			this.audioContext = new (AudioContext || webkitAudioContext)();
		} catch (error) {}

		let id = parseInt(this.route.snapshot.paramMap.get('id'));
		this.lessonid = id;
		this.lessonsService.LessonParts(this.lessonid).subscribe((resp: any) => {
			resp.parts.map((part) => {
				part.screens = typeof part.screens === 'string' ? JSON.parse(part.screens) : part.screens;
			});
			this.lessonparts = resp.parts;
			// console.log(this.lessonparts);
			this.PrepareForStudy();
		});
	}

	PrepareForStudy() {
		this.working = true;
		if (
			typeof this.lessonparts[this.currentPart].screens[this.currentScreen].elements.comPletedelements ===
			'undefined'
		)
			this.lessonparts[this.currentPart].screens[this.currentScreen].elements.comPletedelements = [];

		this.lessonparts[this.currentPart].screens[this.currentScreen].elements.forEach((element) => {
			switch (element.type) {
				case 'buildman':
					this.stringans = element.word;
					this.stringansl = this.stringans.length;
					this.stringans = this.stringans.toUpperCase();
					this.answer = new Array<string>(this.stringansl);
					this.title = element.title;
					break;

				case 'reorder_paragraphs':
					if (typeof element.tempArrlength === 'undefined') element.tempArrlength = element.paragraphs.length;

					if (typeof element.tempArr === 'undefined') element.tempArr = [];
					for (var j = 0; j < element.tempArrlength; j++) {
						element.tempArr[j] = element.paragraphs[j];
					}
					while (element.tempArrlength > 0) {
						let index = Math.floor(Math.random() * element.tempArrlength);
						element.tempArrlength--;
						let temp = element.tempArr[element.tempArrlength];
						element.tempArr[element.tempArrlength] = element.tempArr[index];
						element.tempArr[index] = temp;
					}
					if (typeof element.paragraphsCompleted == 'undefined') element.paragraphsCompleted = [];
					if (typeof element.hideDiv === 'undefined') element.hideDiv = false;
					break;

				case 'reorder_sentence':
					if (typeof element.sentenceArray === 'undefined') element.sentenceArray = [];
					if (typeof element.dropStyle === 'undefined') element.dropStyle = [];
					element.data.forEach((data) => {
						if (data.type === 'movable') {
							if (typeof data.dropStyle2 === 'undefined')
								data.dropStyle2 = {
									width: '10%',
									border: '1px dashed #70AD47',
									height: '30px',
									display: 'inline-block',
									'margin-top': '1%',
									'margin-left': '1%'
								};
						}
					});
					if (typeof element.tempArr === 'undefined') element.tempArr = [];
					element.data.forEach((data) => {
						if (data.type === 'movable') {
							element.sentenceArray.push(data.node);
							element.tempArr.push(data.node);
						}
					});
					console.log(element.tempArr);
					if (typeof element.tempArrlength === 'undefined') element.tempArrlength = element.tempArr.length;
					while (element.tempArrlength > 0) {
						let index = Math.floor(Math.random() * element.tempArrlength);
						element.tempArrlength--;
						let temp = element.tempArr[element.tempArrlength];
						element.tempArr[element.tempArrlength] = element.tempArr[index];
						element.tempArr[index] = temp;
					}

					break;

				case 'match_words_to_pictures':
					if (typeof element.tempArrlength === 'undefined') element.tempArrlength = element.phrases.length;

					if (typeof element.tempArr === 'undefined') element.tempArr = [];
					for (var j = 0; j < element.tempArrlength; j++) {
						element.tempArr[j] = element.phrases[j];
					}
					while (element.tempArrlength > 0) {
						let index = Math.floor(Math.random() * element.tempArrlength);
						element.tempArrlength--;
						let temp = element.tempArr[element.tempArrlength];
						element.tempArr[element.tempArrlength] = element.tempArr[index];
						element.tempArr[index] = temp;
					}

					if (typeof element.phraseDropped === 'undefined') element.phraseDropped = [];
					if (typeof element.dropStyle === 'undefined') element.dropStyle = [];
					if (typeof element.dropStyle2 === 'undefined') element.dropStyle2 = [];
					break;

				case 'paragraph':
					this.checkNext();
					break;

				case 'write_from_memory':
					if (typeof element.lineArray === 'undefined') element.lineArray = [];
					element.lineArray = element.lines.split('\n');
					if (typeof element.lineModelArray === 'undefined') element.lineModelArray = [];
					if (typeof element.dropStyle === 'undefined') element.dropStyle = [];
					if (typeof element.lineComplete === 'undefined') element.lineComplete = [];
					break;

				case 'qa':
				case 'timed_qa':
					// if timed, let's add the timer features
					if (element.type === 'timed_qa') {
						element.waiting = true;
						element.clearTimer = () => {
							clearInterval(element.timerclock);
							element.waiting = false;
							// this.checkNext();
						};
						element.time = 0;
						element.progress = 0;
						element.width = 0;
						element.imagesrc = 'assets/img/Robot1.png';

						element.timerclock = setInterval(() => {
							element.time++;
							if (element.imagesrc === 'assets/img/Robot1.png') {
								element.imagesrc = 'assets/img/Robot2.png';
							} else {
								element.imagesrc = 'assets/img/Robot1.png';
							}
							element.progress = Math.floor(element.time / 10 * 100);
							element.width = {
								width: element.progress + '%'
							};

							if (element.time === element.timeout) {
								element.clearTimer();
							}
						}, 1000);
					}
					/// timer setup ends ///

					element.keywords = element.keywords.split(',');
					for (let ki = 0; ki < element.keywords.length; ki++) {
						element.keywords[ki] = element.keywords[ki].toLowerCase().trim();
					}

					if (typeof element.answers === 'undefined' || element.answers.length < 1) {
						element.answers = [];
						// we're not doing an Arra(number).fil() for binding reasons
						// if you do that, it will keep updating ALL array entries :(
						// and that's too much work to work around
						for (let i = 0; i < element.numberOfAnswerFields; i++) {
							element.answers.push({ text: '', correct: null });
						}
					}

					element.validateAnswer = (answer) => {
						this.resetCheckNext();
						answer.correct = false; // if it's correct, it will be set to true, otherwise, it's false by default
						element.keywords.forEach((keyword) => {
							if (answer.text.trim().toLowerCase().includes(keyword)) {
								answer.correct = true;
								// console.log("found");
							}
							// console.log(answer);
						});

						element.checkIfCompleted();
					};

					element.checkIfCompleted = () => {
						let done = 0;
						console.log(element.answers);

						element.answers.forEach((answer) => {
							if (answer.correct == true) done++;
						});
						if (done === element.numberOfAnswerFields) this.checkNext();
					};
					break;

				case 'match_sides':
					if (typeof element.tempArrlength === 'undefined')
						element.tempArrlength = element.sides.right.length;

					if (typeof element.tempArr === 'undefined') element.tempArr = [];
					for (var j = 0; j < element.tempArrlength; j++) {
						element.tempArr[j] = element.sides.right[j];
					}
					while (element.tempArrlength > 0) {
						let index = Math.floor(Math.random() * element.tempArrlength);
						element.tempArrlength--;
						let temp = element.tempArr[element.tempArrlength];
						element.tempArr[element.tempArrlength] = element.tempArr[index];
						element.tempArr[index] = temp;
					}
					if (typeof element.leftDropStyle === 'undefined') element.leftDropStyle = [];
					if (typeof element.rightDropStyle === 'undefined') element.rightDropStyle = [];
					if (typeof element.wordDropped === 'undefined') element.wordDropped = [];
					break;
				case 'fib_simple':
					if (typeof element.data.ngmodelInput === 'undefined')
						if (typeof element.checkArray === 'undefined') element.checkArray = [];
					if (typeof element.data.checkStyle === 'undefined')
						element.data.forEach((data) => {
							if (data.type === 'choices') {
								data.checkStyle = '';
								data.ngmodelInput = '';
							}
						});

					break;
				case 'mcq_vertical':
					if (typeof element.cmpAns === 'undefined') element.cmpAns = [];

					element.choices.forEach((choice) => {
						if (typeof choice.formClass === 'undefined') choice.formClass = 'form-check-input';
						if (typeof choice.formlabelClass === 'undefined') choice.formlabelClass = 'form-check-label';
						if (choice.correct === true) {
							element.cmpAns.push(choice.text);
						}
					});
					break;
				case 'hidden_word':
					if (typeof element.showAnim === 'undefined') element.showAnim = '';

					break;

				case 'voice_recording':
					if (typeof element.recordData === 'undefined') {
						// means no previous recordings were found
						// so we set one up
						element.recordData = {
							recording: false,
							playing: false,
							data: null
						};
					}

					element.playAudio = () => {
						if (element.recordData.data != null) {
							// console.log(element.recordData.data);

							let audioUrl = URL.createObjectURL(element.recordData.data);
							let audio = new Audio(element.recordData.data);
							audio.src = audioUrl;
							audio.play();
						}
					};

					// // we need this for speech recognition
					// element.srData = {
					//   working: false,
					//   text: ""
					// };

					break;

				case 'speech_recognition':
					if (typeof element.recordData === 'undefined') {
						// means no previous recordings were found
						// so we set one up
						element.recordData = {
							recording: false,
							playing: false,
							data: null
						};
					}

					element.playAudio = () => {
						if (element.recordData.data != null) {
							let audioUrl = URL.createObjectURL(element.recordData.data);
							let audio = new Audio(element.recordData.data);
							audio.src = audioUrl;
							audio.play();
						}
					};

					// // we need this for speech recognition
					element.srData = {
						working: false,
						text: ''
					};

					break;

				case 'matrix_matching':
					const data = Array.from(element.data);
					element.columns = data[0]; // first row is the column names
					// remove the first row
					data.shift();
					element.entries = data; // the remainder of the rows are now the entries;

					// randomize the answers
					element.randomArr = [];
					let lengthofArr = element.entries.length;
					let tempArr = [];

					for (let i = 0; i < lengthofArr; i++) {
						let tempArrlength = element.entries[i].length;
						for (let j = 0; j < tempArrlength; j++) {
							tempArr[j] = element.entries[i][j];
						}

						while (tempArrlength > 0) {
							const index = Math.floor(Math.random() * tempArrlength);
							tempArrlength--;
							const temp = tempArr[tempArrlength];
							tempArr[tempArrlength] = tempArr[index];
							tempArr[index] = temp;
						}

						element.randomArr.push(tempArr);
						tempArr = [];
					}
					// console.log(element.randomArr);

					// console.log(element);

					break;

				case 'user_upload':
					element.uploadErrors = [];
					element.filesToUpload = element.filesToUpload || [];

					break;

				case 'paragraph_loop':
					element.currentIndex = 0;
					break;

				case 'timed_paragraph':
					element.waiting = true;
					element.clearTimer = () => {
						clearInterval(element.timerclock);
						element.waiting = false;
						this.checkNext();
					};
					element.time = 0;
					element.progress = 0;
					element.width = 0;
					element.imagesrc = 'assets/img/Robot1.png';

					element.timerclock = setInterval(() => {
						element.time++;
						if (element.imagesrc === 'assets/img/Robot1.png') {
							element.imagesrc = 'assets/img/Robot2.png';
						} else {
							element.imagesrc = 'assets/img/Robot1.png';
						}
						element.progress = Math.floor(element.time / 10 * 100);
						element.width = {
							width: element.progress + '%'
						};

						if (element.time === element.timeout) {
							element.clearTimer();
						}
					}, 1000);

					break;

				case 'audio_simple':
					element.currentlyPlaing = null;
					break;
				default:
		   			this.checkNext();
		  			break;
			}
		});
		this.logintoken.LoadComplete(false);
		this.working = false;
	}
	// PreparForStudy() ends


	checkPart() {
		if (this.lessonparts[this.currentPart].screens.length - 1 > this.currentScreen) {
			this.currentScreen++;
			this.loadElements(this.currentPart, this.currentScreen);
		} else if (this.lessonparts.length - 1 > this.currentPart && this.lessonparts[this.currentPart+1].screens.length != 0) {
			this.currentPart++;
			this.currentScreen = 0;
			this.loadElements(this.currentPart, this.currentScreen);
		}else {
			this.router.navigate([ '/complete' ]);
		}
	}
  showNextButton(){
    let elementcheck = this.lessonparts[this.currentPart].screens[this.currentScreen].elements;
    elementcheck.completed = true;
    
  }
	checkCompletedorNot() {}

	closemodal() {
		this.displaymodal = false;
	}
	closewrongmodal() {
		this.displaywrongmodal = false;
	}
	opengoodrobot(per) {
		if (per <= 20) {
			this.styleimg = {
				position: 'absolute',
				top: '0%',
				left: '0%',
				bottom: '40%',
				right: '0%',
				'background-color': '#fff'
			};
		} else if (per <= 30) {
			this.styleimg = {
				position: 'absolute',
				top: '0%',
				left: '32%',
				bottom: '40%',
				right: '0%',
				'background-color': '#fff'
			};
		} else if (per <= 60) {
			this.styleimg = {
				position: 'absolute',
				top: '0px',
				left: '32%',
				bottom: '50%',
				right: '30%',
				'background-color': '#fff'
			};
		} else if (per <= 80) {
			this.styleimg = {
				position: 'absolute',
				top: '0%',
				left: '32%',
				bottom: '70%',
				right: '35%',
				'background-color': '#fff'
			};
		} else if (per == 100) {
			this.styleimg = {
				position: 'absolute',
				top: '0%',
				left: '50%',
				bottom: '100%',
				right: '50%',
				'background-color': '#fff'
			};
		} else {
			console.log('error');
		}
	}
	openbadrobot(per) {
		if (per <= 31) {
			this.styleimg1 = {
				position: 'absolute',
				top: '0%',
				left: '0%',
				bottom: '40%',
				right: '0%',
				'background-color': '#fff'
			};
		} else if (per <= 70) {
			this.styleimg1 = {
				position: 'absolute',
				top: '0px',
				left: '32%',
				bottom: '50%',
				right: '30%',
				'background-color': '#fff'
			};
		} else if (per <= 96) {
			this.styleimg1 = {
				position: 'absolute',
				top: '0%',
				left: '32%',
				bottom: '84%',
				right: '29%',
				'background-color': '#fff'
			};
		} else if (per >= 100) {
			this.styleimg1 = {
				position: 'absolute',
				top: '0%',
				left: '50%',
				bottom: '100%',
				right: '50%',
				'background-color': '#fff'
			};
		} else {
			console.log('error');
		}
	}
	adddata(data, y) {
		if (typeof (this.answer != 'undefined')) {
			for (var i = 0; i < this.stringansl; i++) {
				if (this.stringans[i] === data) {
					this.indices.push(i);
				} else {
					this.clickbuttonstyle[y] = {
						'background-color': 'red',
						color: '#fff'
					};
					this.disable[y] = true;
				}
			}
			if (this.indices.length == 0) {
				this.wrongstr += 1;
				this.wrongansl = this.wrongansl + 30 + this.wrongstr;
				this.openbadrobot(this.wrongansl);
				if (this.wrongansl >= 130) {
					this.displaywrongmodal = true;
					for (var i = 0; i < this.question.length; i++) {
						this.disable[i] = true;
					}
				}
			} else {
				for (var j = 0; j < this.indices.length; j++) {
					var ansindex = this.indices[j];
					this.answer[ansindex] = data;

					this.enterstyle[ansindex] = { border: 'none' };
					this.clickbuttonstyle[y] = {
						'background-color': '#989e9a',
						color: '#000'
					};

					this.disable[y] = true;
				}
				this.substr = this.substr + this.indices.length;
				this.substrl = this.substr * 100 / this.stringansl;
				console.log(this.substr);
				console.log(this.substrl);
				this.opengoodrobot(this.substrl);
			}
			this.indices = [];
			this.str = this.answer.join('');
			if (this.str === this.stringans) {
				this.linkstyle = {
					color: '#000',
					cursor: 'pointer',
					opacity: '1',
					'text-decoration': 'none'
				};
			}

			if (this.str == this.stringans) {
				this.displaymodal = true;
				this.checkNext();
				this.linkstyle = {
					cursor: 'pointer',
					opacity: '1',
					'text-decoration': 'none',
					color: '#ffa700'
				};
			}

			console.log(this.str);
		} else {
			console.log('wrong input');
		}
	}
	PlayAudioFile(audio, element, index) {
		if (element.currentlyPlaing != null) {
			element.audio_data[element.currentlyPlaing].player.pause();
			element.audio_data[element.currentlyPlaing].Played = false;
		}

		if (typeof audio.fileData != 'undefined') {
			if (typeof audio.Played === 'undefined')
				if (typeof audio.PlayedBefore === 'undefined') audio.PlayedBefore = false;
			if (typeof element.audioinsert === 'undefined') element.audioinsert = [];

			var aud = new Audio(audio.fileData);

			aud.onended = function() {
				audio.Played = false;
				if (audio.PlayedBefore === false) {
					element.audioinsert.push('played');
				}
				audio.PlayedBefore = true;
				console.log(element.audioinsert.length, element.audio_data.length, audio.PlayedBefore);
				aud.remove();
			};

			audio.player = aud;
			audio.player.play();
			audio.Played = true;
			element.currentlyPlaing = index;

			if (audio.PlayedBefore === false) {
				if (element.audioinsert.length + 1 === element.audio_data.length) {
					this.checkNext();
				}
			}
		}
	}
	show_Hidden_word(element) {
		element.clicked = true;
		element.showAnim = 'bounceIn';
		this.checkNext();
	}

	reOrderParagraphDrop(event, element) {
		if (typeof element.paragraphDropped == 'undefined') element.paragraphDropped = [];
		if (typeof element.pai === 'undefined') element.pai = 0;
		if (event.dropData.dropData === element.paragraphs[element.pai]) {
			element.paragraphDropped.push({
				dropdata: event.dropData.dropData
			});
			console.log(event.dropData.dropData);
			element.paragraphsCompleted.push({
				display: 'none'
			});
			element.dropStyle = { border: '1px solid green' };
			element.pai++;
			if (element.pai === element.paragraphs.length) {
				element.hideDiv = true;
				this.checkNext();
			}
		} else {
			element.dropStyle = { border: '1px solid red' };
		}
	}
	checkMcqAnswer(mcq) {
		if (typeof mcq.correct == 'undefined') mcq.correct = false;
		if (mcq.correct === true) {
			mcq.buttonStyle = { 'background-color': 'green' };
			this.checkNext();
		} else {
			mcq.buttonStyle = { 'background-color': 'red' };
		}
	}
	checkBoxfired(mcqv, element) {
		if (typeof element.rightAns === 'undefined') element.rightAns = [];

		if (typeof mcqv.mcqclick === 'undefined') mcqv.mcqclick = 3;
		if (typeof mcqv.correct === 'undefined') mcqv.correct = false;
		if (mcqv.correct === true && mcqv.userAnswer === true) {
			mcqv.mcqclick = 1;
			element.rightAns.push(mcqv.text);

			if (element.rightAns.length === element.cmpAns.length) {
				this.checkNext();
			}
		} else if (mcqv.correct === false && mcqv.userAnswer === true) {
			mcqv.mcqclick = 2;
			mcqv.formClass = 'form1-check-input';
			mcqv.formlabelClass = 'form1-check-label';
		} else {
			mcqv.mcqclick = 3;
			mcqv.formClass = 'form-check-input';
			mcqv.formlabelClass = 'form-check-label';
		}
	}
	tryagain() {
		this.answer = new Array<string>(this.stringansl);
		this.enterstyle = [];
		this.clickbuttonstyle = [];
		this.disable = [];
		this.styleimg = {
			top: '0%',
			left: '0%',
			bottom: '20%',
			right: '0%',
			'background-color': '#fff'
		};
		this.styleimg1 = {
			top: '0%',
			left: '0%',
			bottom: '19%',
			right: '0%',
			'background-color': '#fff'
		};
		this.substr = 0;
		this.wrongstr = 0;
		this.wrongansl = 0;
		this.linkstyle = {
			color: '#000',
			cursor: 'not-allowed',
			opacity: '1',
			'text-decoration': 'none'
		};
	}

	reOrSenDrop(event, answer, reori, element) {
		if (typeof answer.sentenceDropped === 'undefined') console.log(event);
		if (typeof element.correctArray === 'undefined') element.correctArray = [];

		if (element.data[reori].node === event.dropData.dropData) {
			answer.sentenceDropped = event.dropData.dropData;
			answer.dropStyle2 = {
				border: 'none'
			};
			element.dropStyle[event.dropData.dropIndex] = {
				display: 'none'
			};
			element.correctArray.push(event.dropData.dropData);
			if (element.sentenceArray.length === element.correctArray.length) {
				this.checkNext();
			}
		} else {
			answer.dropStyle2 = {
				width: '10%',
				border: '1px dashed red',
				height: '30px',
				display: 'inline-block',
				'margin-top': '1%',
				'margin-left': '1%'
			};
		}
	}

	dropPhrase(event, element, maj) {
		if (typeof element.checkDropphraselength === 'undefined') element.checkDropphraselength = [];
		if (event.dropData.dropData === element.phrases[maj]) {
			element.phraseDropped[maj] = event.dropData.dropData;
			element.checkDropphraselength.push(event.dropData.dropData);
			console.log(element.checkDropphraselength.length);
			element.dropStyle[maj] = { border: '1px solid green' };
			element.dropStyle2[event.dropData.dropIndex] = { display: 'none' };
			if (element.checkDropphraselength.length === element.phrases.length) {
				for (let i = 0; i < element.phraseDropped.length; i++) {
					element.dropStyle[i] = { border: '1px solid green' };
				}
				this.checkNext();
			}
		} else {
			element.dropStyle[maj] = { border: '1px solid red' };
		}
	}
	checkLines(j, element) {
		console.log(element);
		if (element.lineArray[j] === element.lineModelArray[j].trim('\n')) {
			element.dropStyle[j] = {
				'border-bottom': '1px solid green'
			};
			element.lineComplete[j] = element.lineArray[j];
			if (element.lineComplete.length === element.lineArray.length) {
				this.checkNext();
			}
		} else {
			element.dropStyle[j] = {
				'border-bottom': '1px solid red'
			};
		}
	}

	dropDataend(event, i, element) {
		if (typeof element.dropWordLength === 'undefined') element.dropWordLength = [];
		if (event.dropData.dropData === element.sides.right[i]) {
			console.log(element);
			element.wordDropped[i] = event.dropData.dropData;
			element.dropWordLength.push(event.dropData.dropData);
			element.leftDropStyle[i] = { border: '1px solid green' };
			element.rightDropStyle[event.dropData.dropIndex] = { display: 'none' };
			if (element.dropWordLength.length === element.sides.right.length) {
				this.checkNext();
			}
		} else {
			element.leftDropStyle[i] = { border: '1px solid red' };
		}
	}
	check_Diff_ans_from_Form(element, fixedindex) {
		if (typeof element.fi === 'undefined') element.fi = 0;
		element.checkArray = element.data[fixedindex].node.split(',');
		if (element.checkArray.includes(element.data[fixedindex].ngmodelInput)) {
			element.data[fixedindex].checkStyle = {
				'border-bottom': '1px solid green'
			};
			element.fi++;
			if (element.fi === 2) {
				this.checkNext();
			}
		} else {
			element.data[fixedindex].checkStyle = {
				'border-bottom': '1px solid red'
			};
		}
	}

	// we get dropped element's ID and index in the array named element.data
	// if it is correct, we add a property named 'matched' to the element.data[theIndex]
	ColoredBlanks_Dropped(event) {
		// console.log(event);

		this.lessonparts[this.currentPart].screens[this.currentScreen].elements[event.elementIndex].data[
			event.theIndex
		].matched = true;

		const blanksData = this.lessonparts[this.currentPart].screens[this.currentScreen].elements[event.elementIndex]
			.data;

		let countChoices = blanksData.filter((row) => {
			return row.type === 'choices';
		});

		let choicesMatched = blanksData.filter((row) => {
			return row.type === 'choices' && row.matched === true && row.matched != undefined;
		});

		if (countChoices.length === choicesMatched.length) {
			this.checkNext();
		}
	}

	/**
   *
   * Audio Recording for Speech Recognition:
   * Step 1: Set up data for RecorderJS - You need Audio Context
   * Step 2: Save the recording as WAV
   * Step 3: Pass to the Bing api the wav blob.
   */

	StartRecording(element) {
		const self = this;
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				const input = self.audioContext.createMediaStreamSource(stream);
				self.streamRef = stream;
				self.recorder = new Recorder(input);
				self.recorder && self.recorder.clear();
				self.recorder && self.recorder.record();
				element.recordData.recording = true;

				element.timeout = setTimeout(() => {
					self.StopRecording(element);
				}, self.maxSecondsToRecord * 1000);
			})
			.catch((err) => console.log('Unable to get stream ', err));
	}

	StopRecording(element) {
		const self = this;
		this.recorder && this.recorder.stop();
		element.recordData.recording = false;
		// clear the timeout
		clearTimeout(element.timeout);
		// we need a wav encoding
		this.recorder &&
			this.recorder.exportWAV((blob) => {
				element.recordData.data = blob;

				if (element.type === 'voice_recording') {
					if (element.recordData.data) element.playAudio();
					this.checkNext();
				} else if (element.type === 'speech_recognition') {
					// do the Speech Recognition
					this.SetupBingClient(element);
					this.GetSRData(element);
				}

				// close the mic stream
				self.streamRef.getAudioTracks().forEach((track) => track.stop());
			});
	}

	SetupBingClient(element) {
		const self = this;

		this.bingClientRecognition = new BingSpeech.RecognitionClient(this.BingSvc.key1);
		this.bingClientRecognition.onFinalResponseReceived = (response) => {
			element.srData.text = response;
			element.srData.working = false;
			self.DoSRComparision(element);

			// console.log(response);
		};

		this.bingClientRecognition.onError = function(code, requestId) {
			console.log('<Error with request n°' + requestId + '>');
		};

		this.bingClientRecognition.onVoiceDetected = function() {};

		this.bingClientRecognition.onVoiceEnded = function() {};

		this.bingClientRecognition.onNetworkActivityStarted = function() {};

		this.bingClientRecognition.onNetworkActivityEnded = function() {};
	}

	GetSRData(element) {
		element.srData.working = true;
		this.bingClientRecognition.recognizeAudio(element.recordData.data);
	}

	DoSRComparision(element) {
		// first strip both the sentences of their punctuations
		let strippedSentence = element.sentence.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '');
		let strippedSR = element.srData.text.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, '');

		// we find all the words in those sentences
		// we match one against the other here and in the UI to display right or wrong words
		element.srData.strippedSentence = strippedSentence.trim().toUpperCase().split(' ');
		element.srData.strippedSR = strippedSR.trim().toUpperCase().split(' ');

		element.srData.matches = 0;
		for (let index = 0; index < element.srData.strippedSR.length; index++) {
			const wordAtSource = element.srData.strippedSentence[index];
			const wordAtSR = element.srData.strippedSR[index];

			if (wordAtSource === wordAtSR) element.srData.matches++;

			if (element.srData.matches === element.srData.strippedSentence.length) this.checkNext();
		}
	}

	MakeArray(number, fill) {
		return fill ? new Array(number).fill(fill) : new Array(number);
	}

	UserUploadOpenUploadDialog(element) {
		if (!element.filesToUpload.length) {
			const self = this;
			var input = document.createElement('input');
			input.setAttribute('type', 'file');
			input.setAttribute('accept', element.setupData.type);
			if (element.setupData.numberAllowed > 1) {
				input.setAttribute('multiple', '');
			}

			input.onchange = function() {
				element.uploadErrors = {};

				var files = input.files;

				if (files.length > element.setupData.numberAllowed) {
					element.uploadErrors.numberAllowed = true;
					return;
				}

				for (let index = 0; index < files.length; index++) {
					const file = files[index];

					if (
						element.setupData.type != '' &&
						file.type.split('/')[0] != element.setupData.type.split('/')[0]
					) {
						element.uploadErrors.type = true;
						return;
					}

					if (
						element.setupData.restraints.size != '' &&
						file.size / 1024 > element.setupData.restraints.size
					) {
						element.uploadErrors.size = true;
						return;
					}

					// no errors
					// get preview ready

					let reader: any = new FileReader();
					reader.onload = function() {
						// console.log('Read file ', file.name, reader.result);
						let previewData: any = {};
						previewData.base64 = reader.result.split(',')[1];
						previewData.blob = reader.result;
						element.filesToUpload.push({
							fileData: file,
							previewData: previewData
						});
					};
					reader.onerror = function(errors) {
						console.error('Reader error:', errors);
					};

					reader.readAsDataURL(file);

					// push to array

					if (index == files.length - 1) {
						return;
					}
				}
			};

			input.click();
		} else {
			// otherwise, just run the uplaods and get the photos resized [phase 1]
			this.GetPhotosResized(element);
			// @TODO: Phase 2: all files support
		}
	}

	GetPhotosResized(element) {
		if (element.filesToUpload.length && confirm('Upload these files?')) {
			const self = this;
			let uploadable = [];
			element.filesToUpload.forEach((file, index) => {
				uploadable.push(file.previewData);
			});

			this.logintoken.LoadComplete(true);
			this.uploadSvc.GetImagesResized(uploadable).subscribe(
				(resp: any) => {
					// console.log(resp);
					element.setupData.uploadedFiles = resp.data;
					element.filesToUpload = [];
					self.logintoken.LoadComplete(false);
					self.toastr.success('Files uploaded and saved', 'Done');
					this.checkNext();
				},
				(err: HttpErrorResponse) => {}
			);
		}
	}

	NextParagraph(element) {
		element.changingParagraph = true;

		const self = this;

		// TODO: in production, make this animated
		setTimeout(() => {
			element.currentIndex =
				element.currentIndex + 1 === element.paragraphs.length ? 0 : element.currentIndex + 1;
			element.changingParagraph = false;
		}, 500);
	}

	matrixDrop(data) {
		// all successfully dragged element has the class pos.
		// So, if three are an equal number of such items in this div as compared to randomArr of the element, it's completed
		let totalDone = $('.div_matrix_matching-' + data.elementIndex + ' .pos').length;
		let randomArr = this.lessonparts[this.currentPart].screens[this.currentScreen].elements[data.elementIndex]
			.randomArr;

		let totalEntries = 0;
		randomArr.forEach((row) => {
			totalEntries += row.length;
		});

		if (totalDone === totalEntries) {
			this.checkNext();
		}
	}

	// EOF
}

import { Component, OnInit } from '@angular/core';
import { TestQuestionService } from '../../../shared/test-questions/test-question.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewTestQuestion } from './new-test-questions.model';
import { FormsModule } from '@angular/forms';
import { IntelligenceService } from '../../../shared/intelligences/intelligence.service';
import { ToastrService } from 'ngx-toastr';
import { EncodeHtmlPipe } from '../../../pipes/encode-html.pipe';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-test-questions',
	templateUrl: './test-questions.component.html',
	styleUrls: [ './test-questions.component.scss' ],
	providers: [ EncodeHtmlPipe ]
})
export class TestQuestionsComponent implements OnInit {
	questions: any[];
	modalRef: NgbModalRef = null;
	modalactive: any;
	newTestQuestion: NewTestQuestion;
	intelligences: any[];
	working = true;
	selectedQuestion_id: any;
	deleteQuestion_id: any;
	selectedQuestion = {
		intelligence_id: null,
		intelligence_title: null,
		body: null
	};
	closeResult: string;

	constructor(
		private questionsService: TestQuestionService,
		private IntelSvs: IntelligenceService,
		private modal: NgbModal,
		private toastr: ToastrService,
		private encodeHtmlPipe: EncodeHtmlPipe,
		private router: Router,
		private route: ActivatedRoute,
		public activeModal: NgbActiveModal
	) {}

	ngOnInit() {
		this.GetQuestions();
		this.ResetSelectedQuestion();
		this.ResetTestQuestion();
		this.getIntelligencs();
	}
	getIntelligencs() {
		this.IntelSvs.getIntelligences().subscribe(
			(resp: any) => {
				resp.map((row, index) => {
					row.editing = false;
					row.newTitle = row.title;
					row.working = false;
				});
				this.intelligences = resp;
				console.log(this.intelligences);
			},
			(err: HttpErrorResponse) => {
				console.log('error fetching Intels:', err);
			}
		);
	}
	ResetSelectedQuestion() {
		this.selectedQuestion = {
			intelligence_id: null,
			intelligence_title: null,
			body: null
		};
	}
	ResetTestQuestion() {
		this.newTestQuestion = {
			intelligence_id: null,
			body: ''
		};
	}
	GetQuestions() {
		this.questionsService.GetQuestions().subscribe(
			(resp: any) => {
				this.questions = resp.questions;
			},
			(err: HttpErrorResponse) => {
				console.error(err);
			}
		);
	}

	ShowEditModal(editModalContent, groupIndex, questionIndex) {
		console.log(groupIndex, questionIndex);
		this.ResetSelectedQuestion();
		const group = this.questions[groupIndex];
		const question = group.questions[questionIndex];
		this.selectedQuestion_id = group.questions[questionIndex].id;
		this.selectedQuestion.intelligence_id = group.intelligence_id;
		this.selectedQuestion.intelligence_title = group.intelligence_title;
		this.selectedQuestion.body = question.body;
		console.log(this.selectedQuestion_id);

		this.modalRef = this.modal.open(editModalContent);
	    this.modalRef.result.then(result => {}, reason => {});
	}
	ShowAddModal(addModalContent) {
		this.modalRef = this.modal.open(addModalContent);
	    this.modalRef.result.then(result => {}, reason => {});
	}

	CloseModal() {
		this.modalRef.close();
		this.modalRef = null;
	}
	AddTestQuestion() {
		let data = {
			intelligence_id: this.newTestQuestion.intelligence_id,
			body: this.encodeHtmlPipe.transform(this.newTestQuestion.body, 'encode')
		};
		this.working = true;
		if (data.body == '' || data.body.length < 1) {
			this.toastr.error('Question cannot be empty.', 'Invalid Input');
			this.working = false;
		} else {
			this.questionsService.StoreNewQuestion(data).subscribe(
				(resp: any) => {
					resp.data.map((row, index) => {
						row.editing = false;
						row.working = false;
						this.newTestQuestion.body = '';
						this.newTestQuestion.intelligence_id = null;
						this.working = false;
					});
					this.CloseModal();
					this.toastr.success('Please wait while the list reloads', 'Success');
					this.GetQuestions();
				},
				(err: HttpErrorResponse) => {
					this.toastr.error('Please check the input', 'Unable to store');
					this.working = false;
				}
			);
		}
	}
	UpdateTestQuestion() {
		let data = {
			body: this.encodeHtmlPipe.transform(this.selectedQuestion.body, 'encode')
		};
		this.working = true;
		if (data.body == '' || data.body.length < 1) {
			this.toastr.error('Question cannot be empty.', 'Invalid Input');
			this.working = false;
		} else {
			this.questionsService.UpdateQuestion(this.selectedQuestion_id, data).subscribe(
				(resp: any) => {
					resp.data.map((row, index) => {
						row.editing = false;
						row.working = false;

						this.selectedQuestion_id = null;
						this.working = false;
					});
					this.CloseModal();
					this.toastr.success('Please wait while the list reloads', 'Success');
					this.GetQuestions();
				},
				(err: HttpErrorResponse) => {
					this.toastr.error('Please check the input', 'Unable to store');
					this.working = false;
				}
			);
		}
	}
	DeleteQuestion(groupIndex, questionIndex) {
		const group = this.questions[groupIndex];
		this.deleteQuestion_id = group.questions[questionIndex].id;
		if (confirm('Are you sure? \nYou cannot undo this.')) {
			this.questionsService.DeleteQuestion(this.deleteQuestion_id).subscribe((resp) => {
				this.deleteQuestion_id = null;
				this.CloseModal();
				this.GetQuestions();
				this.toastr.success('The course has been removed', 'Success');
			});
		}
	}
}

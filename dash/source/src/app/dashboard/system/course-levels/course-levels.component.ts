import { Component, OnInit } from '@angular/core';
import { NewCourseLevel } from './new-course-level';
import { CourseLevel } from './course-level';
import { CourseLevelService } from '../../../shared/course-levels/course-level.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DragulaService } from 'ng2-dragula';
import { LanguageService } from '../../../shared/languages/language.service';

declare let $: any;

function _window(): any {
	return window;
}
function _document(): any {
	return document;
}

@Component({
	selector: 'app-course-levels',
	templateUrl: './course-levels.component.html',
	styleUrls: [ './course-levels.component.scss' ]
})
export class CourseLevelsComponent implements OnInit {
	closeResult: string;
	newLevel: NewCourseLevel;
	courseLevels: any[];
	working: boolean = false;
	sortedCourseLevels: any;
	languages: any = [];
	public tinymceInit: any = {};

	constructor(
		private levelSvc: CourseLevelService,
		private toastr: ToastrService,
		private modalService: NgbModal,
		private dragulaService: DragulaService,
		private languageSvc: LanguageService
	) {
		this.newLevel = { title: '', order: null };

		this.tinymceInit = {
			plugins: [
				'advlist autolink lists link image charmap print preview hr anchor pagebreak',
				'searchreplace wordcount visualblocks visualchars code fullscreen',
				'insertdatetime media nonbreaking save table contextmenu directionality',
				'emoticons template paste textcolor colorpicker textpattern'
			],
			toolbar:
				'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
			image_advtab: true,
			hieght: 500,
			file_picker_callback: function(cb, value, meta) {
				var input = document.createElement('input');
				input.setAttribute('type', 'file');
				input.setAttribute('accept', 'image/*');

				// Note: In modern browsers input[type="file"] is functional without
				// even adding it to the DOM, but that might not be the case in some older
				// or quirky browsers like IE, so you might want to add it to the DOM
				// just in case, and visually hide it. And do not forget do remove it
				// once you do not need it anymore.

				input.onchange = function() {
					var file = input.files[0];

					var reader = new FileReader();
					reader.onload = function() {
						// Note: Now we need to register the blob in TinyMCEs image blob
						// registry. In the next release this part hopefully won't be
						// necessary, as we are looking to handle it internally.
						var id = 'blobid' + new Date().getTime();
						var blobCache = _window().tinymce.activeEditor.editorUpload.blobCache;
						var base64 = (reader.result as string).split(',')[1];
						var blobInfo = blobCache.create(id, file, base64);
						blobCache.add(blobInfo);

						// call the callback and populate the Title field with the file name
						cb(blobInfo.blobUri(), { title: file.name });
					};
					reader.readAsDataURL(file);
				};

				input.click();
			}
		}; //tinymce ends
	}

	ngOnInit() {
		this.GetLevels();
		this.getLanguages();
	}

	trackByFn(row, index) {
		return index;
	}

	getLanguages() {
		this.working = true;
		this.languageSvc.getLanguages().subscribe(
			(resp: any) => {
				this.languages = resp.languages;
				this.working = false;
			},
			(err: HttpErrorResponse) => {
				console.log('error fetching Languages:', err);
				this.working = false;
			}
		);
	}

	GetLevels() {
		this.working = true;
		this.levelSvc.getCourseLevels().subscribe(
			(resp: any) => {
				resp.map((row, index) => {
					row.editing = false;
					row.newTitle = row.title;
					row.newOrder = row.order;
					row.working = false;
				});
				this.courseLevels = resp;
				this.working = false;
			},
			(err: HttpErrorResponse) => {
				console.log('error fetching course levels.', err);
				this.working = false;
			}
		);
	}

	UpdateCourseLevel(intel) {
		intel.working = true;
		if (intel.title === '') {
			this.toastr.error('The title cannot be empty', 'Invalid Input');
			intel.working = false;
		} else {
			this.levelSvc.UpdateCourseLevel(intel).subscribe(
				(resp: any) => {
					intel = resp.data;
					intel.newTitle = intel.title;
					intel.newOrder = intel.order;
					intel.editing = false;
					intel.working = false;
					this.toastr.success('The level was updated. Plesae wait while the list reloads.', 'Success');
					this.GetLevels();
					this.toastr.success('List reloaded', 'Done');
				},
				(err: HttpErrorResponse) => {
					console.error(err);
					this.toastr.error(
						'Sorry, there was an error processing your request. Please check all inputs and try again.',
						'Failed'
					);
					intel.working = false;
				}
			);
		}
	}

	AddCourseLevel() {
		this.working = true;
		if (this.newLevel.title == '' || this.newLevel.title.length < 1) {
			this.toastr.error('Please provide a title for the level.', 'Invalid Input');
			this.working = false;
		} else {
			this.levelSvc.StoreNewCourseLevel(this.newLevel).subscribe(
				(resp: any) => {
					resp.data.map((row, index) => {
						row.editing = false;
						row.newTitle = row.title;
						row.newOrder = row.order;
						row.working = false;
					});
					this.toastr.success('Please wait while the list reloads', 'Success');
					this.courseLevels = resp.data;
					this.newLevel = { title: '', order: null };
					this.toastr.success('The list has been reloaded', 'Done');
					this.working = false;
				},
				(err: HttpErrorResponse) => {
					this.toastr.error('Please check the input', 'Unable to store');
					this.working = false;
				}
			);
		}
	}

	RemoveCourseLevel(level) {
		if (confirm('WARNING! \nAre you sure you want to do this? \nThis action cannote be undone.')) {
			level.working = true;
			this.levelSvc.DeleteCourseLevel(level.id).subscribe(
				(resp: any) => {
					this.courseLevels.splice(this.courseLevels.indexOf(level), 1);
					this.toastr.success('The item was removed.', 'Removed');
				},
				(err: HttpErrorResponse) => {
					this.toastr.error('There was a problem deleting the item. Please try again.', 'Error');
					level.working = false;
					console.log(err);
				}
			);
		}
	}

	openSortingModal(content) {
		const originalOrder = JSON.parse(JSON.stringify(this.courseLevels));
		this.modalService.open(content, { centered: true }).result.then(
			(result) => {
				if (result === 'save') {
					this.SaveOrder(this.sortedCourseLevels);
				}
			},
			(reason) => {
				this.courseLevels = originalOrder;
			}
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

	ResetLevelInfo(level) {
		level.newTitle = level.title;
		level.newOrder = level.order;
	}

	SaveOrder(obj) {
		this.working = true;
		this.toastr.warning('Please wait...', 'Sorting Levels', {
			disableTimeOut: true
		});
		this.levelSvc.SaveOrder(obj).subscribe(
			(resp: any) => {
				this.toastr.clear();
				this.toastr.success('The order has been saved', 'Success');
				this.GetLevels();
				this.working = false;
			},
			(err: HttpErrorResponse) => {
				this.toastr.error('Please try again', 'Unable to store');
				this.working = false;
			}
		);
	}

	PrepareArrayForUpdate(event) {
		this.sortedCourseLevels = event;
	}

	// EOF
}

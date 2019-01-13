import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../../../shared/courses/course.service';
import { CourseModuleService } from '../../../../../shared/modules/course-module.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LessonService } from '../../../../../shared/lessons/lesson.service';

@Component({
  selector: 'app-module-details',
  templateUrl: './module-details.component.html',
  styleUrls: ['./module-details.component.scss']
})
export class ModuleDetailsComponent implements OnInit {

  course_id: number;
  module_id: number;
  course: any;
  module: any;
  working: boolean = false;
  modalRef: NgbModalRef = null;
  newLesson: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private moduleService: CourseModuleService,
    private lessonService: LessonService,
    private modal: NgbModal,
    private toastr: ToastrService
  ) { 
    route.params.subscribe((resp) => {
      this.course_id = resp.id;
      this.module_id = resp.moduleID;
    });
  }

  ngOnInit() {
    this.working = true;
    this.courseService.GetCourse(this.course_id).subscribe((resp : any) => {
      this.course = resp.course;
      this.working = false;
    }, (err: HttpErrorResponse) => {
      console.error(err);
      this.working = false;
    });

    this.GetModule();

    this.SetNewLesson();
    
  }

  GetModule() {
    this.working = true;
    this.moduleService.GetModule(this.module_id).subscribe((resp : any) => {
      this.module = resp.module;
      this.SetUpdateData();
      this.working = false;
    }, (err: HttpErrorResponse) => {
      console.error(err);
      this.working = false;
    });
  }
  

  SetUpdateData() {
    this.module.newTitle = this.module.title;
    this.module.newVisibility = this.module.active;
    this.module.newFree = this.module.free;
    this.module.newPrice = this.module.price;
  }

  ChangeModulePage() {
    this.working = true;
    this.router.navigateByUrl('/dashboard/content/courses/details/' + this.course_id + '/module/' + this.module_id);
    this.ngOnInit();
    window.scrollTo(0,0);
  }

  SetNewLesson(): any {
    this.newLesson.title = '';
    this.newLesson.visibility = 1;
    this.newLesson.description = '';
  }

  OpenNewLessonModal(addLessonModal) {
    this.modalRef = this.modal.open(addLessonModal);
    this.modalRef.result.then((done) => {
      this.SetNewLesson();
    }, (rejected) => {
      this.SetNewLesson();
    });
  }


  OpenEditModal(editModal) {
    this.modalRef = this.modal.open(editModal);
    this.modalRef.result.then((done) => {
      this.modalRef = null;
      this.SetUpdateData();
    }, (rejected) => {
      this.modalRef = null;
      this.SetUpdateData();
    });
  }

  UpdateModule() {
    

    if( 
      this.module.newTitle == '' || 
      this.module.newVisibility == '' || 
      (this.module.newFree == false && this.module.newPrice == '') || 
      (this.module.newFree == false && this.module.newPrice == null) 
    ) {
      this.toastr.warning('All inputs are required', 'Invalid Input');
      return;
    }

    this.working = true;  

    this.moduleService.UpdateModule(this.module.id, {
      title: this.module.newTitle,
      active: this.module.newVisibility,
      free: this.module.newFree,
      price: this.module.newPrice,
    }).subscribe((resp : any) => {
      this.GetModule();
      this.working = false;
      this.toastr.success('Module updated', 'Success');
      this.modalRef.close();
      this.modalRef = null;
    }, (err: HttpErrorResponse) => {
      this.working = false;
      this.toastr.error('Module was not updated', 'Error');
    });
  }

  DeleteModule() {
    if(confirm('Are you sure? \nYou cannot undo this.')) {
      this.moduleService.DeleteModule(this.module.id).subscribe((resp) => {
        this.modalRef.close();
        this.modalRef = null;
        this.router.navigateByUrl('/dashboard/content/courses/details/' + this.course_id);
        this.toastr.success('The Module has been removed', 'Success');
        
      });
    }
  }

  AddLesson() {
    if(!this.newLesson.title) {
      this.toastr.warning('Please enter a title for the lesson', 'Input Error');
    }
    else {
      this.working = true;
      this.newLesson.module_id = this.module.id;

      this.lessonService.SaveLesson(this.newLesson).subscribe((resp : any ) => {
        this.CloseModal();
        this.working = false;
        this.SetNewLesson();
        this.toastr.success('List of Lessons updated.','Lesson has been added');
        this.module.lessons.push( resp.lesson );
        
      }, (err: HttpErrorResponse) => {
        console.error(err);
        this.working = false;
      });
    }
  }

  /**
   * Cloases the Modal
   */
  CloseModal() {
    this.modalRef.close();
    this.modalRef = null;
  }


  // eof
}

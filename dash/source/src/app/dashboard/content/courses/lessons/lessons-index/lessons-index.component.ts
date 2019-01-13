import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LessonService } from '../../../../../shared/lessons/lesson.service';
import { HttpErrorResponse } from '@angular/common/http';
import { isPlatformWorkerApp } from '@angular/common';
import { PartDataService } from '../../../../../shared/parts/part-data.service';
import { ExerciseService } from '../../../../../shared/exercises/exercise.service';

@Component({
  selector: 'app-lessons-index',
  templateUrl: './lessons-index.component.html',
  styleUrls: ['./lessons-index.component.scss']
})
export class LessonsIndexComponent implements OnInit {
  

  lesson_id: number = null;
  parts: any = null;

  lesson: any = {};
  module: any = {};
  course: any = {};
  modalRef: NgbModalRef = null;
  working: boolean = false;
  exercises : any[]  = [];
  sortedExerciseIds : any = [];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private modal: NgbModal,
    private lessonService: LessonService,
    private partSvc: PartDataService,
    private exercise: ExerciseService
  ) { 
    this.route.params.subscribe((resp) => {
      this.lesson_id = resp.lessonID;
    });
  }

  ngOnInit() {
    this.GetLesson(this.lesson_id);
    this.GetExercises();
  }
  
  GetExercises() {
    this.exercise.getExercises(this.lesson_id).subscribe((resp : any) => {
      this.exercises = resp.exercises;
      
    }, (err: HttpErrorResponse) => {
      console.log(err);
      
    });
  }

  

  /**
   * Cloases the Modal
   */
  CloseModal() {
    this.modalRef.close();
    this.modalRef = null;
  }

  // handles the waaiting visuals
  IsWorking() {
    this.working = true;
  }

  NotWorking() {
    this.toastr.clear();
    this.working = false;
  }

  GetLesson(id) {
    this.IsWorking();
    this.lessonService.GetLesson(id).subscribe((resp : any) => {
      this.lesson = resp.lesson;
      this.module = resp.module;
      this.course = resp.course;
      this.SetUpdateData();
      this.NotWorking();
    }, (err: HttpErrorResponse) => {
      console.error(err);
      this.NotWorking();
      this.toastr.error('Error loading lesson', 'Not found');
    });
  }

  SetUpdateData() {
    this.lesson.newTitle = this.lesson.title;
    this.lesson.newDescription = this.lesson.description;
    this.lesson.newVisibility = this.lesson.active;
  }

  ChangeLessonPage() {
    this.working = true;
    this.router.navigateByUrl('/dashboard/content/courses/details/' + this.course.id + '/module/' + this.module.id + '/lesson/' + this.lesson_id);
    this.ngOnInit();
    window.scrollTo(0,0);
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

  UpdateLesson() {
    this.working = true;
    this.lessonService.UpdateLesson(this.lesson.id, {
      title: this.lesson.newTitle,
      active: this.lesson.newVisibility,
      description: this.lesson.newDescription
    }).subscribe((resp : any) => {
      this.lesson.title = this.lesson.newTitle;
      this.lesson.active = parseInt(this.lesson.newVisibility);
      this.lesson.description = this.lesson.newDescription;
      this.working = false;
      this.toastr.success('Lesson updated', 'Success');
      this.modalRef.close();
      this.modalRef = null;
    }, (err: HttpErrorResponse) => {
      this.working = false;
      this.toastr.error('Lesson was not updated', 'Error');
    });
  }

  DeleteLesson() {
    if(confirm('Are you sure? \nYou cannot undo this.')) {
      this.lessonService.DeleteLesson(this.lesson.id).subscribe((resp) => {
        this.modalRef.close();
        this.modalRef = null;
        this.router.navigateByUrl('/dashboard/content/courses/details/' + this.course.id + '/module/' + this.module.id);
        this.toastr.success('The Lesson has been removed', 'Success');
        
      });
    }
  }


  DeletePart(id, index) {
    if(confirm('Are you sure? This cannot be undone.')) {
      this.working = true;
      this.partSvc.DeletePart(id).subscribe((resp: any) => {
        this.toastr.success('The part was deleted', 'Done');
        this.parts.splice(index, 1);
        this.working = false;
      }, (err: HttpErrorResponse) => {
        console.log(err);
        this.toastr.error('Error deleting the part','Error');
        this.working = false;
        
      });
    }
  }

  AddExercise() {
    // TODO: Must have Ajax do it and added here
    
    this.IsWorking();

    this.exercise.StoreNewExercise(this.lesson_id).subscribe((resp : any) => {
      // console.log(resp);
      var ex = resp.exercise;
      ex.parts = resp.parts;
      this.exercises.push(ex);

      this.NotWorking();
      this.toastr.success('The section was added', 'Success');

    }, (err: HttpErrorResponse) => {
      console.log(err);
      
      this.NotWorking();
      this.toastr.error('The section was not added', 'Error');
    });
  }

  UpdateExerciseStatus(exercise, status) {
    this.IsWorking();

    this.exercise.UpdateExerciseStatus(exercise.id, status).subscribe((resp : any) => {
      this.NotWorking();

      exercise.public = status;
      this.toastr.success('The status was updated', 'Success');
    }, (err: HttpErrorResponse) => {
      this.NotWorking();
      console.log(err);
      
      this.toastr.error(err.error.message, 'Error');
    });
  }

  UpdateExerciseTitle(exercise) {
    
    exercise.renaming = true;

    this.exercise.UpdateExerciseTitle(exercise.id, exercise.title).subscribe((resp : any) => {
      exercise.renaming = false;
      this.toastr.success('The title was updated', 'Success');
    }, (err: HttpErrorResponse) => {
      exercise.renaming = false;
      console.log(err);      
      this.toastr.error(err.error.message, 'Error');
    });
  }

  OpenSortingModal(sortingModal) {
    this.modalRef = this.modal.open(sortingModal);
    this.modalRef.result.then((done) => {
      this.modalRef = null;
      // this.SaveExerciseSorting();
    }, (rejected) => {
      this.modalRef = null;
      
    });
  }

  PreparingExerciseSorting(event) {
    this.sortedExerciseIds = event;
  }

  SaveExerciseSorting() {
    if(this.sortedExerciseIds.length) {
      this.IsWorking();
      this.lessonService.UpdateExerciseSorting(this.lesson_id, this.sortedExerciseIds).subscribe((resp: any) => {
        this.NotWorking();
        this.CloseModal();
        this.toastr.success('The order was saved', 'Success');
        this.GetExercises();
      }, (err: HttpErrorResponse) => {
        this.NotWorking();
      });
    }
  }

  DeleteExercise(id, index) {
    this.IsWorking();
    if(confirm("Are you sure? \nThis action cannot be undone. This will: \n -> Delete all Parts under it permanently. \n -> Delete the exercise parmanently. \nProceed?")) {
      this.exercise.DeleteExercise(id).subscribe((resp: any) => {
        this.exercises.splice(index, 1);
        this.NotWorking();
        this.toastr.success(resp.message,"Success");
      }, (err: HttpErrorResponse) => {
        this.NotWorking();
        console.log(err);
        this.toastr.error('An error ocurred while trying to delete the exercise', 'Error');
        
      });
    }
  }

  // eof
}

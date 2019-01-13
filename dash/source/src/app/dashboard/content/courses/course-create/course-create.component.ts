import { Component, OnInit } from '@angular/core';
import { CourseLevelService } from '../../../../shared/course-levels/course-level.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NewCourse } from './new-course.model';
import { CourseService } from '../../../../shared/courses/course.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit {

  courseLevels: any = [];
  newCourse: NewCourse;

  constructor(private courseLevelSvc: CourseLevelService, private courseSvc: CourseService, private toastr: ToastrService, private router: Router) {
    this.ResetCourse();
  }

  ngOnInit() {
    this.courseLevelSvc.getCourseLevels().subscribe((resp : any) => {
      this.courseLevels = resp;
    }, (err: HttpErrorResponse) => {
            
    });
  }
  ResetCourseButton() {
    this.ResetCourse();
    this.toastr.success('Successfully Reset', 'Success');

  }
  ResetCourse() {
    this.newCourse = {
      title: '',
      level: null
    }
  }


  StartCourse() {
    
    if(this.newCourse.title.length === 0) {
      this.toastr.error('Please provide a title', 'Invalid input');
    }
    else if( this.newCourse.level === null || !this.newCourse.level ) {
      this.toastr.error('Please select a level', 'Invalid input');
    }
    else {
      var data = {
        title: this.newCourse.title,
        course_level_id: this.newCourse.level
      }
      this.courseSvc.SaveCourse(data).subscribe((resp : any) => {
        this.ResetCourse();
        this.toastr.success('The course has been saved', 'Success');
        this.router.navigateByUrl('/dashboard/content/courses/details/' + resp.course.id);
      }, (err: HttpErrorResponse) => {
        this.toastr.error('There was an error saving the Course', 'Error');
        console.error(err);
        
      });
    }
  }



}

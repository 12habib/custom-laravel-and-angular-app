import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../shared/courses/course.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-courses-index',
  templateUrl: './courses-index.component.html',
  styleUrls: ['./courses-index.component.scss']
})
export class CoursesIndexComponent implements OnInit {

  courses: any[];
  
  constructor(private courseService: CourseService) {

  }

  ngOnInit() {
    this.courseService.GetCourses().subscribe((resp : any) => {
      this.courses = resp.courses;
    }, (err: HttpErrorResponse) => {

    });
  }

}

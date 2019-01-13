import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonsService } from '../../shared/lessons/lessons.service';

@Component({
  selector: 'app-lessondetails',
  templateUrl: './lessondetails.component.html',
  styleUrls: ['./lessondetails.component.scss']
})
export class LessondetailsComponent implements OnInit {
 lessonid:any;
 lessonparts=[];
  constructor( private route:ActivatedRoute, private lessonsService : LessonsService,private router:Router) { }

  ngOnInit() {
    let id=parseInt(this.route.snapshot.paramMap.get('id'));
    this.lessonid=id;
    this.lessonsService.LessonParts(this.lessonid).subscribe((resp:any)=>{
       this.lessonparts=resp.parts;
       console.log(this.lessonparts);
    });
  }
  navigate(part){

  }

}

import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "../../shared/user/user.service";
import { HttpErrorResponse } from "../../../../node_modules/@angular/common/http";
import { LoginTokenService } from "../../shared/loginToken/login-token.service";
import { ModalDirective } from "angular-bootstrap-md";
import { CourseModuleService } from "src/app/shared/course_modules/course-module.service";
import { LessonsService } from "../../shared/lessons/lessons.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  @ViewChild("levelChooserModal") levelChooserModal: ModalDirective;

  modalConfig: any = {};
  user: any = {};
  levels: any = [];
  selectedLevelIndex = "";
  intelligences:any=[];
  isHidden:any = [];
  CourseModules:any;
  Lessons:any;
  constructor(
    private userService: UserService,
    private logintoken: LoginTokenService,
    private moduleSvc: CourseModuleService,
    private lessonsService: LessonsService,
    private router: Router
  ) {
    this.logintoken.LoadComplete(true);
    this.modalConfig = {
      backdrop: "static",
      ignoreBackdropClick: true
    };
  }
  openAccordin(index){
    if(this.isHidden[index]===false){
    this.isHidden[index]= true;
  }else{
    this.isHidden[index]=false;
  }
  }
  GetModules() {
    this.moduleSvc.GetModules().subscribe(
      (resp: any) => {
        this.CourseModules = resp.modules;
        // this.CourseModules.map((m, i) => {
        //   if (m.course != null) {
        //     m.course.description = decodeURIComponent(m.course.description);
        //   }
        // });
      },
      (err: HttpErrorResponse) => {
        alert(
          "Sorry, there was an error loading the modules. Please reload the page"
        );
        console.error("Error loading modules: ", err);
      }
    );
  }
 GetLessonsForDemo() {
    this.lessonsService.Lessons().subscribe(
      (resp: any) => {
        this.CourseModules = resp.modules;
        this.Lessons = resp.lessons;
        // this.CourseModules.map((m, i) => {
        //   if (m.course != null) {
        //     m.course.description = decodeURIComponent(m.course.description);
        //   }
        // });
        for(let i=0; i<this.CourseModules.length; i++){
          for(let j=0;j<this.Lessons.length;j++){
              if(this.Lessons[j].module_id===this.CourseModules[i].id){
                if(this.CourseModules[i].lessons===undefined){
                  this.CourseModules[i].lessons=[];
                  this.CourseModules[i].lessons.push(this.Lessons[j]);
                }else{
                this.CourseModules[i].lessons.push(this.Lessons[j]);
              }
              }
          }
        }
        for(let i=0; i<this.CourseModules.length;i++){
          this.isHidden[i]=true;
        }
        console.log(this.CourseModules);      },
      (err: HttpErrorResponse) => {
        alert(
          "Sorry, there was an error loading the lessons. Please reload the page"
        );
        console.error("Error loading modules: ", err);
      }
    );
  }
  navigate(lesson) {
    

    this.router.navigate(["/lesson/", lesson.id, "study"]);
  }

  ngOnInit() {
    this.GetCurrentUser();
    this.GetLevels();
    this.GetIntProfile();
    
    this.GetLessonsForDemo();


  }

  GetLevels() {
    this.userService.GetAllLevels().subscribe(
      (resp: any) => {
        this.levels = resp;

      },
      (err: HttpErrorResponse) => {}
    );
  }
  GetIntProfile() {
    this.userService. GetIntelProfile().subscribe(
      (resp: any) => {
        this.intelligences=JSON.parse(resp.info.top_five)
      
       
      },
      (err: HttpErrorResponse) => {}
    );
  }

  ShowLevelChoser() {
    this.levelChooserModal.show();
  }

  GetCurrentUser() {
    this.logintoken.LoadComplete(true);
    this.userService.CurrentUser().subscribe(
      (resp: any) => {
        this.user = resp;
     
        this.user.currentLanguageID = 0;
        // if (!this.user.course_level_id) {
        //   this.ShowLevelChoser();
        // }
        this.logintoken.LoadComplete(false);
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this.logintoken.LoadComplete(false);
      }
    );
  }

  SaveLevel() {
    if (this.selectedLevelIndex && this.levels[this.selectedLevelIndex]) {
      if (confirm("Are you sure?")) {
        const that = this;
        this.logintoken.LoadComplete(true);
        console.log(this.levels[this.selectedLevelIndex].id);
        this.userService
          .ChangeLevel(this.levels[this.selectedLevelIndex].id)
          .subscribe((resp: any) => {
            that.levelChooserModal.hide();
            that.selectedLevelIndex = "";
            that.GetCurrentUser();
            that.logintoken.LoadComplete(false);
          });
      }
    }
  }

  // eof
}

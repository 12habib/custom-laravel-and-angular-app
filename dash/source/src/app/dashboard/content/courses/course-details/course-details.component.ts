import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { CourseService } from "../../../../shared/courses/course.service";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { CourseModuleService } from "../../../../shared/modules/course-module.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { EncodeHtmlPipe } from "../../../../pipes/encode-html.pipe";
@Component({
  selector: "app-course-details",
  templateUrl: "./course-details.component.html",
  styleUrls: ["./course-details.component.scss"],
  providers: [EncodeHtmlPipe]
})
export class CourseDetailsComponent implements OnInit {
  course: any = null;
  courseId: number;
  closeResult: string;
  newPhoto: any = {};
  coverPhotoErrors: any = [];
  allowedSize: number = 200 * 1024; // let the compiler do the math
  modalRef: NgbModalRef = null;

  newModule: any = {};

  public sorce;
  constructor(
    private toastr: ToastrService,
    private courseSvc: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private moduleService: CourseModuleService,
    private encodeHtmlPipe: EncodeHtmlPipe
  ) {
    this.route.params.subscribe((resp: any) => {
      this.courseId = resp.id;
    });
  }

  ngOnInit() {
    this.SetNewModule();
    this.GetCourses();
  }

  GetCourses() {
    this.courseSvc.GetCourse(this.courseId).subscribe(
      (resp: any) => {
        resp.course.newTitle = resp.course.title;
        resp.course.newDescription = resp.course.description;
        this.course = resp.course;
      },
      (err: HttpErrorResponse) => {
        console.log("error - ", err);
      }
    );
  }

  SetNewModule() {
    this.newModule.title = "";
    this.newModule.active = 1;
    this.newModule.course_id = this.courseId;
    this.newModule.free = 0;
    this.newModule.price = 100;
  }

  Delete(id) {}

  OpenCoverPhotoChangeModal(photoSelectModal) {
    this.modalService.open(photoSelectModal).result.then(
      result => {
        this.closeResult = result;
      },
      reason => {
        this.closeResult = reason;
        this.coverPhotoErrors = [];
        this.newPhoto = {};
      }
    );
  }

  HandleCoverPhotoSelection(files: FileList) {
    this.coverPhotoErrors = [];
    this.newPhoto = {};
    const self = this;

    if (files.length) {
      var file = files[0];
      var oversized = file.size > this.allowedSize;
      if (oversized) {
        this.coverPhotoErrors.push(
          "The selected file is too large. Please resize it or select another photo."
        );
        return false;
      } else {
        let reader = new FileReader();

        reader.onload = event => {
          let target: any = event.target;
          self.newPhoto = target.result;
        };

        reader.readAsDataURL(file);
      }
    }
  }

  UploadCoverPhoto() {
    this.toastr.warning("Uploading file....", "Please wait", {
      disableTimeOut: true
    });
    const formdata = new FormData();
    formdata.append("id", this.courseId.toString());
    formdata.append("cover_photo", this.newPhoto);

    this.courseSvc.UpdateCoverPhoto(formdata).subscribe(
      (resp: any) => {
        this.course.cover_photo_url = resp.cover_photo_url;
        this.toastr.clear();
        this.toastr.success("Photo updated. Reloading page", "Success");
        setTimeout(() => location.reload(), 1000);
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this.toastr.clear();
        this.toastr.error("There was an error uploading the photo", "Error");
      }
    );
  }

  RemoveCoverPhoto() {
    if (confirm("Are you sure? \nYou cannot undo this.")) {
      this.courseSvc.RemoveCoverPhoto(this.course.id).subscribe(resp => {
        this.course.cover_photo_url = null;
        this.toastr.success("Photo removed", "Success");
      });
    }
  }

  DisplayCourseEditModal(courseEditModal) {
    this.course.newTitle = this.course.title;
    this.course.newDescription = this.encodeHtmlPipe.transform(
      this.course.description,
      "decode"
    );
    this.modalRef = this.modalService.open(courseEditModal);
    this.modalRef.result.then(result => {}, reason => {});
  }

  UpdateCourseInfo() {
    let data = {
      title: this.course.newTitle,
      description: this.encodeHtmlPipe.transform(
        this.course.newDescription,
        "encode"
      )
    };

    if (!data.description) {
      this.toastr.warning("Description cannot be empty", "Invalid Input");
      return;
    }

    if (!data.title) {
      this.toastr.warning("Title cannot be empty", "Invalid Input");
      return;
    }

    this.toastr.warning("Updating course information....", "Please wait", {
      disableTimeOut: true
    });
    this.courseSvc.UpdateCourse(this.course.id, data).subscribe(
      (resp: any) => {
        this.course = resp.course;
        // window.location.reload();
        this.modalRef.close();
        this.modalRef = null;
        this.toastr.clear();
        this.toastr.success("Course updated", "Success");
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this.toastr.clear();
        var errors = err.error.errors;
        this.toastr.error(
          "There was an error. Please check the input.",
          "Error"
        );
      }
    );
  }

  DeleteCourse() {
    if (confirm("Are you sure? \nYou cannot undo this.")) {
      this.courseSvc.DeleteCourse(this.course.id).subscribe(resp => {
        this.modalRef.close();
        this.modalRef = null;
        this.router.navigateByUrl("/dashboard/content/courses");
        this.toastr.success("The course has been removed", "Success");
      });
    }
  }

  OpenNewModuleModal(newModuleModal) {
    this.modalRef = this.modalService.open(newModuleModal);
    this.modalRef.result.then(
      done => {
        this.SetNewModule();
      },
      rejected => {
        this.SetNewModule();
      }
    );
  }

  StoreNewModule() {
    if (!this.newModule.title) {
      this.toastr.error("Please insert a title", "Error");
      return false;
    } else {
      this.moduleService.StoreNewModule(this.newModule).subscribe(
        (resp: any) => {
          this.toastr.warning("Please wait...", "Working", {
            disableTimeOut: true
          });
          this.modalRef.close();
          this.modalRef = null;
          resp.module.active =
            parseInt(resp.module.active) === 1 ? true : false; // we have to do this to parse int to boolean
          this.course.modules.push(resp.module);
          this.toastr.clear();
          this.toastr.success("The module has been added", "Done");
          this.SetNewModule();
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          this.toastr.clear();
          this.toastr.error("The module could not be added", "Error");
        }
      );
    }
  }
}

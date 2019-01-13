import { Component, OnInit } from "@angular/core";
import { LessonsService } from "../../shared/lessons/lessons.service";
import { Router } from "@angular/router";
import { LoginTokenService } from "../../shared/loginToken/login-token.service";
import { ToastrService } from 'ngx-toastr';
import { CourseModuleService } from "src/app/shared/course_modules/course-module.service";
import { HttpErrorResponse } from "@angular/common/http";
import {
  PayPalConfig,
  PayPalIntegrationType,
  PayPalEnvironment
} from "ngx-paypal";
import { of } from "rxjs";
@Component({
  selector: "app-lessons",
  templateUrl: "./lessons.component.html",
  styleUrls: ["./lessons.component.scss"]
})
export class LessonsComponent implements OnInit {
  CourseModules: any = [];
  Lessons: any = [];
  SelectedModuleForPurchase: any = null;
  currentModalFrame: any = null;
  PayPalConfig?: PayPalConfig;

  constructor(
    private lessonsService: LessonsService,
    private router: Router,
    private loginToken: LoginTokenService,
    private toaster: ToastrService,
    private moduleSvc: CourseModuleService
  ) {
    this.loginToken.LoadComplete(true);
    loginToken.checkToken();
  }

  ngOnInit() {
    //   this.lessonsService.Lessons().subscribe((resp: any) => {
    //     this.lessons=resp.lessons;
    //     this.loginToken.LoadComplete(false);
    //     if( this.loginToken.loggedin === true ) {
    //       this.toaster.Success('You are logged in Successfully!');
    //       this.loginToken.loggedInNow(false);
    //     }
    //  });

    this.InitPayPalConfig();
    this.GetLessonsForDemo(); // @TODO: Change to Modules in production
    this.loginToken.LoadComplete(false);
  }

  InitPayPalConfig() {
    const self = this;
    this.PayPalConfig = new PayPalConfig(
      PayPalIntegrationType.ClientSideREST,
      PayPalEnvironment.Sandbox,
      {
        commit: true,
        client: {
          sandbox:
            "ATG7W57vvxAWq8yRvnlmB3o4xukMkKM4gigMTGvavT8dVb087vyqzGP0e8cx-pOpsni_s7kI5mduT6BV"
        },
        button: {
          label: "paypal",
          layout: "vertical"
        },
        onAuthorize: (data, actions) => {
          console.log("authorized");
          return of(undefined);
        },
        onPaymentComplete: (data, actions) => {
          self.loginToken.LoadComplete(true);

          self.moduleSvc
            .ConfirmPurchaseOrder(self.SelectedModuleForPurchase, data)
            .subscribe(
              (resp: any) => {
                self.currentModalFrame.hide();
                self.SelectedModuleForPurchase = null;
                self.GetModules();
                self.loginToken.LoadComplete(false);
              },
              (err: HttpErrorResponse) => {
                alert(
                  "Sorry, something went wrong. Please contact support about this."
                );
                console.error(err);
                self.loginToken.LoadComplete(false);
              }
            );
        },
        onCancel: (data, actions) => {
          // console.log("OnCancel");
        },
        onError: err => {
          console.log("OnError", err);
        },
        onClick: () => {
          // console.log("onClick");
        },
        validate: actions => {
          // console.log(actions);
        },
        experience: {
          noShipping: true,
          brandName: "Edugami Payment Test"
        },
        transactions: [
          {
            amount: {
              total: self.SelectedModuleForPurchase
                ? self.SelectedModuleForPurchase.price
                : 0,
              currency: "USD"
            }
          }
        ],
        note_to_payer: "Contact us if you have troubles processing payment"
      }
    );
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
      },
      (err: HttpErrorResponse) => {
        alert(
          "Sorry, there was an error loading the lessons. Please reload the page"
        );
        console.error("Error loading modules: ", err);
      }
    );
  }

  navigate(lesson) {
    // console.log(lesson);

    this.router.navigate(["/lesson/", lesson.id, "study"]);
  }

  OpenPurchaseModal(module, frame) {
    this.SelectedModuleForPurchase = module;
    this.InitPayPalConfig();
    frame.show();
    this.currentModalFrame = frame;
  }

  // eof
}

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { MDBBootstrapModule, ModalModule } from "angular-bootstrap-md";
import { DragAndDropModule } from "angular-draggable-droppable";
import { DndModule } from "ngx-drag-drop";
import { FormsModule } from "../../node_modules/@angular/forms";
import { AppComponent } from "./app.component";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { HeaderComponent } from "./common/header/header.component";
import { AppRoutingModule } from "./config/routing/app-routing.module";
import { GatewayComponent } from "./gateway/gateway.component";
import { BodilylessonComponent } from "./learners/exercise1-bodilylesson/bodilylesson.component";
import { Bodilylesson2Component } from "./learners/exercise3-bodily/bodilylesson2.component";
import { Bodilylesson2part1Component } from "./learners/exercise3-bodilypart1/bodilylesson2part1.component";
import { Bodilylesson2part2Component } from "./learners/exercise3-bodilypart2/bodilylesson2part2.component";
import { BuildmanLessonComponent } from "./learners/exercise1-verbal-write/buildman-lesson.component";
import { Categorization2Component } from "./learners/categorization2/categorization2.component";
import { Categorization2part1Component } from "./learners/categorization2part1/categorization2part1.component";
import { CategorizationComponent } from "./learners/exercise1-categorization/categorization.component";
import { DashboardComponent } from "./learners/dashboard/dashboard.component";
import { FreeLessonComponent } from "./learners/dashboard/free-lesson/free-lesson.component";
import { DemocategorizationComponent } from "./learners/democategorization/democategorization.component";
import { Democategorization2Component } from "./learners/democategorization2/democategorization2.component";
import { DemomusicalComponent } from "./learners/exercise2-musical/demomusical.component";
import { Demomusical2Component } from "./learners/demomusical2/demomusical2.component";
import { Exercise1MusicalComponent } from "./learners/exercise1-musical/exercise1-musical.component";
import { Exercise1VisualSpatialComponent } from "./learners/exercise1-visual-spatial/exercise1-visual-spatial.component";
import { Hands2Component } from "./learners/exercise2-hands/hands2.component";
import { HandslessonComponent } from "./learners/exercise1-hands/handslesson.component";
import { IntraComponent } from "./learners/exercise1-intrapersonal/intra.component";
import { Intralesson2Component } from "./learners/exercise3-intrapersonal/intralesson2.component";
import { IntrapersonalComponent } from "./learners/intrapersonal/intrapersonal.component";
import { Intrapersonal2Component } from "./learners/intrapersonal2/intrapersonal2.component";
import { LessondetailsComponent } from "./learners/lessondetails/lessondetails.component";
import { LessonpartComponent } from "./learners/lessonpart/lessonpart.component";
import { LessonsComponent } from "./learners/lessons/lessons.component";
import { LogicalComponent } from "./learners/exercise1-logical/logical.component";
import { Logicallesson2Component } from "./learners/exercise2-logical/logicallesson2.component";
import { ProfileComponent } from "./learners/profile/profile.component";
import { UpdateprofileComponent } from "./learners/updateprofile/updateprofile.component";
import { Verballesson2Component } from "./learners/verballesson2/verballesson2.component";
import { VerbaloralComponent } from "./learners/verbaloral/verbaloral.component";
import { Verbaloral2Component } from "./learners/verbaloral2/verbaloral2.component";
import { VisuallessonComponent } from "./learners/visuallesson/visuallesson.component";
import { Visuallesson2Component } from "./learners/visuallesson2/visuallesson2.component";
import { LessoncompleteComponent } from "./lessoncomplete/lessoncomplete.component";
import { LoginComponent } from "./login/login.component";
import { LoginService } from "./shared/login/login.service";
import { LoginTokenService } from "./shared/loginToken/login-token.service";
import { UrlServiceService } from "./shared/urlservice/url-service.service";
import { UserService } from "./shared/user/user.service";
import { SignupComponent } from "./signup/signup.component";
import { Exercise2CategorizationComponent } from "./learners/exercise2-categorization/exercise2-categorization.component";
import { Exercise3HandsComponent } from "./learners/exercise3-hands/exercise3-hands.component";
import { Exercise5HandsComponent } from "./learners/exercise5-hands/exercise5-hands.component";
import { Exercise5InterpersonalComponent } from "./learners/exercise5-interpersonal/exercise5-interpersonal.component";
import { Exercise5VerbaloralComponent } from "./learners/exercise5-verbaloral/exercise5-verbaloral.component";
import { Exercise5Verbaloralpart1Component } from "./learners/exercise5-verbaloralpart1/exercise5-verbaloralpart1.component";
import { Exercise5VerbalwriteComponent } from "./learners/exercise5-verbalwrite/exercise5-verbalwrite.component";
import { Exercise5VisualspatialComponent } from "./learners/exercise5-visualspatial/exercise5-visualspatial.component";
import { StudylessonComponent } from "./learners/studylesson/studylesson.component";
import { StudyComponent } from "./learners/study/study.component";
import { SafeHTMLPipe } from "./pipes/safe-html.pipe";
import { SafeURLPipe } from "./pipes/safe-url.pipe";
import { DigcySortableDirective } from "./directives/sortable/digcy-sortable.directive";
import { MatrixDragAndDropDirective } from "./directives/matrix_drag_and_drop/matrix-drag-and-drop.directive";
import { MatrixDroppableDirective } from "./directives/matrix_drag_and_drop/matrix-droppable.directive";
import { FillInTheBlanksDragNdDropDirective } from "./directives/fill-in-the-blanks/fill-in-the-blanks-drag-nd-drop.directive";
import { FillInTheBlanksDropDirective } from "./directives/fill-in-the-blanks/fill-in-the-blanks-drop.directive";
import { NgxPayPalModule } from "ngx-paypal";
import { PayPalTestComponent } from "./learners/paypal-test/pay-pal-test/pay-pal-test.component";
import { CourseModuleService } from "./shared/course_modules/course-module.service";
import { DemoUserUploadComponent } from "./demos/demo-user-upload/demo-user-upload.component";
import { UploadHelperService } from "./shared/upload-service/upload-helper.service";
import { DemoParagraphLoopComponent } from "./demos/paragraph_loop/demo-paragraph-loop/demo-paragraph-loop.component";
import { BingApiService } from "./shared/bing/bing-api.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  RecaptchaModule,
  RECAPTCHA_SETTINGS,
  RecaptchaSettings
} from "ng-recaptcha";
import { RecaptchaFormsModule } from "ng-recaptcha/forms";
import { ForgotPasswordComponent } from "./login/forgot-password/forgot-password.component";
import { DoPasswordResetComponent } from './login/do-password-reset/do-password-reset.component';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    LessonsComponent,
    DashboardComponent,
    LessondetailsComponent,
    LessonpartComponent,
    GatewayComponent,
    UpdateprofileComponent,
    ProfileComponent,
    BuildmanLessonComponent,
    BodilylessonComponent,
    LogicalComponent,
    CategorizationComponent,
    FreeLessonComponent,
    Bodilylesson2Component,
    Bodilylesson2part1Component,
    Bodilylesson2part2Component,
    Categorization2Component,
    Categorization2part1Component,
    Logicallesson2Component,
    IntraComponent,
    Intralesson2Component,
    Verballesson2Component,
    HandslessonComponent,
    Hands2Component,
    VisuallessonComponent,
    Visuallesson2Component,
    LessoncompleteComponent,
    VerbaloralComponent,
    Verbaloral2Component,
    DemocategorizationComponent,
    Democategorization2Component,
    DemomusicalComponent,
    IntrapersonalComponent,
    Intrapersonal2Component,
    Demomusical2Component,
    Exercise1MusicalComponent,
    Exercise1VisualSpatialComponent,
    Exercise2CategorizationComponent,
    Exercise3HandsComponent,
    Exercise5HandsComponent,
    Exercise5InterpersonalComponent,
    Exercise5VerbaloralComponent,
    Exercise5Verbaloralpart1Component,
    Exercise5VerbalwriteComponent,
    Exercise5VisualspatialComponent,
    StudylessonComponent,
    StudyComponent,
    SafeHTMLPipe,
    SafeURLPipe,
    DigcySortableDirective,
    MatrixDragAndDropDirective,
    MatrixDroppableDirective,
    FillInTheBlanksDragNdDropDirective,
    FillInTheBlanksDropDirective,
    PayPalTestComponent,
    DemoUserUploadComponent,
    DemoParagraphLoopComponent,
    ForgotPasswordComponent,
    DoPasswordResetComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    DndModule,
    DragAndDropModule.forRoot(),
    NgxPayPalModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ToastrModule.forRoot() 
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    HttpModule,
    UrlServiceService,
    LoginService,
    LoginTokenService,
    UserService,
    CourseModuleService,
    UploadHelperService,
    BingApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: "6LflmX8UAAAAABoVOaJXkRaRc39_Wq3SIS7LhJ4v"
      } as RecaptchaSettings
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";

import { NgbModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { UserService } from "./shared/user.service";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { UserComponent } from "./user/user.component";
import { DashComponent } from "./dashboard/dash/dash.component";
import { AuthGuard } from "./auth/auth.guard";
import { AuthInterceptor } from "./auth/auth.interceptor";
import { UsersComponent } from "./dashboard/users/users.component";
import { UserIndexComponent } from "./dashboard/users/user-index/user-index.component";
import { DataTablesModule } from "angular-datatables";
import { UserDetailsComponent } from "./dashboard/users/user-details/user-details.component";
import { UserEditComponent } from "./dashboard/users/user-edit/user-edit.component";
import { UserCreateComponent } from "./dashboard/users/user-create/user-create.component";
import { SystemComponent } from "./dashboard/system/system.component";
import { SystemIndexComponent } from "./dashboard/system/system-index/system-index.component";
import { IntelligencesComponent } from "./dashboard/system/intelligences/intelligences.component";
import { IntelligenceService } from "./shared/intelligences/intelligence.service";
import { CourseLevelsComponent } from "./dashboard/system/course-levels/course-levels.component";
import { CourseLevelService } from "./shared/course-levels/course-level.service";
import { DragulaModule } from "ng2-dragula";
import { ContentComponent } from "./dashboard/content/content.component";
import { CoursesComponent } from "./dashboard/content/courses/courses.component";
import { ContentIndexComponent } from "./dashboard/content/content-index/content-index.component";
import { CoursesIndexComponent } from "./dashboard/content/courses/courses-index/courses-index.component";
import { CourseCreateComponent } from "./dashboard/content/courses/course-create/course-create.component";
import { CourseService } from "./shared/courses/course.service";
import { CourseDetailsComponent } from "./dashboard/content/courses/course-details/course-details.component";
import { CourseModuleService } from "./shared/modules/course-module.service";
import { ModuleDetailsComponent } from "./dashboard/content/courses/modules/module-details/module-details.component";
import { LessonsIndexComponent } from "./dashboard/content/courses/lessons/lessons-index/lessons-index.component";
import { LessonService } from "./shared/lessons/lesson.service";
import { TruncatePipe } from "./pipes/truncate.pipe";
import { TestQuestionsComponent } from "./dashboard/system/test-questions/test-questions.component";
import { TestQuestionService } from "./shared/test-questions/test-question.service";
import { MakrdownEditorTestComponent } from "./makrdown-editor-test/makrdown-editor-test.component";
import { EditorModule } from "@tinymce/tinymce-angular";
import { SafeHtmlPipe } from "./pipes/safe-html.pipe";
import { EncodeHtmlPipe } from "./pipes/encode-html.pipe";
import { EditorElementsService } from "./shared/editor/editor-elements.service";
import { DummyDataService } from "./shared/dummy/dummy-data.service";
import { DummyDataComponent } from "./shared/dummy/component/dummy-data/dummy-data.component";
import { PartDataService } from "./shared/parts/part-data.service";
import { DigcyDraggableDirective } from "./directives/digcy-draggable/digcy-draggable.directive";
import { ExerciseService } from "./shared/exercises/exercise.service";
import { PaymentsComponent } from "./dashboard/payments/payments.component";
import { DigcyPaymentsService } from "./shared/payments/digcy-payments.service";
import { LanguagesComponent } from "./dashboard/system/languages/languages.component";
import { LanguageService } from "./shared/languages/language.service";
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { UrlsService } from "./shared/urls.service";
import { DoPasswordResetComponent } from './user/do-password-reset/do-password-reset.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    SignInComponent,
    UserComponent,
    DashComponent,
    UsersComponent,
    UserIndexComponent,
    UserDetailsComponent,
    UserEditComponent,
    UserCreateComponent,
    SystemComponent,
    SystemIndexComponent,
    IntelligencesComponent,
    CourseLevelsComponent,
    ContentComponent,
    CoursesComponent,
    ContentIndexComponent,
    CoursesIndexComponent,
    CourseCreateComponent,
    CourseDetailsComponent,
    ModuleDetailsComponent,
    LessonsIndexComponent,
    TruncatePipe,
    TestQuestionsComponent,
    MakrdownEditorTestComponent,
    SafeHtmlPipe,
    EncodeHtmlPipe,
    DummyDataComponent,
    DigcyDraggableDirective,
    PaymentsComponent,
    LanguagesComponent,
    DoPasswordResetComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    DataTablesModule,
    ReactiveFormsModule,
    DragulaModule,
    EditorModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [
    UserService,
    UrlsService,
    AuthGuard,
    IntelligenceService,
    CourseLevelService,
    NgbActiveModal,
    CourseService,
    CourseModuleService,
    LessonService,
    TestQuestionService,
    EditorElementsService,
    DummyDataService,
    PartDataService,
    ExerciseService,
    DigcyPaymentsService,
    LanguageService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6Ld6mn8UAAAAAHX326vJaYX821Y1R-oK49QohdEJ' } as RecaptchaSettings
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

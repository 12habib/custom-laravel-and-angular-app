import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { UserComponent } from "./user/user.component";
import { DashComponent } from "./dashboard/dash/dash.component";
import { AuthGuard } from "./auth/auth.guard";
import { UsersComponent } from "./dashboard/users/users.component";
import { UserIndexComponent } from "./dashboard/users/user-index/user-index.component";
import { UserDetailsComponent } from "./dashboard/users/user-details/user-details.component";
import { UserEditComponent } from "./dashboard/users/user-edit/user-edit.component";
import { UserCreateComponent } from "./dashboard/users/user-create/user-create.component";
import { SystemComponent } from "./dashboard/system/system.component";
import { SystemIndexComponent } from "./dashboard/system/system-index/system-index.component";
import { IntelligencesComponent } from "./dashboard/system/intelligences/intelligences.component";
import { CourseLevelsComponent } from "./dashboard/system/course-levels/course-levels.component";
import { ContentComponent } from "./dashboard/content/content.component";
import { ContentIndexComponent } from "./dashboard/content/content-index/content-index.component";
import { CoursesComponent } from "./dashboard/content/courses/courses.component";
import { CoursesIndexComponent } from "./dashboard/content/courses/courses-index/courses-index.component";
import { CourseCreateComponent } from "./dashboard/content/courses/course-create/course-create.component";
import { CourseDetailsComponent } from "./dashboard/content/courses/course-details/course-details.component";
import { ModuleDetailsComponent } from "./dashboard/content/courses/modules/module-details/module-details.component";
import { LessonsIndexComponent } from "./dashboard/content/courses/lessons/lessons-index/lessons-index.component";
import { TestQuestionsComponent } from "./dashboard/system/test-questions/test-questions.component";
import { MakrdownEditorTestComponent } from "./makrdown-editor-test/makrdown-editor-test.component";
import { DummyDataComponent } from "./shared/dummy/component/dummy-data/dummy-data.component";
import { PaymentsComponent } from "./dashboard/payments/payments.component";
import { LanguagesComponent } from "./dashboard/system/languages/languages.component";
import { DoPasswordResetComponent } from "./user/do-password-reset/do-password-reset.component";

const routes: Routes = [
  { path: "dummy", component: DummyDataComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "markdown-test", component: MakrdownEditorTestComponent },
      { path: "", component: DashComponent },
      { path: "payments", component: PaymentsComponent },
      {
        path: "users",
        component: UsersComponent,
        children: [
          { path: "", component: UserIndexComponent },
          { path: "view/:id", component: UserDetailsComponent },
          { path: "edit/:id", component: UserEditComponent },
          { path: "create", component: UserCreateComponent }
        ]
      },
      {
        path: "system",
        component: SystemComponent,
        children: [
          { path: "", component: SystemIndexComponent },
          { path: "intelligences", component: IntelligencesComponent },
          { path: "course-levels", component: CourseLevelsComponent },
          { path: "test-questions", component: TestQuestionsComponent },
          { path: "languages", component: LanguagesComponent }
        ]
      },
      {
        path: "content",
        component: ContentComponent,
        children: [
          { path: "", component: ContentIndexComponent },
          {
            path: "courses",
            component: CoursesComponent,
            children: [
              { path: "", component: CoursesIndexComponent },
              { path: "create", component: CourseCreateComponent },
              { path: "details/:id", component: CourseDetailsComponent },
              {
                path: "details/:id/module/:moduleID",
                component: ModuleDetailsComponent
              },
              {
                path: "details/:id/module/:moduleID/lesson/:lessonID",
                component: LessonsIndexComponent
              },
              {
                path:
                  "details/:id/module/:moduleID/lesson/:lessonID/add_part/:exerciseID/:partID",
                component: MakrdownEditorTestComponent
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "login",
    component: UserComponent,
    children: [{ path: "", component: SignInComponent }]
  },
  {
    path: "do_password_reset/:token",
    component: DoPasswordResetComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

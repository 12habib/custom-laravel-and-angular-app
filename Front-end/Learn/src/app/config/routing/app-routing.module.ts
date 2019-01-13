import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HeaderComponent } from "./../../common/header/header.component";
import { LoginComponent } from "./../../login/login.component";
import { SignupComponent } from "./../../signup/signup.component";
import { LessonsComponent } from "./../../learners/lessons/lessons.component";
import { DashboardComponent } from "./../../learners/dashboard/dashboard.component";
import { LessondetailsComponent } from "./../../learners/lessondetails/lessondetails.component";
import { LessonpartComponent } from "./../../learners/lessonpart/lessonpart.component";
import { UpdateprofileComponent } from "./../../learners/updateprofile/updateprofile.component";
import { ProfileComponent } from "./../../learners/profile/profile.component";
import { GatewayComponent } from "./../../gateway/gateway.component";
import { BuildmanLessonComponent } from "./../../learners/exercise1-verbal-write/buildman-lesson.component";
import { BodilylessonComponent } from "./../../learners/exercise1-bodilylesson/bodilylesson.component";
import { LogicalComponent } from "./../../learners/exercise1-logical/logical.component";
import { CategorizationComponent } from "./../../learners/exercise1-categorization/categorization.component";
import { AuthGuard } from "../../auth/auth.guard";
import { FreeLessonComponent } from "../../learners/dashboard/free-lesson/free-lesson.component";
import { Bodilylesson2Component } from "./../../learners/exercise3-bodily/bodilylesson2.component";
import { Bodilylesson2part1Component } from "./../../learners/exercise3-bodilypart1/bodilylesson2part1.component";
import { Bodilylesson2part2Component } from "./../../learners/exercise3-bodilypart2/bodilylesson2part2.component";
import { Categorization2Component } from "./../../learners/categorization2/categorization2.component";
import { Categorization2part1Component } from "./../../learners/categorization2part1/categorization2part1.component";
import { Logicallesson2Component } from "./../../learners/exercise2-logical/logicallesson2.component";
import { IntraComponent } from "./../../learners/exercise1-intrapersonal/intra.component";
import { Intralesson2Component } from "./../../learners/exercise3-intrapersonal/intralesson2.component";
import { Verballesson2Component } from "./../../learners/verballesson2/verballesson2.component";
import { HandslessonComponent } from "./../../learners/exercise1-hands/handslesson.component";
import { Hands2Component } from "./../../learners/exercise2-hands/hands2.component";
import { Visuallesson2Component } from "./../../learners/visuallesson2/visuallesson2.component";
import { LessoncompleteComponent } from "./../../lessoncomplete/lessoncomplete.component";
import { VerbaloralComponent } from "./../../learners/verbaloral/verbaloral.component";
import { Verbaloral2Component } from "./../../learners/verbaloral2/verbaloral2.component";
import { DemocategorizationComponent } from "./../../learners/democategorization/democategorization.component";
import { Democategorization2Component } from "./../../learners/democategorization2/democategorization2.component";
import { DemomusicalComponent } from "./../../learners/exercise2-musical/demomusical.component";
import { IntrapersonalComponent } from "./../../learners/intrapersonal/intrapersonal.component";
import { Exercise1MusicalComponent } from "./../../learners/exercise1-musical/exercise1-musical.component";
import { Exercise1VisualSpatialComponent } from "./../../learners/exercise1-visual-spatial/exercise1-visual-spatial.component";
import { Exercise2CategorizationComponent } from "./../../learners/exercise2-categorization/exercise2-categorization.component";
import { Exercise3HandsComponent } from "./../../learners/exercise3-hands/exercise3-hands.component";
import { Exercise5HandsComponent } from "./../../learners/exercise5-hands/exercise5-hands.component";
import { Exercise5InterpersonalComponent } from "./../../learners/exercise5-interpersonal/exercise5-interpersonal.component";
import { Exercise5VerbaloralComponent } from "./../../learners/exercise5-verbaloral/exercise5-verbaloral.component";
import { Exercise5Verbaloralpart1Component } from "./../../learners/exercise5-verbaloralpart1/exercise5-verbaloralpart1.component";
import { Exercise5VerbalwriteComponent } from "./../../learners/exercise5-verbalwrite/exercise5-verbalwrite.component";
import { Exercise5VisualspatialComponent } from "./../../learners/exercise5-visualspatial/exercise5-visualspatial.component";
import { StudylessonComponent } from "./../../learners/studylesson/studylesson.component";
import { StudyComponent } from "./../../learners/study/study.component";
import { PayPalTestComponent } from "src/app/learners/paypal-test/pay-pal-test/pay-pal-test.component";
import { DemoUserUploadComponent } from "src/app/demos/demo-user-upload/demo-user-upload.component";
import { DemoParagraphLoopComponent } from "src/app/demos/paragraph_loop/demo-paragraph-loop/demo-paragraph-loop.component";
import { ForgotPasswordComponent } from "src/app/login/forgot-password/forgot-password.component";
import { DoPasswordResetComponent } from "src/app/login/do-password-reset/do-password-reset.component";

const appRoutes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "studylesson",
    component: StudylessonComponent
  },
  {
    path: "login",
    pathMatch: "full",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "gateway",
    component: GatewayComponent
  },
  {
    path: "lessons",
    component: LessonsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [{ path: "free-lesson", component: FreeLessonComponent }]
  },
  {
    path: "lesson/:id",
    component: LessondetailsComponent
  },
  {
    path: "lesson/:id/study",
    component: StudyComponent
  },
  {
    path: "lesson/part/:x",
    component: LessonpartComponent
  },
  {
    path: "profile/edit",
    component: UpdateprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "reset-password",
    component: ForgotPasswordComponent
  },
  {
    path: "do_password_reset/:token",
    component: DoPasswordResetComponent
  },
  {
    path: "exercise1_verbal_write",
    component: BuildmanLessonComponent
  },
  {
    path: "exercise1_bodilylesson",
    component: BodilylessonComponent
  },
  {
    path: "exercise1_logical",
    component: LogicalComponent
  },

  {
    path: "exercise2_logical",
    component: Logicallesson2Component
  },
  {
    path: "exercise1_categorization",
    component: CategorizationComponent
  },
  {
    path: "exercise3_bodily",
    component: Bodilylesson2Component
  },
  {
    path: "exercise3_bodilypart1",
    component: Bodilylesson2part1Component
  },
  {
    path: "exercise3_bodilypart2",
    component: Bodilylesson2part2Component
  },
  {
    path: "exercise3_hands",
    component: Exercise3HandsComponent
  },
  {
    path: "exercise5_hands",
    component: Exercise5HandsComponent
  },
  {
    path: "exercise5_verbaloral",
    component: Exercise5VerbaloralComponent
  },
  {
    path: "exercise5_verbaloralpart1",
    component: Exercise5Verbaloralpart1Component
  },
  {
    path: "exercise5_verbalwrite",
    component: Exercise5VerbalwriteComponent
  },
  {
    path: "exercise5_visualspatial",
    component: Exercise5VisualspatialComponent
  },

  {
    path: "categorizationlesson2",
    component: Categorization2Component
  },
  {
    path: "categorizationlesson2/part/1",
    component: Categorization2part1Component
  },
  {
    path: "exercise1_intrapersonal",
    component: IntraComponent
  },
  {
    path: "exercise3_intrapersonal",
    component: Intralesson2Component
  },
  {
    path: "verballesson2",
    component: Verballesson2Component
  },
  {
    path: "exercise1_hands",
    component: HandslessonComponent
  },
  {
    path: "exercise2_hands",
    component: Hands2Component
  },
  {
    path: "visuallesson2",
    component: Visuallesson2Component
  },
  {
    path: "complete",
    component: LessoncompleteComponent
  },
  {
    path: "verbaloral",
    component: VerbaloralComponent
  },
  {
    path: "verbaloral2",
    component: Verbaloral2Component
  },
  {
    path: "democat",
    component: DemocategorizationComponent
  },
  {
    path: "democat2",
    component: Democategorization2Component
  },
  {
    path: "exercise1_musical",
    component: Exercise1MusicalComponent
  },

  {
    path: "exercise2_musical",
    component: DemomusicalComponent
  },

  {
    path: "demointra",
    component: IntrapersonalComponent
  },
  {
    path: "exercise1_visual_spatial",
    component: Exercise1VisualSpatialComponent
  },
  {
    path: "exercise2_categorization",
    component: Exercise2CategorizationComponent
  },
  {
    path: "exercise5_interpersonal",
    component: Exercise5InterpersonalComponent
  },
  {
    path: "paypal-test",
    component: PayPalTestComponent
  },
  {
    path: "demo/user-upload",
    component: DemoUserUploadComponent
  },
  {
    path: "demo/paragraph_loop",
    component: DemoParagraphLoopComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

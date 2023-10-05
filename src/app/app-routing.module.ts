import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { CvComponent } from './cv/cv.component';
import { CoursesComponent } from './courses/courses.component';
import { ReferenceComponent } from './reference/reference.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'cv', component: CvComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'references', component: ReferenceComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

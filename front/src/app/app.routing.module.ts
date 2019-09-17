import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule
  } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { HomeComponent } from './components/home/home.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { EditorPageComponent } from './components/editor-page/editor-page.component';
import { CommentsSectionComponent } from './components/comments-section/comments-section.component';
import { ListVideosComponent } from './components/list-videos/list-videos.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    component: LandingPageComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterFormComponent
  },
  {
    path: 'comments',
    component: CommentsSectionComponent
  },
  {
    path: 'trainer',
    component: AppComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Formateur'
    }
  },
  {
    path: 'editor',
    component: EditorPageComponent,
    canActivate: [RoleGuard],
    data: {
      expectedRole: 'Monteur'
    }
  },
  {
    path: 'list',
    component: ListVideosComponent, 
  }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes, { useHash: true })
  ]
})
export class AppRouting {}

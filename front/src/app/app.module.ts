import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import {
  NgForage,
  NgForageCache,
  NgForageConfig
} from 'ngforage';

import { AppRouting } from './app.routing.module';

import { ActualProjectService } from './services/actual-project.service';
import { InfoService } from './services/info.service';
import { DurationPipe } from './pipes/duration.pipe';
import { NewLinePipe } from './pipes/new-line.pipe';

import {
  AuthFrontModule,
  AuthFrontService,
} from '@blueframework/auth-front';
import { UploadFrontModule } from '@blueframework/upload-front';

import { AppComponent } from './app.component';
import { ChapterComponent } from './components/chapter/chapter.component';
import { ConfigIndexComponent } from './components/config-index/config-index.component';
import { ConfigProjectComponent } from './components/config-project/config-project.component';
import { DescriptionComponent } from './components/description/description.component';
import { DescriptionPopoverComponent } from './components/description-popover/description-popover.component';
import { GetReadyComponent } from './components/get-ready/get-ready.component';
import { HomeComponent } from './components/home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ParameterComponent } from './components/parameter/parameter.component';
import { PopoverComponent } from './components/popover/popover.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { RecordComponent } from './components/record/record.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { VideoComponent } from './components/video/video.component';
import { EditorPageComponent } from './components/editor-page/editor-page.component';
import { AuthGuard } from './guards/auth.guard';
import { CommentsSectionComponent } from './components/comments-section/comments-section.component';
import { ListVideosComponent } from './components/list-videos/list-videos.component';
import { UploadComponent } from './components/upload/upload.component';
import { ScrollToBottomDirective } from './directives/scroll-to-bottom.directive';


@NgModule({
  declarations: [
    AppComponent,
    ChapterComponent,
    ConfigIndexComponent,
    ConfigProjectComponent,
    ChapterComponent,
    DescriptionComponent,
    DescriptionPopoverComponent,
    DurationPipe,
    GetReadyComponent,
    HomeComponent,
    LandingPageComponent,
    ListVideosComponent,
    NewLinePipe,
    PopoverComponent,
    ProjectsListComponent,
    ParameterComponent,
    RecordComponent,
    RegisterFormComponent,
    VideoComponent,
    EditorPageComponent,
    CommentsSectionComponent,
    UploadComponent,
    ScrollToBottomDirective,
  ],
  imports: [
    AppRouting,
    UploadFrontModule.forRoot({
      apiUrl: 'http://localhost:3000',
    }),
    AuthFrontModule.forRoot({
      apiUrl: 'http://localhost:3000',
      // Login page Record'it
      loginErrorMessage: 'Adresse mail ou mot de passe invalide',
      logoUrl: 'assets/images/recordit-logo.png',
      versionTag: 'Blueanchor© 2019',
      emailLabel: 'Votre Adresse mail',
      passwordLabel: 'Votre mot de passe',
      loginButtonText: 'Se connecter',
      passwordResetText: `J'ai oublié mon mot de passe`,
      // Send email page
      loosePasswordText: 'Vous avez oublié votre mot de passe ?',
      sendCodeExplanationText: 'Nous allons vous envoyé un code pour valider votre requète',
      sendEmailErrorText: 'Votre adresse mail n\'éxiste pas',
      sendEmailButtonText: 'Recevoir son code',
      backButtonText: 'Retour',
      // Code password page
      emailSentText: 'Votre code a été envoyé',
      typeYourCodeText: 'Veuillez entré le code reçu',
      codeLabel: 'Code',
      invalidCodeText: 'Le code est invalide',
      validateCodeButtonText: 'Validé',
      dontReceiveCodeText: 'Si vous n\'avez pas reçu de code, retour et retentez',
      // Reset password page
      newPasswordText: 'Choisissez votre nouveau mot de passe',
      newPasswordLabel: 'Nouveau mot de passe',
      newPasswordButtonText: 'Changer mon mot de passe',
      isIonic: false,
    }),
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [
    ActualProjectService,
    AuthFrontService,
    InfoService,
    NgForage,
    NgForageCache,
    AuthGuard,
    [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  ],
  bootstrap: [HomeComponent],
})
export class AppModule {
  public constructor(
    private authFrontService: AuthFrontService,
    private router: Router,

    ngfConfig: NgForageConfig
    ) {
      ngfConfig.configure({
        name: 'projects',
        driver: [
          NgForageConfig.DRIVER_LOCALSTORAGE
        ]
      });

      this.authFrontService.errorEvent.subscribe(error => {
        console.log(error);
      });

      this.authFrontService.loginEvent.subscribe(role => {

        switch (role) {
          case 'Formateur':
            this.router.navigate(['trainer']);
            break;
          case 'Monteur':
            window.nw.Window.open('index.html#/editor', {width: 1350, height: 750});
            break;
          default:
            this.router.navigate(['landing']);
        }
      });
    }
}

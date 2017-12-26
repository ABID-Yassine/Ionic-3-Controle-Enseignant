import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { MatierePage } from '../pages/matiere/matiere';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';

import { MatiereService } from "../services/matiere.service";
import { AnimationService, AnimatesDirective } from 'css-animator';

@NgModule({
  declarations: [
    MyApp,
    MatierePage,
    AnimatesDirective,
    ListPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MatierePage,
    ListPage,
    LoginPage
  ],
  providers:
    [

    StatusBar,
    SplashScreen,
    MatiereService,
    AnimationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

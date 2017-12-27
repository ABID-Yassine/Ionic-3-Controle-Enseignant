import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { MatierePage } from '../pages/matiere/matiere';
import { SallesPage } from '../pages/salles/salles';
import {SeancePage} from "../pages/seance/seance";
import {JourPage} from "../pages/jour/jour";
import {EnseignantPage} from "../pages/enseignant/enseignant";
import {DepPage} from "../pages/dep/dep";
import {NiveauxPage} from "../pages/niveaux/niveaux";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [

      { title: 'login', component: LoginPage },
      { title: 'Matiere', component: MatierePage },
      { title: 'Salles', component: SallesPage },
      { title: 'Seance', component: SeancePage },
      { title: 'Departement', component: DepPage },
      { title: 'Enseignant', component: EnseignantPage },
      { title: 'Jour', component: JourPage },
      { title: 'Niveaux', component: NiveauxPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

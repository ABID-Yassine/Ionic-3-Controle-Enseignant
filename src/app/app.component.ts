import { Component, ViewChild } from '@angular/core';
import { Nav, Platform ,MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from '../pages/login/login';
import { MatierePage } from '../pages/matiere/matiere';
import { SallesPage } from '../pages/salles/salles';
import {SeancePage} from "../pages/seance/seance";
import {JourPage} from "../pages/jour/jour";
import {EnseignantPage} from "../pages/enseignant/enseignant";
import {DepPage} from "../pages/dep/dep";
import {NiveauxPage} from "../pages/niveaux/niveaux";
import {EnseignementPage} from "../pages/enseignement/enseignement";

import { Storage } from '@ionic/storage';
import { DashboardPage } from '../pages/dashboard/dashboard';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any,icon:any}>;

  constructor(private storage: Storage,public platform: Platform, public statusBar: StatusBar ) {
    this.initializeApp();

    this.pages = [

      { title: 'Dashboard', component: DashboardPage,icon:'desktop' },
      { title: 'Matiere', component: MatierePage,icon:'book' },
      { title: 'Salles', component: SallesPage ,icon:'clipboard'},
      { title: 'Seance', component: SeancePage,icon:'calendar' },
      { title: 'Departement', component: DepPage,icon:'briefcase' },
      { title: 'Enseignant', component: EnseignantPage,icon:'contact' },
      { title: 'Jour', component: JourPage,icon:'clock' },
      { title: 'Niveaux', component: NiveauxPage ,icon:'home'},
      { title: 'Enseignement', component: EnseignementPage ,icon:'school'}
    ];

    storage.get('Logout').then((val) => {
      if(val==false) {
        storage.get('admin').then((adm) => {
          if(adm!=null)
            this.nav.setRoot(DashboardPage);
          else
            this.nav.setRoot(EnseignementPage);

        });
      }

    });

  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SallesPage } from './salles';

@NgModule({
  declarations: [
    SallesPage,
  ],
  imports: [
    IonicPageModule.forChild(SallesPage),
  ],
})
export class SallesPageModule {}

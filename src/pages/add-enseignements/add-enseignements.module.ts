import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEnseignementsPage } from './add-enseignements';

@NgModule({
  declarations: [
    AddEnseignementsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEnseignementsPage),
  ],
})
export class AddEnseignementsPageModule {}

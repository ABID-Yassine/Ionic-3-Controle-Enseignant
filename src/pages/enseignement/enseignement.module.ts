import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnseignementPage } from './enseignement';

@NgModule({
  declarations: [
    EnseignementPage,
  ],
  imports: [
    IonicPageModule.forChild(EnseignementPage),
  ],
})
export class EnseignementPageModule {}

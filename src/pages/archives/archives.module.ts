import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArchivesPage } from './archives';

@NgModule({
  declarations: [
    ArchivesPage,
  ],
  imports: [
    IonicPageModule.forChild(ArchivesPage),
  ],
})
export class ArchivesPageModule {}

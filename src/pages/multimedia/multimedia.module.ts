import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MultimediaPage } from './multimedia';

@NgModule({
  declarations: [
    MultimediaPage,
  ],
  imports: [
    IonicPageModule.forChild(MultimediaPage),
  ],
})
export class MultimediaPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaultRecordPage } from './fault-record';

@NgModule({
  declarations: [
    FaultRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(FaultRecordPage),
  ],
})
export class FaultRecordPageModule {}

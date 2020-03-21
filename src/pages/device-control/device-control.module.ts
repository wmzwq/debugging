import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceControlPage } from './device-control';

@NgModule({
  declarations: [
    DeviceControlPage,
  ],
  imports: [
    IonicPageModule.forChild(DeviceControlPage),
  ],
})
export class DeviceControlPageModule {}

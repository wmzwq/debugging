import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpSerProvider } from './http-serve';
import { Device } from '@ionic-native/device';
import { RegistPage } from '../pages/regist/regist';
import { IonicStorageModule } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { ArchivesPage } from '../pages/archives/archives';
import { MultimediaPage } from '../pages/multimedia/multimedia';
import { SettingDataProvider } from './setting-data';
import { DeviceControlPage } from '../pages/device-control/device-control';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { Wechat } from '@ionic-native/wechat';
import { Record96333Page } from '../pages/record96333/record96333';
import { AcceptancePage } from '../pages/acceptance/acceptance';
import { Logger } from './Logger';
import { PreviewPicturePage } from '../pages/preview-picture/preview-picture';
import { NativeService } from './NativeService ';
import {AppVersion} from '@ionic-native/app-version';
import { FileOpener } from '@ionic-native/file-opener';
import { FaultRecordPage } from '../pages/fault-record/fault-record';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    RegistPage,
    LoginPage,
    ArchivesPage,
    MultimediaPage,
    DeviceControlPage,
    AcceptancePage,
    Record96333Page,
    PreviewPicturePage,
    FaultRecordPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    JsonpModule,
    IonicImageViewerModule,
    ionicGalleryModal.GalleryModalModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      iconMode: 'ios',
      mode:'ios',
      tabsHideOnSubPages: 'true', //隐藏全部子页面 tabs
      backButtonText: '' /*配置返回按钮*/,
      animated: 'true',
      pageTransition: 'ios-transition',

    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    RegistPage,
    LoginPage,
    ArchivesPage,
    MultimediaPage,
    DeviceControlPage,
    AcceptancePage,
    Record96333Page,
    PreviewPicturePage,
    FaultRecordPage
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    },
    StatusBar,
    SplashScreen,
    InAppBrowser,
    HttpSerProvider,
    Device,
    SettingDataProvider,
    Camera,
    File,
    FileTransfer,
    Wechat,
    Logger,
    NativeService,
    AppVersion,
    FileOpener,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

import { Component } from '@angular/core';
import { Platform, IonicApp, MenuController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { NativeService } from './NativeService ';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  theme: string;

  constructor(statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage, private _app: App,
    private _ionicApp: IonicApp,
    private _menu: MenuController,
    platform: Platform,
    private nativeService:NativeService,
  ) {

    this.storage.get('firstIn').then((result) => {

      if (window.localStorage.getItem('flag')) {

        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }

    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.nativeService.detectionUpgrade()
      statusBar.styleDefault();
      splashScreen.hide();
      this.setupBackButtonBehavior();
    });
  }
  //返回按钮事件
  private setupBackButtonBehavior() {
    // If on web version (browser)
    // Register browser back button action(s)
    window.onpopstate = (evt) => {
      // Close menu if open
      if (this._menu.isOpen()) {
        this._menu.close();
        return;
      }
      // 关闭弹出层等
      let activePortal = this._ionicApp._loadingPortal.getActive() ||
        this._ionicApp._modalPortal.getActive() ||
        this._ionicApp._toastPortal.getActive() ||
        this._ionicApp._overlayPortal.getActive();

      if (activePortal) {
        activePortal.dismiss();
        return;
      }
      // 当前是否存在 可pop 页面
      if (this._app.getActiveNav().canGoBack()) {
        this._app.getActiveNav().pop();
      } else {
        // console.info("不能再返回了！！");
      }
    };
    if (window.location.protocol !== "file:") {
      // Fake browser history on each view enter
      this._app.viewDidEnter.subscribe((app) => {
        history.pushState(null, document.title, location.href);
        //history.pushState (null, null, "");
      });
    }
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { HttpSerProvider } from '../../app/http-serve';
import { HomePage } from '../home/home';
import { BaseUI } from '../../app/baseui';
import { Device } from '@ionic-native/device';
import { RegistPage } from '../regist/regist';
import { url1, url2, flag } from '../../app/config';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {
  username: string;
  password: string;
  phone: string;
  URL: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private httpservice: HttpSerProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public device: Device) {
    super()
    if (window.localStorage.getItem('phone') != null) {
      this.phone = window.localStorage.getItem('phone')
    }
    var m = flag
    if (m == 1) {
      this.URL = url1;
    }
    else {
      this.URL = url2;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  logIn() {
    var loader = this.loadingCtrl.create({
      content: "数据通讯中，请稍候！",
      duration: 10000
    });
    loader.present();
    if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
       super.warningToast(this.toastCtrl, "手机号码有误");
      loader.dismiss();
      return false;
    }
    var url = this.URL + "/login/InquireUser";
    this.httpservice.post(url, JSON.stringify({
      "data": "{\"strEntity\": \"{'IMEI':'" + this.phone + "'}\" }"
    })).then(res => {
      try {
        console.log(res)
        if (res.data.Status == 1) {
          loader.dismiss();
           super.warningToast(this.toastCtrl, "手机未绑定，请注册");
        }
        else if (res.data.Status == 2) {
          loader.dismiss();
           super.warningToast(this.toastCtrl, "待审核");
        }
        else if (res.data.Status == 3) {
          
          loader.dismiss();
           super.successToast(this.toastCtrl, "登陆成功");
          var flag = "1"
          window.localStorage.setItem('flag', flag);
          window.localStorage.setItem('phone', this.phone);
          this.navCtrl.setRoot(HomePage)
          this.navCtrl.push(HomePage)
        }
      } catch (e) {
        loader.dismiss();
        super.errorToast(this.toastCtrl, "/login/InquireUser接口异常:" + e);
      }

    });
  }
  register() {
    this.navCtrl.setRoot(RegistPage)
  }
}

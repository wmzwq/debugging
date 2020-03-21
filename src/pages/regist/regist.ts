import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { BaseUI } from '../../app/baseui';
import { Device } from '@ionic-native/device';
import { HttpSerProvider } from '../../app/http-serve';
import { LoginPage } from '../login/login';
import { url1, url2, flag } from '../../app/config';
/**
 * Generated class for the RegistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regist',
  templateUrl: 'regist.html',
})
export class RegistPage extends BaseUI {
  phone: string;
  username: string;
  URL: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private httpservice: HttpSerProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public device: Device) {
    super()
    var m = flag
    if (m == 1) {
      this.URL = url1;
    }
    else {
      this.URL = url2;
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistPage');
  }
  register() {
    var loader = this.loadingCtrl.create({
      content: "数据通讯中，请稍候！",
      duration: 10000
    });
    loader.present();
    if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
     super.warningToast(this.toastCtrl, "手机号码有误");
      return false;
    }
    var url = this.URL + "/login/InstallUser";
    this.httpservice.post(url, JSON.stringify({
      "data": "{\"strEntity\": \"{'IMEI':'" + this.phone + "','IMSI':'" + this.phone + "','PhoneModel':'" + this.device.model + "','PhoneBrand':'" + this.device.manufacturer + "','PhoneNumber':'" + this.phone + "','Name':'" + this.username + "'}\" }"
    })).then(res => {
      try {
        if (res.code == 200) {
          loader.dismiss()
           super.successToast(this.toastCtrl, res.info);
          window.localStorage.setItem('phone', this.phone);
          var url = "http://yuekong2010.gnway.cc:18887/Prospecting/ERPPush";
          this.httpservice.get(url + "?data={\"strEntity\":\"{'sms':'有新的注册消息，请前往平台进行审核'}\"}", null).then(res => {
            try {
              console.log(res)
               super.successToast(this.toastCtrl, res.info);
            } catch (e) {
              super.errorToast(this.toastCtrl, "/Prospecting/ERPPush接口异常:" + e);
            }

          });
        }
        else {
          loader.dismiss()
          super.errorToast(this.toastCtrl, res.info);
        }

      } catch (e) {
        loader.dismiss()
        super.errorToast(this.toastCtrl, "/login/InstallUser接口异常:" + e);
      }

    });
  }
  login() {
    this.navCtrl.setRoot(LoginPage)
  }
}

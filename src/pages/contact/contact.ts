import { Component } from '@angular/core';
import { NavController, App, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HttpSerProvider } from '../../app/http-serve';
import { url1, url2, flag } from '../../app/config';
import { BaseUI } from '../../app/baseui';
declare var Wechat;
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage extends BaseUI {
  phone: string;
  URL: string;
  user: any;
  account: any;

  constructor(public navCtrl: NavController, private app: App, private httpservice: HttpSerProvider, public toastCtrl: ToastController) {
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
    this.serach()
  }
  logout() {
    window.localStorage.removeItem('flag')
    window.localStorage.removeItem('phone')
    this.app.getRootNav().setRoot(LoginPage);
  }
  serach() {
    var url = this.URL + "/CheckAndAcceptAPI/userinfo";
    this.httpservice.post(url, JSON.stringify({
      "data": "{ \"pagination\": { rows: 50, page: 1, sidx: '', sord: 'ASC' }, \"queryJson\": \"{'userType':'5','F_Account':'" + this.phone + "'}\" }"
    })).then(res => {
      try {
        console.log(res)
        this.user = res.data.rows[0].F_CreateUserName;
        this.account = res.data.rows[0].F_Account;

      } catch (e) {
        super.errorToast(this.toastCtrl, "/CheckAndAcceptAPI/userinfo接口异常:" + e);
      }
    })
  }
  wx(){
    try {
      Wechat.isInstalled((installed) => {
          if (installed) {
              Wechat.share({
                  message: {
                      title: "",
                      description: "电梯安装调试",
                      thumb: "this.image",
                      mediaTagName: "TEST-TAG-001",
                      messageExt: "",  // 这是第三方带的测试字段
                      messageAction: "", // <action>dotalist</action>
                      media: {
                          type: Wechat.Type.WEBPAGE,
                          webpageUrl:"http://moshme.cn:29921/index.html"
                      }
                  },
                  scene: Wechat.Scene.SESSION  //Wechat.Scene.Timeline  // share to Timeline
              }, () => {
                 
              }, (reason) => {
                  alert(reason)
              });
          } else {
              
          }
      }, function (reason) {
          console.log("Failed: " + reason);
      });
  } catch (error) {
      console.log(error);
  } finally {
    
}
  }

}

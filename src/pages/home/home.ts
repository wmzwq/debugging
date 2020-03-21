import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { HttpSerProvider } from '../../app/http-serve';
import { BaseUI } from '../../app/baseui';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ArchivesPage } from '../archives/archives';
import { url1, url2, flag } from '../../app/config';
import { MultimediaPage } from '../multimedia/multimedia';
import { ContactPage } from '../contact/contact';
import { AcceptancePage } from '../acceptance/acceptance';
import { Record96333Page } from '../record96333/record96333';
import { FaultRecordPage } from '../fault-record/fault-record';
import { AboutPage } from '../about/about';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI {
  inputContent: any;
  Enumber: any;
  zburl: any;
  eleList: any;
  jcurl: any;
  URL: any;
  Online: string;
  Estatus: string;
  Mstatus: string;
  F_VideoType: any;
  EFlag: boolean;
  ysurl: any;
  constructor(public navCtrl: NavController, private httpservice: HttpSerProvider, public toastCtrl: ToastController, public iab: InAppBrowser) {
    super();
    this.EFlag = false;
    var m = flag
    if (m == 1) {
      this.URL = url1;
    }
    else {
      this.URL = url2;
    }
  }
  ionViewDidEnter() {
    if (window.localStorage.getItem('ecl').length == 7) {
      this.inputContent = window.localStorage.getItem('ecl')
      this.onchange()
    }
  }
  jx() {
    if (this.inputContent.length != 7) {
      super.warningToast(this.toastCtrl, "电梯编号错误");
      return
    }
    if (this.EFlag == true) {
      super.warningToast(this.toastCtrl, "该电梯已入网");
      return
    }
    if (this.EFlag == null) {
      super.warningToast(this.toastCtrl, "该电梯编号不存在");
      return
    }
    var jx = "https://moshme.cn/eall/newbutton.aspx?ecollection=" + this.inputContent
    this.iab.create(jx, '_system', 'hideurlbar=yes')
  }
  zb() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var ua = navigator.userAgent.toLowerCase();
    var l: any;
    l = ua.match(/MicroMessenger/i);
    if (this.inputContent.length != 7) {
      super.warningToast(this.toastCtrl, "电梯编号错误");
      return
    }
    if (this.EFlag == true) {
      super.warningToast(this.toastCtrl, "该电梯已入网");
      return
    }
    if (this.EFlag == null) {
      super.warningToast(this.toastCtrl, "该电梯编号不存在");
      return
    }
    // if (this.Mstatus == "离线") {
    //   super.warningToast(this.toastCtrl, "当前多媒体离线中，无数据");
    //   return
    // }

    // if(this.F_VideoType==1&&l== "micromessenger"){
    //   const toast = super.showToast(this.toastCtrl, "请在apk中打开直播");
    //   return
    // }
    var url = this.URL + "/CheckAndAcceptAPI/AcceptanceOfTheQueryElevatroInfo";
    this.httpservice.post(url, JSON.stringify({
      "data": "{ \"pagination\": { rows: 50, page: 1, sidx: '', sord: 'ASC' }, \"queryJson\": \"{'Ecollection':'" + this.inputContent + "'}\" }"
    })).then(res => {
      try {
        this.Enumber = res.data.rows[0].Enumber
        window.localStorage.setItem('ecl', this.inputContent);
        var url = this.URL + "/Monitor/WebVideo";
        this.httpservice.post(url, JSON.stringify({
          "data": "{'keyValue':'" + this.Enumber + "','Ecollection':'" + this.inputContent + "'}"
        })).then(res => {
          try {
            console.log(res)
            this.zburl = res.data.url
            this.iab.create(this.zburl, '_system')
      
          } catch (e) {
            const toast = super.showToast(this.toastCtrl, "/Monitor/WebVideo接口异常:" + e);
          }
        });
      } catch (e) {
        const toast = super.showToast(this.toastCtrl, "/CheckAndAcceptAPI/AcceptanceOfTheQueryElevatroInfo接口异常:" + e);
      }
    });

  }
  fault() {
    if (this.inputContent.length != 7) {
      super.warningToast(this.toastCtrl, "电梯编号错误");
      return
    }
    if (this.EFlag == true) {
      super.warningToast(this.toastCtrl, "该电梯已入网");
      return
    }
    if (this.EFlag == null) {
      super.warningToast(this.toastCtrl, "该电梯编号不存在");
      return
    }
    window.localStorage.setItem('ecl', this.inputContent);
    this.navCtrl.push(Record96333Page, {
      ecllotion: this.inputContent
    })
  }
  change() {
    if (this.inputContent.length != 7) {
      return
    }
    var Eimg: any;
    var Mimg: any;
    Mimg = document.getElementById("Mimg");
    Eimg = document.getElementById("Eimg");
    if (this.inputContent.length == 7) {
      this.EFlag = false;
      this.Estatus = "";
      this.Mstatus = ""
      var url1 = this.URL + "/CheckAndAcceptAPI/AcceptanceOfTheQueryElevatroInfo";
      this.httpservice.post(url1, JSON.stringify({
        "data": "{ \"pagination\": { rows: 50, page: 1, sidx: '', sord: 'ASC' }, \"queryJson\": \"{'Ecollection':'" + this.inputContent + "'}\" }"
      })).then(res => {
        try {
          console.log(res)
          if (res.code == 200) {
            if (res.data.rows[0].F_OffLineStatus == "在线") {
              this.Estatus = "在线"
              Eimg.src = "../assets/imgs/在线.png";
            }
            else {
              this.Estatus = "离线"
              Eimg.src = "../assets/imgs/离线.png";
            }
          } else if (res.info == "您暂无权限") {
            this.EFlag = true;
            return;
          }
          else {
            this.EFlag = null;
            return;
          }
        } catch (e) {
        }
      })
      var url = this.URL + "/CheckAndAcceptAPI/multimediainfo";
      this.httpservice.post(url, JSON.stringify({
        "data": "{ \"pagination\": { rows: 50, page: 1, sidx: '', sord: 'ASC' }, \"queryJson\": \"{'F_Name':'" + this.inputContent + "'}\" }"
      })).then(res => {
        try {
          console.log(res)
          if (res.code == 200) {
            this.F_VideoType = res.data.rows[0].F_VideoType;
            if (res.data.rows[0].Online == "True") {
              this.Mstatus = "在线"
              if (res.data.rows[0].VersionA == null) {
                Mimg.src = "../assets/imgs/警告.svg";
              } else {
                Mimg.src = "../assets/imgs/在线.png";
              }
            }
            else {
              this.Mstatus = "离线"
              if (res.data.rows[0].VersionA == null) {
                Mimg.src = "../assets/imgs/离线.png";
              } else {
                Mimg.src = "../assets/imgs/警告.svg";
              }
            }
          }
          else {
            return false;
          }
        } catch (e) {
        }
      })
      var url2 = "http://122.228.89.215:8887/CheckAndAcceptAPI/record96333";
      this.httpservice.post(url2, JSON.stringify({
        "data": "{'pagination':{rows:5,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'Ecollection':'" + this.inputContent + "'}\"} "
      })).then(res => {
        try {
          console.log(res)
          if (res.code == 200) {
          } else {
            return;
          }
        } catch (e) {
        }
      });


    }
  }
  FaultRecord(){
    if (this.inputContent.length != 7) {
      super.warningToast(this.toastCtrl, "电梯编号错误");
      return
    }
    window.localStorage.setItem('ecl', this.inputContent);
    this.navCtrl.push(AboutPage, {
      ecllotion: this.inputContent
    })

  }
  onchange() {
    if (this.inputContent.length != 7) {
      super.warningToast(this.toastCtrl, "电梯编号错误");
      return
    }
    window.localStorage.setItem('ecl', this.inputContent);
    var Eimg: any;
    var Mimg: any;
    Mimg = document.getElementById("Mimg");
    Eimg = document.getElementById("Eimg");
    if (this.inputContent.length == 7) {
      this.EFlag = false;
      this.Estatus = "";
      this.Mstatus = ""
      var url1 = this.URL + "/CheckAndAcceptAPI/AcceptanceOfTheQueryElevatroInfo";
      this.httpservice.post(url1, JSON.stringify({
        "data": "{ \"pagination\": { rows: 50, page: 1, sidx: '', sord: 'ASC' }, \"queryJson\": \"{'Ecollection':'" + this.inputContent + "'}\" }"
      })).then(res => {
        try {
          console.log(res)
          if (res.code == 200) {
            if (res.data.rows[0].F_OffLineStatus == "在线") {
              this.Estatus = "在线"
              Eimg.src = "../assets/imgs/在线.png";
            }
            else {
              this.Estatus = "离线"
              Eimg.src = "../assets/imgs/离线.png";
            }
          } else if (res.info == "您暂无权限") {
            this.EFlag = true;
            return false;
          }
          else {
            this.EFlag = null;
            return false;
          }

        } catch (e) {
          super.errorToast(this.toastCtrl, "/CheckAndAcceptAPI/AcceptanceOfTheQueryElevatroInfo接口异常:" + e);
        }
      })
      var url = this.URL + "/CheckAndAcceptAPI/multimediainfo";
      this.httpservice.post(url, JSON.stringify({
        "data": "{ \"pagination\": { rows: 50, page: 1, sidx: '', sord: 'ASC' }, \"queryJson\": \"{'F_Name':'" + this.inputContent + "'}\" }"
      })).then(res => {
        try {
          console.log(res)
          if (res.code == 200) {
            this.F_VideoType = res.data.rows[0].F_VideoType;
            if (res.data.rows[0].Online == "True") {
              this.Mstatus = "在线"
              if (res.data.rows[0].VersionA == null) {
                Mimg.src = "../assets/imgs/警告.svg";
              } else {
                Mimg.src = "../assets/imgs/在线.png";
              }
            }
            else {
              this.Mstatus = "离线"
              if (res.data.rows[0].VersionA == null) {
                Mimg.src = "../assets/imgs/离线.png";
              } else {
                Mimg.src = "../assets/imgs/警告.svg";
              }
            }
          } else {
            return;
          }
        } catch (e) {
          super.errorToast(this.toastCtrl, "/CheckAndAcceptAPI/multimediainfo接口异常:" + e);
        }
      })
      var url2 = "http://122.228.89.215:8887/CheckAndAcceptAPI/record96333";
      this.httpservice.post(url2, JSON.stringify({
        "data": "{'pagination':{rows:5,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'Ecollection':'" + this.inputContent + "'}\"} "
      })).then(res => {
        try {
          console.log(res)
          if (res.code == 200) {

          }
          else {
            return;
          }
        } catch (e) {
          super.errorToast(this.toastCtrl, "/CheckAndAcceptAPI/record96333接口异常:" + e);
        }
      });

    }
    super.successToast(this.toastCtrl, "查询成功");
  }
  my() {
    this.navCtrl.push(ContactPage)
  }
  jc() {
    if (this.inputContent.length != 7) {
      super.warningToast(this.toastCtrl, "电梯编号错误");
      return
    }
    if (this.EFlag == true) {
      super.warningToast(this.toastCtrl, "该电梯已入网");
      return
    }
    if (this.EFlag == null) {
      super.warningToast(this.toastCtrl, "该电梯编号不存在");
      return
    }
    if (this.Estatus == "离线") {
      super.warningToast(this.toastCtrl, "当前电梯离线中，无数据");
      return
    }
    window.localStorage.setItem('ecl', this.inputContent);
    var jcurl = "https://moshme.cn/ElevatorSmall/Elevator.aspx?ecollection=" + this.inputContent
    this.jcurl = jcurl + "&title=hide&zoom=0.5"
    this.iab.create(this.jcurl, '_system', 'location=no')

  }
  goAccpet() {
    if (this.inputContent.length != 7) {
      super.warningToast(this.toastCtrl, "电梯编号错误");
      return
    }
    if (this.EFlag == true) {
      super.warningToast(this.toastCtrl, "该电梯已入网");
      return
    }
    if (this.EFlag == null) {
      super.warningToast(this.toastCtrl, "该电梯编号不存在");
      return
    }
    this.navCtrl.push(AcceptancePage, {
      ecllotion: this.inputContent
    })
  }
  archives() {
    if (this.inputContent.length != 7) {
      super.warningToast(this.toastCtrl, "电梯编号错误");
      return
    }
    if (this.EFlag == true) {
      super.warningToast(this.toastCtrl, "该电梯已入网");
      return
    }
    if (this.EFlag == null) {
      super.warningToast(this.toastCtrl, "该电梯编号不存在");
      return
    }
    window.localStorage.setItem('ecl', this.inputContent);
    this.navCtrl.push(ArchivesPage, {
      ecllotion: this.inputContent
    })
  }
  multimedia() {

    if (this.inputContent.length != 7) {
      super.warningToast(this.toastCtrl, "电梯编号错误");
      return
    }
    if (this.EFlag == true) {
      super.warningToast(this.toastCtrl, "该电梯已入网");
      return
    }
    if (this.EFlag == null) {
      super.warningToast(this.toastCtrl, "该电梯编号不存在");
      return
    }
    window.localStorage.setItem('ecl', this.inputContent);
    this.navCtrl.push(MultimediaPage, {
      ecllotion: this.inputContent
    })
  }
}

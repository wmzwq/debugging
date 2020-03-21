import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { HttpSerProvider } from '../../app/http-serve';
import { BaseUI } from '../../app/baseui';
import * as $ from 'jquery';
import { url1, url2, flag } from '../../app/config';
import { DeviceControlPage } from '../device-control/device-control';
/**
 * Generated class for the MultimediaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-multimedia',
  templateUrl: 'multimedia.html',
})
export class MultimediaPage extends BaseUI {
  ecl: any;
  URL: string;
  inputContent: any;
  mList: any;
  F_Name: any;
  Online: any;
  putInto: string;
  networkType: string;
  androidBox: string;
  color: string;
  F_Id: any;
  F_Remark: any;
  Enumber: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpservice: HttpSerProvider, public toastCtrl: ToastController,
    private loadingCtrl: LoadingController, public alertCtrl: AlertController, ) {
    super()
    this.ecl = this.navParams.data.ecllotion;
    this.inputContent = this.ecl;
    var m = flag
    if (m == 1) {
      this.URL = url1;
    } else {
      this.URL = url2;
    }
    this.search()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MultimediaPage');
  }
  search() {
    if (this.inputContent == undefined) {
       super.warningToast(this.toastCtrl, "电梯编号不能为空");
      return
    }
    if (this.inputContent.length != 7) {
       super.warningToast(this.toastCtrl, "电梯编号错误");
      return
    }
    console.log(this.inputContent)
    var url = this.URL + "/CheckAndAcceptAPI/multimediainfo";
    this.httpservice.post(url, JSON.stringify({
      "data": "{ \"pagination\": { rows: 50, page: 1, sidx: '', sord: 'ASC' }, \"queryJson\": \"{'F_Name':'" + this.inputContent + "'}\" }"
    })).then(res => {
      try {

        console.log(res)
        this.Enumber = res.data.rows[0].F_Ecollection
        this.F_Name = res.data.rows[0].F_Name;
        if (res.data.rows[0].Online == "True") {
          this.Online = "在线"
        } else {
          this.Online = "离线"
        }
        if (res.data.rows[0].F_OperationOfState == 1) {
          this.putInto = "put"
        } else if (res.data.rows[0].F_OperationOfState == 2) {
          this.putInto = "test"
        } else if (res.data.rows[0].F_OperationOfState == 3) {
          this.putInto = "inventory"
        } else if (res.data.rows[0].F_OperationOfState == 4) {
          this.putInto = "disable"
        } else if (res.data.rows[0].F_OperationOfState == 5) {
          this.putInto = "pass"
        } else {
          this.putInto = "choose"
        }
        if (res.data.rows[0].F_NetworkType == 1) {
          this.networkType = "telecomB"
        } else if (res.data.rows[0].F_NetworkType == 2) {
          this.networkType = "mobileB"
        } else if (res.data.rows[0].F_NetworkType == 3) {
          this.networkType = "unicomB"
        } else if (res.data.rows[0].F_NetworkType == 4) {
          this.networkType = "trafficC"
        } else if (res.data.rows[0].F_NetworkType == 5) {
          this.networkType = "mobileC"
        } else if (res.data.rows[0].F_NetworkType == 6) {
          this.networkType = "unicomC"
        } else if (res.data.rows[0].F_NetworkType == 7) {
          this.networkType = "other"
        } else {
          this.networkType = "choose"
        }
        if (res.data.rows[0].F_VideoType == 1) {
          this.androidBox = "singleCamera"
        } else if (res.data.rows[0].F_VideoType == 2) {
          this.androidBox = "externalBox"
        }else if (res.data.rows[0].F_VideoType == 3) {
          this.androidBox = "ys"
        }  else {
          this.androidBox = "choose"
        }
        if (res.data.rows[0].F_WatermarkColour == 0) {
          this.color = "white"
        } else if (res.data.rows[0].F_WatermarkColour == 1) {
          this.color = "black"
        } else {
          this.color = "choose"
        }
        this.F_Remark = res.data.rows[0].F_Remark
        this.F_Id = res.data.rows[0].F_Id
         super.successToast(this.toastCtrl, "查询成功");
      } catch (e) {
        super.errorToast(this.toastCtrl, "/CheckAndAcceptAPI/multimediainfo接口异常:" + e);
      }


    });
  }
  gocontrol() {
    this.navCtrl.push(DeviceControlPage, {
      ecllotion: this.inputContent
    })
  }
  confirm() {
    // if (this.putInto == "pass") {
    //    super.warningToast(this.toastCtrl, "已验收通过电梯不可修改");
    //   return;
    // }
    var Ename = $('#Ename').val();
    var Erecorder;
    if ($('#Erecorder').val() == "在线") {
      Erecorder = "True"
    } else {
      Erecorder = ""
    }
    var F_OperationOfState;
    if (this.putInto == "put") {
      F_OperationOfState = 1
    } else if (this.putInto == "test") {
      F_OperationOfState = 2
    } else if (this.putInto == "inventory") {
      F_OperationOfState = 3
    } else if (this.putInto == "disable") {
      F_OperationOfState = 4
    } else if (this.putInto == "pass") {
      F_OperationOfState = 5
    }
    var F_NetworkType;
    if (this.networkType == "telecomB") {
      F_NetworkType = 1
    } else if (this.networkType == "mobileB") {
      F_NetworkType = 2
    } else if (this.networkType == "unicomB") {
      F_NetworkType = 3
    } else if (this.networkType == "trafficC") {
      F_NetworkType = 4
    } else if (this.networkType == "mobileC") {
      F_NetworkType = 5
    } else if (this.networkType == "unicomC") {
      F_NetworkType = 6
    } else if (this.networkType == "other") {
      F_NetworkType = 7
    }
    var F_VideoType;
    if (this.androidBox == "singleCamera") {
      F_VideoType = 1
    } else if (this.androidBox == "externalBox") {
      F_VideoType = 2
    }
    else if (this.androidBox == "ys") {
      F_VideoType = 3
    }
    var F_WatermarkColour;
    if (this.color == "black") {
      F_WatermarkColour = 1
    } else if (this.color == "white") {
      F_WatermarkColour = 0
    }
    var F_Remark;
    F_Remark = this.F_Remark
    var url = this.URL + "/CheckAndAcceptAPI/multimediainfoAdd";
    this.httpservice.post(url, JSON.stringify({
      "data": "{ 'KeyValue':'" + this.F_Id + "', \"strEntity\": \"{'F_Name':'" + Ename + "','Online':'" + Erecorder + "','Online':'" + Erecorder + "','F_OperationOfState':'" + F_OperationOfState + "','F_NetworkType':'" + F_NetworkType + "','F_NetworkType':'" + F_NetworkType + "','F_VideoType':'" + F_VideoType + "','F_WatermarkColour':'" + F_WatermarkColour + "','F_Remark':'" + F_Remark + "'}\" }"
    })).then(res => {
      try {
        console.log(res)
        super.successToast(this.toastCtrl, res.info);
      } catch (e) {
         super.errorToast(this.toastCtrl, "/CheckAndAcceptAPI/multimediainfoAdd接口异常:" + e);
      }
    });
  }
  restart() {
    if (this.inputContent.length != 7) {
       super.warningToast(this.toastCtrl, "电梯编号错误！");
      return;
    }
    var method = 0x00
    this.remoteRead(method)
  }
  remoteRead(method) {
    var loader = this.loadingCtrl.create({
      content: "数据通讯中，请稍候！",
      duration: 10000,

    });
    loader.present();
    var remote = {
      time: 10,
      success: true,
      remoteUrl: "ws://122.228.89.215:16161/echo",
      localUrl: "ws://192.168.1.134:16161/echo",
      ws: null,
      MAX_WAIT_TIME: 10
    };
    remote.time = remote.MAX_WAIT_TIME;
    remote.success = false;
    sendWait();

    function sendWait() {

      setTimeout(function () {
        if (!remote.success) {
          if (remote.time > 0) {
            remote.time--;
            sendWait();
          } else {
            loader.dismiss();
            remote.ws.close();
            const m = document.createElement('div');
            m.innerHTML = "网关通讯超时！";
            m.style.cssText = "max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
            document.body.appendChild(m);
            setTimeout(function () {
              var d = 0.5;
              m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
              m.style.opacity = '0';
              setTimeout(function () {
                document.body.removeChild(m)
              }, d * 1000);
            }, 2000);
          }
        }
      }, 1000);
    }

    function doSend(bytes, client) {
      var buffer = new ArrayBuffer(bytes.length);
      var view = new DataView(buffer);
      view.setUint8(0, bytes.length);
      for (var i = 0; i < bytes.length; i++) {
        view.setUint8(i, bytes[i]);
      }
      client.send(view);
    };

    function processArrayBuffer(data) {
      loader.dismiss();
      var result = new Uint8Array(data);
      console.log(result)
      if (result.length == 1) {
        if (result[0] == 1) {
          remote.success = true;
          const m = document.createElement('div');
          m.innerHTML = "网关正忙，请稍后";
          m.style.cssText = "max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
          document.body.appendChild(m);
          setTimeout(function () {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function () {
              document.body.removeChild(m)
            }, d * 1000);
          }, 2000);
        } else {

        }
      } else {
        remote.success = true;
        const m = document.createElement('div');
        m.innerHTML = "通讯成功";
        m.style.cssText = "max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
        document.body.appendChild(m);
        setTimeout(function () {
          var d = 0.5;
          m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
          m.style.opacity = '0';
          setTimeout(function () {
            document.body.removeChild(m)
          }, d * 1000);
        }, 2000);


      }

    }
    var url = this.URL + "/CheckAndAcceptAPI/multimediacontrol";
    this.httpservice.post(url, JSON.stringify({
      "data": "{ 'keyValue': '" + this.ecl + "','control': '" + method + "'} "
    })).then(res => {
      try {
        console.log(res)
        var cmd = [];
        res.data.Cmd.split('-').forEach(function (data, index, arr) {
          cmd.push(parseInt(data, 16));
        })
        remote.ws = new WebSocket(remote.remoteUrl);
        remote.ws.binaryType = "arraybuffer"
        if ("WebSocket" in window) {
          remote.ws.onopen = function () {
            console.log(cmd)
            doSend(cmd, remote.ws);
          };
          remote.ws.onmessage = function (evt) {
            console.log(evt)
            if (evt.data instanceof ArrayBuffer) { // 处理字节信息
              processArrayBuffer(evt.data);
            } else {
              //  processText(evt.data); // 处理文本信息
            }
            remote.ws.close();
          };
          remote.ws.onclose = function () { };
          remote.ws.onerror = function (data) {
            loader.dismiss();
            const m = document.createElement('div');
            m.innerHTML = "数据发送失败！";
            m.style.cssText = "max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
            document.body.appendChild(m);
            setTimeout(function () {
              var d = 0.5;
              m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
              m.style.opacity = '0';
              setTimeout(function () {
                document.body.removeChild(m)
              }, d * 1000);
            }, 2000);
          }
        } else {
          loader.dismiss();
          super.warningToast(this.toastCtrl, "您的浏览器不支持 WebSocket！无法使用远程上传与下载功能！")
        }
      } catch (e) {
        loader.dismiss();
         super.errorToast(this.toastCtrl, "/CheckAndAcceptAPI/multimediacontrol接口异常:" + e);
      }
    });
  }
  Modify(){
    const prompt = this.alertCtrl.create({
      title: '确认修改',
      message: "请输入新的电梯编号",
      inputs: [
        {
          name: 'title',
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
          }
        },
        {
          text: '确定',
          handler: data => {
            if(data.title.length!=7){
              console.log(data.title)
              super.warningToast(this.toastCtrl,'电梯编号长度不为7位!')
            }else{
              this.remoteModify(data.title)
            }
            
          }
        }
      ]
    });
    prompt.present();
  }
  remoteModify(data){
    var remote = {
      time: 10,
      success: true,
      remoteUrl: "ws://122.228.89.215:16161/echo",
      localUrl: "ws://192.168.1.134:16161/echo",
      ws: null,
      MAX_WAIT_TIME: 10
  };
  var loader = this.loadingCtrl.create({
    content: "数据通讯中，请稍候！",
    duration: 10000,

  });
  loader.present();
  remote.time = remote.MAX_WAIT_TIME;
  remote.success = false;
  sendWait();
    function sendWait() {
      setTimeout(function () {
        if (!remote.success) {
          if (remote.time > 0) {
            remote.time--;
            sendWait();
          } else {
            remote.ws.close();
            const m = document.createElement('div');
            m.innerHTML = "网关通讯超时！";
            m.style.cssText = "max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
            document.body.appendChild(m);
            setTimeout(function () {
              var d = 0.5;
              m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
              m.style.opacity = '0';
              setTimeout(function () {
                document.body.removeChild(m)
              }, d * 1000);
            }, 2000);
          }
        }
      }, 1000);
    }
    remote.ws = new WebSocket(remote.remoteUrl);
    remote.ws.binaryType = "arraybuffer"
    if ("WebSocket" in window) {
      remote.ws.onopen =  () =>{
 
          var ContentDate = [
              "{",
              "\"Cmd\":\"Transmit\",",
              "\"ClientCmd\":\"SetSessionId\",",
              "\"KeyValue\":\"" + this.Enumber+ "\",",
              "\"NewKeyValue\":\"" +data + "\",",
              "\"TargetType\":\"Player\",",
              "\"OriginType\":\"PlayerWeb\"",
              "}"
          ].join("");
          console.log(ContentDate)
          //var ContentDate = '{"Cmd": "Transmit", "ClientCmd": "' + setType + '", "KeyValue": "' + order + '", "TargetType": "Player", "OriginType": "PlayerWeb","Config":{"Volume":' + Number + '} }';
          remote.ws.send(ContentDate);
      };
      remote.ws.onmessage =  (evt)=> {
          var dataJson = eval("(" + evt.data + ")");
          if (dataJson.Cmd != "Heartbeat") {
              console.log(dataJson)
              if (dataJson.ClientCmd == "Offline") {
                  remote.success = true;
                  super.warningToast(this.toastCtrl,'多媒体机离线！');
              } else {
                  remote.success = true;
                  super.successToast(this.toastCtrl,'数据发送成功!')
              
                  remote.ws.close();
              }
          }

      };
      remote.ws.onclose =  ()=> {
          loader.dismiss()
          console.log('通讯关闭');
      };
      remote.ws.onerror =  (data)=> {
          super.errorToast(this.toastCtrl,'数据获取失败!')
          remote.ws.close();
      }
  }
  else {
       loader.dismiss()
       super.errorToast(this.toastCtrl,'您的浏览器不支持 WebSocket！无法使用远程上传与下载功能!')
  }
  }
  // upload() {
  //   if (this.inputContent.length != 7) {
  //      super.warningToast(this.toastCtrl, "电梯编号错误！");
  //     return;
  //   }
  //   var method = 0x01
  //   this.remoteRead(method)
  // }
  // down() {
  //   if (this.inputContent.length != 7) {
  //     super.warningToast(this.toastCtrl, "电梯编号错误！");
  //     return;
  //   }
  //   var method = 0x02
  //   this.remoteRead(method)
  // }
}

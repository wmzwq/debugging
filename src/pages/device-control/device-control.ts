import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { BaseUI } from '../../app/baseui';
import { url1, url2, flag } from '../../app/config';

/**
 * Generated class for the DeviceControlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-control',
  templateUrl: 'device-control.html',
})
export class DeviceControlPage extends BaseUI {

  ecl: any;
  URL: any;
  video: any;
  microphone: string;
  Eversion: any;
  CaptureWidth: any;
  CaptureHeight: any;
  resolution: string;
  speakers: any;
  videoFrame: any;
  videoBit: string;
  Orientation: any;
  VideoTop: any;
  VideoBottom: any;
  VideoLeft: any;
  CameraState: any;
  RecordMark: any;
  Watermarkenable: any;
  SMDTWatchDog: any;
  SMDTTimeEnable: any;
  SMDToffTime: any;
  SMDTonTime: any;
  CameraHz: any;
  Watermark: any;
  WatermarkColor: any;
  WatermarkTextSize: any;
  EncodeWidth: any;
  EncodeHeight: any;
  HasScreen: any;
  Website: any;
  VideoRight: any;
  SMDTVolume: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
    private loadingCtrl: LoadingController, public alertCtrl: AlertController, ) {
    super();
    this.ecl = this.navParams.data.ecllotion;
    var m = flag
    if (m == 1) {
      this.URL = url1;
    }
    else {
      this.URL = url2;
    }
    this.search()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceControlPage');
  }

  search() {
    this.GetInstructions(this.ecl, "GetConfig");
  }
  GetInstructions(order, setType) {
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
    remote.ws = new WebSocket(remote.remoteUrl);
    remote.ws.binaryType = "arraybuffer";
    if ("WebSocket" in window) {
      remote.ws.onopen = function () {
        console.log('{ "Cmd": "Transmit", "ClientCmd": "' + setType + '", "KeyValue": "' + order + '", "TargetType": "Player", "OriginType": "PlayerWeb","Config":{"Volume":0} }')
        remote.ws.send('{ "Cmd": "Transmit", "ClientCmd": "' + setType + '", "KeyValue": "' + order + '", "TargetType": "Player", "OriginType": "PlayerWeb","Config":{"Volume":0} }');

      };
      remote.ws.onmessage = (evt) => {
        var dataJson = eval("(" + evt.data + ")");
        if (dataJson.Cmd != "Heartbeat") {
          console.log(dataJson)
          if (dataJson.ClientCmd == "Offline") {
            remote.success = true;
            remote.ws.close();
            super.warningToast(this.toastCtrl, "多媒体机离线！");
            return false;
          }
          this.SMDTVolume=dataJson.Config.SMDTVolume;
          this.Orientation=dataJson.Config.Orientation;
          this.VideoTop=dataJson.Config.VideoTop;
          this.VideoBottom=dataJson.Config.VideoBottom;
          this.VideoLeft=dataJson.Config.VideoLeft;
          this.VideoRight=dataJson.Config.VideoRight;
          this.CameraState=dataJson.Config.CameraState;
          this.RecordMark=dataJson.Config.RecordMark;
          this.Watermarkenable=dataJson.Config.Watermarkenable;
          this.SMDTWatchDog=dataJson.Config.SMDTWatchDog;
          this.SMDTTimeEnable =dataJson.Config.SMDTTimeEnable;
          this.SMDToffTime=dataJson.Config.SMDToffTime;
          this.SMDTonTime=dataJson.Config.SMDTonTime;
          this.CameraHz=dataJson.Config.CameraHz;
          this.Watermark =dataJson.Config.Watermark;
          this.WatermarkTextSize =dataJson.Config.WatermarkTextSize;
          this.WatermarkColor =dataJson.Config.WatermarkColor;
          this.EncodeWidth=dataJson.Config.EncodeWidth;
          this.EncodeHeight =dataJson.Config.EncodeHeight;
          this.HasScreen =dataJson.Config.HasScreen;
          this.Website =dataJson.Config.Website;
          if ((dataJson.Config.Volume * 100) == null) {
            this.video = "choose"
          }
          else {
            this.video = dataJson.Config.Volume * 100
          }
          if ((dataJson.Config.MicVolume) == null) {
            this.microphone = "choose"
          }
          else {
            this.microphone = dataJson.Config.MicVolume
          }
          this.CaptureWidth = dataJson.Config.CaptureWidth;
          this.CaptureHeight = dataJson.Config.CaptureHeight
          if (this.CaptureWidth == "1920" && this.CaptureHeight == "1080") {
            this.resolution = "1920"
          } else if (this.CaptureWidth == "1024" && this.CaptureHeight == "768") {
            this.resolution = "720"
          } else if (this.CaptureWidth == "800" && this.CaptureHeight == "600") {
            this.resolution = "600"
          } else {
            this.resolution = "choose"
          }
          if (dataJson.Config.CallVolume == null) {
            this.speakers = "choose"
          }
          else {
            this.speakers = dataJson.Config.CallVolume
          }
          if (dataJson.Config.VideoFPS == null) {
            this.videoFrame = "choose"
          }
          else {
            this.videoFrame = (dataJson.Config.VideoFPS) / 10;
          }
          if (dataJson.Config.VideoBitrate == null) {
            this.videoBit = "choose"
          }
          else {
            this.videoBit = dataJson.Config.VideoBitrate
          }

          remote.success = true;
          super.successToast(this.toastCtrl, "读取数据成功");
          remote.ws.close();
        }
      }

      remote.ws.onclose = function () {
        loader.dismiss()
        remote.ws.close();
        console.log('通讯关闭');
      };
      remote.ws.onerror = (data) => {
        remote.ws.close();
        loader.dismiss()
        super.warningToast(this.toastCtrl, "通讯超时");
      }
    }
    else {
      super.warningToast(this.toastCtrl, "您的浏览器不支持 WebSocket！无法使用远程上传与下载功能！");
    }
  }
  confirm() {
    let alert = this.alertCtrl.create({
      title: '确定更改',
      cssClass: 'headChoice',
      message: "是否确认更改！",
      buttons: [{
        text: '取消',
        handler: () => {
          console.log("cancel")
        }
      },
      {
        text: '确定',
        handler: () => {
          this.mwrite()
        }
      }
      ]
    });
    alert.present();
  }
  mwrite() {

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
            loader.dismiss()
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
      remote.ws.onopen = () => {
        var Volume
        var MicVolume
        var CallVolume
        var VideoFPS
        var VideoBitrate
        if (this.video == "choose") {
          Volume = null
        }
        else {
          Volume = this.video
        }
        if (this.microphone == "choose") {
          MicVolume = null
        }
        else {
          MicVolume = this.microphone
        }
        if (this.speakers == "choose") {
          CallVolume = null
        }
        else {
          CallVolume = this.speakers
        }
        if (this.videoFrame == "choose") {
          VideoFPS = null
        }
        else {
          VideoFPS = (this.videoFrame) * 10
        }
        if (this.videoBit == "choose") {
          VideoBitrate = null
        }
        else {
          VideoBitrate = this.videoBit
        }
        if (this.resolution == "1920") {
          this.CaptureWidth = "1920"
          this.CaptureHeight = "1080"
        } else if (this.resolution == "720") {
          this.CaptureWidth = "1024"
          this.CaptureHeight = "768"
        } else if (this.resolution == "600") {
          this.CaptureWidth = "800"
          this.CaptureHeight = "600"
        }
        else if (this.resolution == "choose") {
          super.warningToast(this.toastCtrl, "请选择屏幕分辨率");
          return false;
        }
        var ContentDate = [
          "{",
          "\"Cmd\":\"Transmit\",",
          "\"ClientCmd\":\"SetConfig\",",
          "\"KeyValue\":\"" +  this.ecl + "\",",
          "\"TargetType\":\"Player\",",
          "\"OriginType\":\"PlayerWeb\",",
          "\"Config\":{",
          "\"Volume\":" +  Volume / 100 + ",",
          "\"Orientation\":" + this.Orientation + ",",
          "\"VideoTop\":" + this.VideoTop + ",",
          "\"VideoBottom\":" + this.VideoBottom + ",",
          "\"VideoLeft\":" + this.VideoLeft + ",",
          "\"VideoRight\":" + this.VideoRight + ",",
          "\"CameraState\":\"" + this.CameraState + "\",",
          "\"SMDTVolume\":\"" + this.SMDTVolume + "\",",
          "\"MicVolume\":" + MicVolume + ",",
          "\"CallVolume\":" + CallVolume + ",",
          "\"RecordMark\":" + this.RecordMark + ",",
          "\"Watermarkenable\":" + this.Watermarkenable + ",",
          "\"SMDTWatchDog\":\"" + this.SMDTWatchDog + "\",",
          "\"SMDTTimeEnable\":\"" + this.SMDTTimeEnable + "\",",
          "\"SMDToffTime\":\"" + this.SMDToffTime + "\",",
          "\"SMDTonTime\":\"" + this.SMDTonTime + "\",",
          "\"CameraHz\":\"" + this.CameraHz + "\",",
          "\"VideoFPS\":" + VideoFPS + ",",
          "\"VideoBitrate\":" + VideoBitrate+ ",",
          "\"Watermark\":\"" + this.Watermark + "\",",
          "\"WatermarkTextSize\":" + this.WatermarkTextSize + ",",
          "\"WatermarkColor\":" + this.WatermarkColor + ",",
          "\"CaptureWidth\":" + this.CaptureWidth + ",",
          "\"CaptureHeight\":" + this.CaptureHeight+ ",",
          "\"EncodeWidth\":" + this.EncodeWidth + ",",
          "\"EncodeHeight\":" + this.EncodeHeight + ",",
          "\"HasScreen\":" + this.HasScreen + ",",
          "\"Website\":\"" + this.Website + "\"",
          "}",
          "}"
      ].join("");
        console.log(ContentDate)
        remote.ws.send(ContentDate);
      };
      remote.ws.onmessage = (evt) => {
        var dataJson = eval("(" + evt.data + ")");
        if (dataJson.Cmd != "Heartbeat") {
          console.log(dataJson)
          if (dataJson.ClientCmd == "Offline") {
            remote.success = true;
            remote.ws.close();
            super.warningToast(this.toastCtrl, "多媒体机离线！");
          } else {
            remote.success = true;
            super.successToast(this.toastCtrl, "数据发送成功");
            remote.ws.close();
          }
        }

      };
      remote.ws.onclose = function () {
        loader.dismiss()
        remote.ws.close();
        console.log('通讯关闭');
      };
      remote.ws.onerror = (data) => {
        loader.dismiss()
        remote.ws.close();
        super.warningToast(this.toastCtrl, "通讯超时");
      }
    }
    else {
      super.warningToast(this.toastCtrl, "您的浏览器不支持 WebSocket！无法使用远程上传与下载功能！");
    }

  }
  mRestart() {
    let alert = this.alertCtrl.create({
      title: '确定重启',
      cssClass: 'headChoice',
      message: "是否确认重启！",
      buttons: [{
        text: '取消',
        handler: () => {
          console.log("cancel")
        }
      },
      {
        text: '确定',
        handler: () => {
          this.Reboot()
        }
      }
      ]
    });
    alert.present();
  }
  restart() {
    let alert = this.alertCtrl.create({
      title: '确定重启',
      cssClass: 'headChoice',
      message: "是否确认重启！",
      buttons: [{
        text: '取消',
        handler: () => {
          console.log("cancel")
        }
      },
      {
        text: '确定',
        handler: () => {
          this.Restart()
        }
      }
      ]
    });
    alert.present();
  }
  Reboot() {
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
            loader.dismiss()
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
      remote.ws.onopen = () => {
        var ContentDate = [
          "{",
          "\"Cmd\":\"Transmit\",",
          "\"ClientCmd\":\"Reboot\",",
          "\"KeyValue\":\"" + this.ecl + "\",",
          "\"TargetType\":\"Player\",",
          "\"OriginType\":\"PlayerWeb\"",
          "}"
        ].join("");
        console.log(ContentDate)

        remote.ws.send(ContentDate);
      };
      remote.ws.onmessage = (evt) => {
        var dataJson = eval("(" + evt.data + ")");
        if (dataJson.Cmd != "Heartbeat") {
          console.log(dataJson)
          if (dataJson.ClientCmd == "Offline") {
            remote.success = true;
            remote.ws.close();
            super.warningToast(this.toastCtrl, "多媒体机离线！");
          } else {
            remote.success = true;
            super.successToast(this.toastCtrl, "数据发送成功");
            remote.ws.close();
          }
        }
      };
      remote.ws.onclose = function () {
        loader.dismiss()
        remote.ws.close();
        console.log('通讯关闭');
      };
      remote.ws.onerror = (data) => {
        remote.ws.close();
        super.warningToast(this.toastCtrl, "通讯超时");
      }
    }
    else {
      super.warningToast(this.toastCtrl, "您的浏览器不支持 WebSocket！无法使用远程上传与下载功能！");
    }
  }
  Restart() {
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
            loader.dismiss()
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
      remote.ws.onopen = () => {
        var ContentDate = [
          "{",
          "\"Cmd\":\"Transmit\",",
          "\"ClientCmd\":\"Restart\",",
          "\"KeyValue\":\"" + this.ecl + "\",",
          "\"TargetType\":\"Player\",",
          "\"OriginType\":\"PlayerWeb\"",
          "}"
        ].join("");
        console.log(ContentDate)

        remote.ws.send(ContentDate);
      };
      remote.ws.onmessage = (evt) => {
        var dataJson = eval("(" + evt.data + ")");
        if (dataJson.Cmd != "Heartbeat") {
          console.log(dataJson)
          if (dataJson.ClientCmd == "Offline") {
            remote.success = true;
            remote.ws.close();
            super.warningToast(this.toastCtrl, "多媒体机离线！");
          } else {

            remote.success = true;
            super.successToast(this.toastCtrl, "数据发送成功");
            remote.ws.close();
          }
        }
      };
      remote.ws.onclose = function () {
        loader.dismiss()
        remote.ws.close();
        console.log('通讯关闭');
      };
      remote.ws.onerror = (data) => {
        remote.ws.close();
        super.warningToast(this.toastCtrl, "通讯超时");
      }
    }
    else {
      super.warningToast(this.toastCtrl, "您的浏览器不支持 WebSocket！无法使用远程上传与下载功能！");
    }
  }
}

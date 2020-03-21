import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { BaseUI } from '../../app/baseui';
import { HttpSerProvider } from '../../app/http-serve';
import * as $ from "jquery";
import { AboutPage } from '../about/about';
/**
 * Generated class for the Record96333Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-record96333',
  templateUrl: 'record96333.html',
})
export class Record96333Page extends BaseUI{
  ecl: any;
  recordList: any;
  archives: any;
  remote: { time: number; success: boolean; remoteUrl: string; localUrl: string; ws: any; MAX_WAIT_TIME: number; };
  loader: any;
  flag: boolean;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private httpservice: HttpSerProvider, 
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,) {
    super();
    this.ecl = this.navParams.data.ecllotion;
   this.remote = {
      time: 10,
      success: true,
      remoteUrl: "ws://122.228.89.215:16161/echo",
      localUrl: "ws://192.168.1.134:16161/echo",
      ws: null,
      MAX_WAIT_TIME: 10
  };
    this.archives={
      F_License:"91330302336960443P",
      F_VideoUrl:"https://moshme.cn/WZ96333/wz/VideoQuick.html?",
      F_RealUrl:"https://moshme.cn/WZ96333/wz/VideoQuick.html?",
      F_InterfaceNumber1:"100001",
      F_InterfaceUrl1:"http://currentstatus.wz96333.com/api/currentstatus",
      F_InterfacePassword1:"d0a953c3ee6040eaa9fae2b667060e01",
      F_InterfaceNumber2:"200001",
      F_InterfaceUrl2:"http://faultevent.wz96333.com/api/FaultEvent",
      F_InterfacePassword2:"a0a953c3ee6040eaa9fae2b667060e01",
    }
    this.record()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Record96333Page');
  }
  record(){
    var url="http://122.228.89.215:8887/CheckAndAcceptAPI/record96333";
  this.httpservice.post(url, JSON.stringify({
 "data": "{'pagination':{rows:5,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'Ecollection':'" + this.ecl + "'}\"} "
    })).then(res=>{
      console.log(res)
      if(res.code==200){
        if(res.data.rows.length==0){
          this.recordList=[];
          this.recordList.push({F_License: null, F_VideoUrl: null,F_RealUrl: null,F_InterfaceNumber1: null,F_InterfaceUrl1: null,F_InterfacePassword1: null,F_InterfaceNumber2: null,F_InterfaceUrl2: null,F_InterfacePassword2: null,});
        }else{
          this.recordList=res.data.rows;
        }
      }
    else{
      this.recordList=[];
      this.recordList.push({F_License: null, F_VideoUrl: null,F_RealUrl: null,F_InterfaceNumber1: null,F_InterfaceUrl1: null,F_InterfacePassword1: null,F_InterfaceNumber2: null,F_InterfaceUrl2: null,F_InterfacePassword2: null,});
    }
     
    super.successToast(this.toastCtrl,"查询成功", );
  });
  
 }
 confirm(){
    var F_License = $("#F_License").val();
    var F_VideoUrl = $("#F_VideoUrl").val();
    var F_RealUrl = $("#F_RealUrl").val();
    var F_InterfaceNumber1 = $("#F_InterfaceNumber1").val();
    var F_InterfaceUrl1 = $("#F_InterfaceUrl1").val();
    var F_InterfacePassword1 = $("#F_InterfacePassword1").val();
    var F_InterfaceNumber2 = $("#F_InterfaceNumber2").val();
    var F_InterfaceUrl2 = $("#F_InterfaceUrl2").val();
    var F_InterfacePassword2 = $("#F_InterfacePassword2").val();
    var url="http://122.228.89.215:8887/CheckAndAcceptAPI/modifyRecord96333";
  this.httpservice.post(url, JSON.stringify({
 "data": "{'KeyValue':'" + this.ecl + "','strEntity':\"{'F_License':'" +F_License+ "','F_VideoUrl':'" +F_VideoUrl+ "','F_RealUrl':'" +F_RealUrl+ "','F_InterfaceNumber1':'" +F_InterfaceNumber1+ "','F_InterfaceUrl1':'" +F_InterfaceUrl1+ "','F_InterfacePassword1':'" +F_InterfacePassword1+ "','F_InterfaceNumber2':'" +F_InterfaceNumber2+ "','F_InterfaceUrl2':'" +F_InterfaceUrl2+ "','F_InterfacePassword2':'" +F_InterfacePassword2+ "'}\"} "
    })).then(res=>{
      console.log(res)
      super.successToast(this.toastCtrl,res.info, );
  });
 }
 paste(){
 $("#F_License").val(this.archives['F_License'])
 $("#F_VideoUrl").val(this.archives['F_VideoUrl'])
 $("#F_RealUrl").val(this.archives['F_RealUrl'])
 $("#F_InterfaceNumber1").val(this.archives['F_InterfaceNumber1'])
 $("#F_InterfaceUrl1").val(this.archives['F_InterfaceUrl1'])
 $("#F_InterfacePassword1").val(this.archives['F_InterfacePassword1'])
 $("#F_InterfaceNumber2").val(this.archives['F_InterfaceNumber2'])
 $("#F_InterfaceUrl2").val(this.archives['F_InterfaceUrl2'])
 $("#F_InterfacePassword2").val(this.archives['F_InterfacePassword2'])
  super.successToast(this.toastCtrl,"粘贴成功", );
 }
 down(){
  var url="http://122.228.89.215:8887/CheckAndAcceptAPI/GetReadCmd";
  this.httpservice.post(url, JSON.stringify({
 "data": "{'strEntity':\"{'keyValue':'" + this.ecl + "'}\"} "
    })).then(res=>{
      console.log(res)
      var cmd = [];
      res.data.Cmd.split('-').forEach( (data, index, arr)=> {
          cmd.push(parseInt(data, 16));
      })
      this.remoteRead(cmd)
  });
 }
sendWait() {
  setTimeout(()=> {
      if (! this.remote.success) {
          if ( this.remote.time > 0) {
            this.remote.time--;
            this.sendWait();
          } else {
              this.remote.ws.close();
               super.warningToast(this.toastCtrl,"网关通讯超时！", );
          }
      }
  }, 1000);
}
doSend(bytes) {
  var buffer = new ArrayBuffer(bytes.length);
  var view = new DataView(buffer);
  view.setUint8(0, bytes.length);
  for (var i = 0; i < bytes.length; i++) {
      view.setUint8(i, bytes[i]);
  }
  this.remote.ws.send(view);
}
processArrayBuffer(data) {
  this.loader.dismiss()
  var result = new Uint8Array(data);
  if (result.length == 1) {
      if (result[0] == 1) {
        this.remote.success = true;
        super.warningToast(this.toastCtrl,"网关正忙，请稍后！", );
      } else {

      }
  } else {
    this.remote.success = true;
     super.successToast(this.toastCtrl,"通讯成功", );
      this.transforReceive(result);
  }
}
 remoteRead(cmd) {
   this.flag=true;
 this.loader = this.loadingCtrl.create({
    content: "数据通讯中，请稍候！",
    duration: 10000
  });
  this.loader.present();
  this.transforReceive(false);
  this.remote.time = this.remote.MAX_WAIT_TIME;
  this.remote.success = false;
  this.sendWait();
  this.remote.ws = new WebSocket( this.remote.remoteUrl);
  this.remote.ws.binaryType = "arraybuffer"
  if ("WebSocket" in window) {
    this.remote.ws.onopen =  () =>{
          console.log(cmd);
          this.doSend(cmd);
      };
      this. remote.ws.onmessage =(evt)  =>{
          if (evt.data instanceof ArrayBuffer) { // 处理字节信息
            this.processArrayBuffer(evt.data);
          } else {
              
          }
          this.remote.ws.close();
      };
      this. remote.ws.onclose = () => {
          console.log('websocket closed');
      };
      this. remote.ws.onerror =(data) => {
        this.loader.dismiss()
         super.errorToast(this.toastCtrl,"数据发送失败！", );
      }
  }
  else {
     super.warningToast(this.toastCtrl,"您的浏览器不支持 WebSocket！无法使用远程上传与下载功能！", );
  }
 }
 transforReceive(receives) {
   console.log(receives)
  if (!receives) {
      this.formClear();
  } else {
    if(this.flag==true){
      var content = this.textParse(receives, 28, receives.length - 32);
      var data = { EMS_WZ96333FormData: JSON.parse(content) };
      console.log(data);
      $("#F_License").val(data.EMS_WZ96333FormData.F_License)
      $("#F_VideoUrl").val(data.EMS_WZ96333FormData.F_VideoUrl)
      $("#F_RealUrl").val(data.EMS_WZ96333FormData.F_RealUrl)
      $("#F_InterfaceNumber1").val(data.EMS_WZ96333FormData.F_InterfaceNumber1)
      $("#F_InterfaceUrl1").val(data.EMS_WZ96333FormData.F_InterfaceUrl1)
      $("#F_InterfacePassword1").val(data.EMS_WZ96333FormData.F_InterfacePassword1)
      $("#F_InterfaceNumber2").val(data.EMS_WZ96333FormData.F_InterfaceNumber2)
      $("#F_InterfaceUrl2").val(data.EMS_WZ96333FormData.F_InterfaceUrl2)
      $("#F_InterfacePassword2").val(data.EMS_WZ96333FormData.F_InterfacePassword2)
    }
     
  }
}

 formClear() {
  var content = {
      F_License: "", F_VideoUrl: "", F_RealUrl: "", F_InterfaceNumber1: "", F_InterfaceName1: "", F_InterfaceUrl1: "",
      F_InterfacePassword1: "", F_InterfaceNumber2: "", F_InterfaceName2: "", F_InterfaceUrl2: "", F_InterfacePassword2: "", F_InterfaceNumber3: "",
      F_InterfaceName3: "", F_InterfaceUrl3: "", F_InterfacePassword3: "", F_InterfaceNumber4: "", F_InterfaceName4: "", F_InterfaceUrl4: "",
      F_InterfacePassword4: "", F_InterfaceNumber5: "", F_InterfaceName5: "", F_InterfaceUrl5: "", F_InterfacePassword5: "", F_Phone1: "", F_Phone2:""
  };
  var data = { EMS_WZ96333FormData: content };
}
textParse(bytes, start, length) {
  var text = '';
  for (var i = 0; i < length; i++) {
      if (bytes[start + i] != 0) {
          text += String.fromCharCode(bytes[start + i]);
      }
  }
  return text;
}
upload(){
  var url="http://122.228.89.215:8887/CheckAndAcceptAPI/GetWriteCmd";
  this.httpservice.post(url, JSON.stringify({
 "data": "{'strEntity':\"{'keyValue':'" + this.ecl + "'}\"} "
    })).then(res=>{
      console.log(res)
      var cmd = [];
      res.data.Cmd.split('-').forEach( (data, index, arr)=> {
          cmd.push(parseInt(data, 16));
      })
      this.remoteWrite(cmd)
  });
}
remoteWrite(cmd) {
  this.flag=false;
  this.loader = this.loadingCtrl.create({
    content: "数据通讯中，请稍候！",
    duration: 10000
  });
  this.loader.present();
  this.remote.time = this.remote.MAX_WAIT_TIME;
  this.remote.success = false;
  this.sendWait();
  this.remote.ws = new WebSocket( this.remote.remoteUrl);
  this.remote.ws.binaryType = "arraybuffer"
  if ("WebSocket" in window) {
    this.remote.ws.onopen =  () =>{
          console.log(cmd);
          this.doSend(cmd);
      };
      this. remote.ws.onmessage =(evt)  =>{
        this.remote.ws.close();
        if (evt.data instanceof ArrayBuffer) { // 处理字节信息
          this.processArrayBuffer(evt.data);
      } else {
      
      }
      };
      this. remote.ws.onclose = () => {
          console.log('websocket closed');
      };
      this. remote.ws.onerror =(data) => {
        this.loader.dismiss()
          super.errorToast(this.toastCtrl,"数据发送失败！", );
      }
  }
  else {
    super.warningToast(this.toastCtrl,"您的浏览器不支持 WebSocket！无法使用远程上传与下载功能！", );
  }
}
fault(){
  this.navCtrl.push(AboutPage, {
    ecllotion: this.ecl
  })
}
}

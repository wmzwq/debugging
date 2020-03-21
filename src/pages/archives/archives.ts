import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from "ionic-angular";
import { HttpSerProvider } from "../../app/http-serve";
import { BaseUI } from "../../app/baseui";
import * as $ from "jquery";
import { url1, url2, flag } from "../../app/config";
declare function unescape(s: string): string;
@IonicPage()
@Component({
  selector: "page-archives",
  templateUrl: "archives.html"
})
export class ArchivesPage extends BaseUI {
  mainPage: string = "safetyAnaly";
  segmentsArray = ["safetyAnaly", "maintenance"];
  segmentModel: string = this.segmentsArray[0];
  ecl: any;
  eleList: any;
  Enumber: any;
  Erecorder: any;
  Ename: any;
  Emodel: any;
  Efloor: any;
  Espeed: any;
  Eaddress: any;
  Euser: any;
  Emaintenance: any;
  Euser2: any;
  Etel2: any;
  remote = {
    time: 10,
    success: true,
    remoteUrl: "ws://122.228.89.215:16161/echo",
    localUrl: "ws://192.168.1.134:16161/echo",
    ws: null,
    MAX_WAIT_TIME: 10
  };
  URL: string;
  loader: any;
  door1: string;
  flatLayer1: string;
  flatLayer2: string;
  status: any;
  EsignalCount: any;
  arr: any[];
  ss: any;
  Elevel3: any;
  Elevel7: boolean;
  Elevel8: boolean;
  EfloorHeight: any;
  mainten: string;
  Elevel2: boolean;
  door2: string;
  Elevel4: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpservice: HttpSerProvider,
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    super();
    this.ecl = this.navParams.data.ecllotion;
    var m = flag;
    if (m == 1) {
      this.URL = url1;
    } else {
      this.URL = url2;
    }
    this.search();
  }

  ionViewDidLoad() { }
  search() {
    var url = this.URL + "/CheckAndAcceptAPI/AcceptanceOfTheQueryElevatroInfo";
    console.log(url);
    this.httpservice
      .post(
        url,
        JSON.stringify({
          data: "{ \"pagination\": { rows: 50, page: 1, sidx: '', sord: 'ASC' }, \"queryJson\": \"{'Ecollection':'"+this.ecl +"'}\" }"
        })
      )
      .then(res => {
        try {
          console.log(res);
          if (res.data.rows[0].Elevel3 == true) {
            this.door1 = "highLevel";
          } else if (res.data.rows[0].Elevel3 == false) {
            this.door1 = "lowLevel";
          } else {
            this.door1 = "choose";
          }
          if (res.data.rows[0].Elevel4 == true) {
            this.door2 = "highLevel";
          } else if (res.data.rows[0].Elevel4 == false) {
            this.door2 = "lowLevel";
          } else {
            this.door2 = "choose";
          }
          if (res.data.rows[0].Elevel7 == true) {
            this.flatLayer1 = "highLevel";
          } else if (res.data.rows[0].Elevel7 == false) {
            this.flatLayer1 = "lowLevel";
          } else {
            this.flatLayer1 = "choose";
          }
          if (res.data.rows[0].Elevel2 == true) {
            this.mainten = "highLevel";
          } else if (res.data.rows[0].Elevel2 == false) {
            this.mainten = "lowLevel";
          } else {
            this.mainten = "choose";
          }
          if (res.data.rows[0].Elevel8 == true) {
            this.flatLayer2 = "highLevel";
          } else if (res.data.rows[0].Elevel8 == false) {
            this.flatLayer2 = "lowLevel";
          } else {
            this.flatLayer2 = "choose";
          }
          this.status = res.data.rows[0].F_State;
          this.EsignalCount = res.data.rows[0].EsignalCount;
          this.eleList = res.data.rows;
          this.arr = new Array();
          var newarr = new Array();
          newarr = this.eleList.find(item => {
            for (var i = 1; i <= this.EsignalCount; i++) {
              if (item["Esignal" + i] != "") {
                var arrs = {
                  lc: item["Esignal" + i]
                };
                newarr.push(arrs);
              }
            }
            this.arr = newarr;
          });
        } catch (e) {
           super.errorToast(
            this.toastCtrl,
            "/AcceptanceOfTheQueryElevatroInfo接口异常:" + e
          );
        }
      });
  }
  
  reset() {
    if(this.ss==undefined){
      return false;
    }
    this.arr = new Array();
    var startNumber = $("#EsignalCount" + this.ss).val();
    this.EsignalCount = $("#EsignalCount").val();
    for (var i = 0; i < this.ss; i++) {
      var arrStr = {
        lc: $("#EsignalCount" + i).val()
      };
      this.arr.push(arrStr);
    }
    for (var t = this.ss; t < this.EsignalCount; t++) {
      if (startNumber == 0) {
        startNumber++;
      }
      arrStr = {
        lc: startNumber
      };
      this.arr.push(arrStr);
      startNumber++;
    }
    console.log(this.arr);
  }
  choose(device) {
    this.ss = device;
    console.log(device);
    console.log($("#ch" + device).is(":checked"));
  }
  confirm() {
    // if (this.status == "验收通过") {
    //   super.warningToast(this.toastCtrl, "已验收通过电梯不可修改");
    //   return;
    // }
    this.Enumber = $("#Enumber").val();
    this.Erecorder = $("#Erecorder").val();
    this.Ename = $("#Ename").val();
    this.Emodel = $("#Emodel").val();
    this.Efloor = parseInt($("#Efloor").val());
    this.Espeed = $("#Espeed").val();
    this.Eaddress = $("#Eaddress").val();
    this.Euser = $("#Euser").val();
    this.Emaintenance = $("#Emaintenance").val();
    this.Euser2 = $("#Euser2").val();
    this.Etel2 = $("#Etel2").val();
    this.EfloorHeight = $("#EfloorHeight").val();
    this.EsignalCount = $("#EsignalCount").val();
    if (this.door1 == "lowLevel") {
      this.Elevel3 = false;
    } else if (this.door1 == "highLevel") {
      this.Elevel3 = true;
    }
    if (this.door2 == "lowLevel") {
      this.Elevel4= false;
    } else if (this.door2 == "highLevel") {
      this.Elevel4 = true;
    }
    if (this.flatLayer1 == "lowLevel") {
      this.Elevel7 = false;
    } else if (this.flatLayer1 == "highLevel") {
      this.Elevel7 = true;
    }
    if (this.mainten == "lowLevel") {
      this.Elevel2 = false;
    } else if (this.flatLayer2 == "highLevel") {
      this.Elevel2 = true;
    }
    if (this.flatLayer2 == "lowLevel") {
      this.Elevel8 = false;
    } else if (this.flatLayer2 == "highLevel") {
      this.Elevel8 = true;
    }
    var strEntity = {
      Enumber: this.Enumber,
      Erecorder: this.Erecorder,
      Ename: this.Ename,
      Emodel: this.Emodel,
      Efloor: this.Efloor,
      Espeed: this.Espeed,
      Eaddress: this.Eaddress,
      Euser: this.Euser,
      Emaintenance: this.Emaintenance,
      Euser2: this.Euser2,
      Etel2: this.Etel2,
      EfloorHeight: this.EfloorHeight,
      EsignalCount: this.EsignalCount,
      Elevel2: this.Elevel2,
      Elevel3: this.Elevel3,
      Elevel4: this.Elevel4,
      Elevel7: this.Elevel7,
      Elevel8: this.Elevel8
    };
    console.log(strEntity);
    for (var i = 0; i < this.EsignalCount; i++) {
      var d = i + 1;
      strEntity["Esignal" + d] = $("#EsignalCount" + i).val();
    }
    for (var t = this.EsignalCount; t < 137; t++) {
      var k = t + 1;
      strEntity["Esignal" + k] = "";
    }
    var ss = JSON.stringify(strEntity);
    console.log(
      JSON.stringify({
        data: "{ 'KeyValue':'" + this.ecl + "', strEntity: '" + ss + "'}"
      })
    );
    var url = this.URL + "/CheckAndAcceptAPI/AcceptanceOfTheQueryElevatroAdd";
    this.httpservice
      .post(
        url,
        JSON.stringify({
          data: "{ 'KeyValue':'" + this.ecl + "', strEntity: '" + ss + "'}"
        })
      )
      .then(res => {
        try {
          console.log(res);
          super.generalToast(this.toastCtrl, res.info);
        } catch (e) {
           super.errorToast(this.toastCtrl,"/AcceptanceOfTheQueryElevatroAdd接口异常:" + e);
        }
      });
  }

  segmentChanged() {
    if (this.segmentModel == "safetyAnaly") {
      console.log("1");
      $("#safetyAnaly").css("display", "block");
      $("#maintenance").css("display", "none");
    } else if (this.segmentModel == "maintenance") {
      console.log("2");
      $("#safetyAnaly").css("display", "none");
      $("#maintenance").css("display", "block");
    }
  }
  upload() {
    if (this.ecl.length != 7) {
     super.warningToast(this.toastCtrl, "电梯编号错误！");
      return;
    }
    let alert = this.alertCtrl.create({
      title: "确定上传",
      cssClass: "headChoice",
      message: "请确认已保存修改，再上传！",
      buttons: [{
        text: "取消",
        handler: () => {
          console.log("cancel");
        }
      },
      {
        text: "上传",
        handler: () => {
          this.remoteWrite();
        }
      }
      ]
    });
    alert.present();
  }
  remoteWrite() {
    var loader = this.loadingCtrl.create({
      content: "数据通讯中，请稍候！",
      duration: 10000
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

    function sendWait() {
      setTimeout(function () {
        if (!remote.success) {
          if (remote.time > 0) {
            remote.time--;
            sendWait();
          } else {
            loader.dismiss();
            remote.ws.close();
            const m = document.createElement("div");
            m.innerHTML = "网关通讯超时！";
            m.style.cssText =
              "max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
            document.body.appendChild(m);
            setTimeout(function () {
              var d = 0.5;
              m.style.webkitTransition =
                "-webkit-transform " +
                d +
                "s ease-in, opacity " +
                d +
                "s ease-in";
              m.style.opacity = "0";
              setTimeout(function () {
                document.body.removeChild(m);
              }, d * 1000);
            }, 2000);
          }
        }
      }, 1000);
    }

    function processArrayBuffer(data) {
      loader.dismiss();
      var result = new Uint8Array(data);
      console.log(result);
      if (result.length == 1) {
        if (result[0] == 1) {
          remote.success = true;
          const m = document.createElement("div");
          m.innerHTML = "网关正忙，请稍后";
          m.style.cssText = "max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
          document.body.appendChild(m);
          setTimeout(function () {
            var d = 0.5;
            m.style.webkitTransition =
              "-webkit-transform " +
              d +
              "s ease-in, opacity " +
              d +
              "s ease-in";
            m.style.opacity = "0";
            setTimeout(function () {
              document.body.removeChild(m);
            }, d * 1000);
          }, 2000);
        } else { }
      } else {
        remote.success = true;
        const m = document.createElement("div");
        m.innerHTML = "通讯成功";
        m.style.cssText = "max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
        document.body.appendChild(m);
        setTimeout(function () {
          var d = 0.5;
          m.style.webkitTransition = "-webkit-transform " + d + "s ease-in, opacity " + d + "s ease-in";
          m.style.opacity = "0";
          setTimeout(function () {
            document.body.removeChild(m);
          }, d * 1000);
        }, 2000);
        if (result.length > 200) transforReceive(result);
      }
    }

    function doSend(bytes, client) {
      var buffer = new ArrayBuffer(bytes.length);
      var view = new DataView(buffer);
      view.setUint8(0, bytes.length);
      for (var i = 0; i < bytes.length; i++) {
        view.setUint8(i, bytes[i]);
      }
      client.send(view);
    }

    function textParse(bytes, start, length) {
      var text = "";
      for (var i = 0; i < length; i++) {
        if (bytes[start + i] != 0) {
          text += String.fromCharCode(bytes[start + i]);
        }
      }
      return text;
    }

    function byteToString(receives, start, length, change) {
      var str = "";
      var high = change ? 1 : 0;
      var low = change ? 0 : 1;
      for (var i = 0; i < length / 2; i++) {
        if (
          receives[start + i * 2 + high] != 0 ||
          receives[start + i * 2 + low] != 0
        )
          str += unescape(
            "%u" +
            tenToSisteen(receives[start + i * 2 + high].toString(16)) +
            tenToSisteen(receives[start + i * 2 + low].toString(16))
          );
      }
      return str;
    }

    function tenToSisteen(ten) {
      var sixteen = ten.toString(16);
      return ("00" + sixteen).substr(sixteen.length, 2);
    }

    function HexToSingle(t) {
      // t = t.replace(/\s+/g, "");
      if (t == "") {
        return "";
      }
      parseInt(t);
      if (t == "00000000" || parseInt(t) == 0) {
        return 0;
      }
      if (t.length > 8 || isNaN(parseInt(t, 16))) {
        return "Error";
      }
      if (t.length < 8) {
        t = FillString(t, "0", 8, true);
      }
      t = parseInt(t, 16).toString(2);
      t = FillString(t, "0", 32, true);
      var s = t.substring(0, 1);
      var e = t.substring(1, 9);
      var m = t.substring(9);
      e = parseInt(e, 2) - 127;
      m = "1" + m;
      if (e >= 0) {
        m = m.substr(0, e + 1) + "." + m.substring(e + 1);
      } else {
        m = "0." + FillString(m, "0", m.length - e - 1, true);
      }
      if (m.indexOf(".") == -1) {
        m = m + ".0";
      }
      var a = m.split(".");
      var mi = parseInt(a[0], 2) + "";
      var mf = 0 + "";
      for (var i = 0; i < a[1].length; i++) {
        mf += parseFloat(a[1].charAt(i)) * Math.pow(2, -(i + 1));
      }
      m = parseInt(mi) + parseFloat(mf);
      if (s == 1) {
        m = 0 - m;
      }

      return m;
    }

    function FillString(t, c, n, b) {
      if (t == "" || c.length != 1 || n <= t.length) {
        return t;
      }
      var l = t.length;
      for (var i = 0; i < n - l; i++) {
        if (b == true) {
          t = c + t;
        } else {
          t += c;
        }
      }
      return t;
    }

    function transforReceive(receives) {
      var EMS_ElevatorData = {
        Enumber: "",
        Ename: "",
        Ecollection: "",
        Erecorder: "",
        Emechanism: "",
        Eengine: "",
        Emodel: "",
        Edate: "",
        Efactory: "",
        Eplatform: "",
        Efloor: "",
        Esite: "",
        Espeed: "",
        Eload: "",
        Eaddress: "",
        Etel: "",
        Euser: "",
        Ephone24: "",
        Emaintenance: "",
        Euser2: "",
        Etel2: "",
        Echeckout: "",
        Eweb: "",
        Ephone1: "",
        Ephone2: "",
        Ephone3: "",
        Ephone4: "",
        Elevel1: "",
        Elevel2: "",
        Elevel3: "",
        Elevel4: "",
        Elevel5: "",
        Elevel6: "",
        Elevel7: "",
        Elevel8: "",
        Elevel9: "",
        Elevel10: "",
        Elevel11: "",
        Elevel12: "",
        Elevel13: "",
        Elevel14: "",
        Elevel15: "",
        Elevel16: "",
        EsignalCount: "",
        EsignalLow: "",
        EsignalReset: "",
        EfloorHeight: "",
        F_DeviceType: "0",
        F_0: "0",
        F_1: "0",
        F_2: "0",
        F_3: "0",
        F_4: "0",
        F_5: "0",
        F_6: "0",
        F_7: "0",
        F_8: "0",
        F_9: "0",
        F_10: "0",
        F_11: "0",
        F_12: "0",
        F_13: "0",
        F_14: "0",
        F_15: "0"
      };
      if (!receives) { } else {
        console.log(receives);
        var accumulation = 0;
        if (receives.length == 987) {
          accumulation = 44;
        }

        EMS_ElevatorData.Enumber = textParse(receives, 30, 20 + accumulation);

        EMS_ElevatorData.Ecollection = textParse(
          receives,
          67 + accumulation,
          7
        );

        EMS_ElevatorData.Erecorder = textParse(receives, 50 + accumulation, 10);

        EMS_ElevatorData.Emechanism = textParse(receives, 60 + accumulation, 7);

        EMS_ElevatorData.Eengine = textParse(receives, 74 + accumulation, 15);

        EMS_ElevatorData.Ename = byteToString(
          receives,
          89 + accumulation,
          60,
          false
        );

        EMS_ElevatorData.Emodel = textParse(receives, 149 + accumulation, 20);

        EMS_ElevatorData.Edate =
          String.fromCharCode(receives[169 + accumulation]) +
          String.fromCharCode(receives[170 + accumulation]) +
          String.fromCharCode(receives[171 + accumulation]) +
          String.fromCharCode(receives[172 + accumulation]) +
          "-" +
          String.fromCharCode(receives[173 + accumulation]) +
          String.fromCharCode(receives[174 + accumulation]) +
          "-" +
          String.fromCharCode(receives[175 + accumulation]) +
          String.fromCharCode(receives[176 + accumulation]);

        EMS_ElevatorData.Efactory = byteToString(
          receives,
          177 + accumulation,
          60,
          true
        );

        EMS_ElevatorData.Eplatform = textParse(
          receives,
          237 + accumulation,
          10
        );

        EMS_ElevatorData.Efloor =
          parseInt(
            tenToSisteen(receives[257 + accumulation]) +
            tenToSisteen(receives[258 + accumulation]),
            16
          ) + "";

        EMS_ElevatorData.Esite =
          parseInt(
            tenToSisteen(receives[259 + accumulation]) +
            tenToSisteen(receives[260 + accumulation]),
            16
          ) + "";

        EMS_ElevatorData.Espeed = HexToSingle(
          tenToSisteen(receives[264 + accumulation]) +
          tenToSisteen(receives[263 + accumulation]) +
          tenToSisteen(receives[262 + accumulation]) +
          tenToSisteen(receives[261 + accumulation])
        ).toFixed(2);

        EMS_ElevatorData.Eload = textParse(receives, 265 + accumulation, 5);

        EMS_ElevatorData.Eaddress = byteToString(
          receives,
          270 + accumulation,
          60,
          true
        );

        EMS_ElevatorData.Euser = byteToString(
          receives,
          330 + accumulation,
          10,
          true
        );

        EMS_ElevatorData.Etel = textParse(receives, 340 + accumulation, 15);

        EMS_ElevatorData.Ephone24 = textParse(receives, 355 + accumulation, 15);

        EMS_ElevatorData.Emaintenance = byteToString(
          receives,
          370 + accumulation,
          60,
          true
        );

        EMS_ElevatorData.Euser2 = byteToString(
          receives,
          430 + accumulation,
          10,
          true
        );

        EMS_ElevatorData.Etel2 = textParse(receives, 440 + accumulation, 15);

        EMS_ElevatorData.Echeckout = byteToString(
          receives,
          455 + accumulation,
          60,
          true
        );

        EMS_ElevatorData.Eweb = textParse(receives, 515 + accumulation, 30);

        EMS_ElevatorData.Ephone1 = textParse(receives, 557 + accumulation, 15);

        EMS_ElevatorData.Ephone2 = textParse(receives, 572 + accumulation, 15);
        EMS_ElevatorData.Ephone3 = textParse(receives, 587 + accumulation, 15);
        EMS_ElevatorData.Ephone4 = textParse(receives, 602 + accumulation, 15);
        EMS_ElevatorData.EsignalCount = receives[619 + accumulation];
        EMS_ElevatorData.EsignalLow = receives[620 + accumulation];
        EMS_ElevatorData.EsignalReset = receives[621 + accumulation];
        EMS_ElevatorData.EfloorHeight = HexToSingle(
          tenToSisteen(receives[922 + accumulation]) +
          tenToSisteen(receives[921 + accumulation]) +
          tenToSisteen(receives[920 + accumulation]) +
          tenToSisteen(receives[919 + accumulation])
        ).toFixed(2);
        EMS_ElevatorData.F_DeviceType = receives[923 + accumulation];

        for (var i = 0; i < 99 + accumulation; i++) {
          var floorText = "";
          if (receives[622 + accumulation + i] != 0)
            floorText += String.fromCharCode(receives[622 + accumulation + i]);
          if (receives[622 + accumulation + i + 99 + accumulation] != 0)
            floorText += String.fromCharCode(
              receives[622 + accumulation + i + 99 + accumulation]
            );
          if (receives[622 + accumulation + i + 198 + accumulation] != 0)
            floorText += String.fromCharCode(
              receives[622 + accumulation + i + 198 + accumulation]
            );
          EMS_ElevatorData["Esignal" + (i + 1 + accumulation)] = floorText;
        }
        //     console.log(''+receives[receives.length - 1] + receives[receives.length - 2] + receives[receives.length - 3] + receives[receives.length - 4])
        // var data = { EMS_ElevatorData: EMS_ElevatorData };
        // page.draw(data.EMS_ElevatorData.EsignalCount);
        // for (var id in data) {
        //     if (!!data[id].length && data[id].length > 0) {
        //     }
        //     else {
        //         $('[data-table="' + id + '"]').lrSetFormData(data[id]);
        //     }
        // }
        var downList = JSON.stringify(EMS_ElevatorData);
        console.log(downList);
      }
    }

    remote.time = remote.MAX_WAIT_TIME;
    remote.success = false;
    sendWait();
    var url = this.URL + "/CheckAndAcceptAPI/elevatorupload";
    this.httpservice
      .post(
        url,
        JSON.stringify({
          data: "{\"strEntity\": \"{'keyValue': '" + this.ecl + "'}\" } "
        })
      )
      .then(res => {
        try {
          console.log(res);
          var cmd = [];
          res.data.Cmd.split("-").forEach(function (data, index, arr) {
            cmd.push(parseInt(data, 16));
          });
          remote.ws = new WebSocket(remote.remoteUrl);
          remote.ws.binaryType = "arraybuffer";
          if ("WebSocket" in window) {
            remote.ws.onopen = function () {
              console.log(cmd);
              doSend(cmd, remote.ws);
            };
            remote.ws.onmessage = function (evt) {
              console.log(evt);
              if (evt.data instanceof ArrayBuffer) {
                // 处理字节信息
                processArrayBuffer(evt.data);
              } else {
                //  processText(evt.data); // 处理文本信息
              }
              remote.ws.close();
            };
            remote.ws.onclose = function () { };
            remote.ws.onerror = function (data) {
              loader.dismiss();
              const m = document.createElement("div");
              m.innerHTML = "数据发送失败！";
              m.style.cssText =
                "max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
              document.body.appendChild(m);
              setTimeout(function () {
                var d = 0.5;
                m.style.webkitTransition =
                  "-webkit-transform " +
                  d +
                  "s ease-in, opacity " +
                  d +
                  "s ease-in";
                m.style.opacity = "0";
                setTimeout(function () {
                  document.body.removeChild(m);
                }, d * 1000);
              }, 2000);
            };
          } else {
            loader.dismiss();
            super.warningToast(this.toastCtrl,"您的浏览器不支持 WebSocket！无法使用远程上传与下载功能！");
          }
        } catch (e) {
          loader.dismiss();
         super.errorToast(this.toastCtrl,"/elevatorupload接口异常:" + e);
        }
      });
  }

  down() {
    if (this.ecl.length != 7) {
       super.warningToast(this.toastCtrl, "电梯编号错误！");
      return;
    }
    var method = "/CheckAndAcceptAPI/elevatordownload";
    this.remoteRead(method);
  }
  remoteRead(method) {
    var loader = this.loadingCtrl.create({
      content: "数据通讯中，请稍候！",
      duration: 10000
    });
    loader.present();
    var downList;
    var remote = {
      time: 10,
      success: true,
      remoteUrl: "ws://122.228.89.215:16161/echo",
      localUrl: "ws://192.168.1.134:16161/echo",
      ws: null,
      MAX_WAIT_TIME: 10
    };
    var sock;
    transforReceive(false);
    remote.time = remote.MAX_WAIT_TIME;
    remote.success = false;
    sendWait();

    function sendWait() {
      if (method == "/CheckAndAcceptAPI/elevatorrestart") {
        setTimeout(function () {
          loader.dismiss();
          sock.close();
          const m = document.createElement("div");
          m.innerHTML = "网关通讯成功！";
          m.style.cssText =
            "max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
          document.body.appendChild(m);
          setTimeout(function () {
            var d = 0.5;
            m.style.webkitTransition =
              "-webkit-transform " +
              d +
              "s ease-in, opacity " +
              d +
              "s ease-in";
            m.style.opacity = "0";
            setTimeout(function () {
              document.body.removeChild(m);
            }, d * 1000);
          }, 2000);

          return;
        }, 1000);
      }
      setTimeout(function () {
        if (!remote.success) {
          if (remote.time > 0) {
            remote.time--;
            sendWait();
          } else {
            loader.dismiss();
            sock.close();
            const m = document.createElement("div");
            m.innerHTML = "网关通讯超时！";
            m.style.cssText =
              "max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
            document.body.appendChild(m);
            setTimeout(function () {
              var d = 0.5;
              m.style.webkitTransition =
                "-webkit-transform " +
                d +
                "s ease-in, opacity " +
                d +
                "s ease-in";
              m.style.opacity = "0";
              setTimeout(function () {
                document.body.removeChild(m);
              }, d * 1000);
            }, 2000);
          }
        }
      }, 1000);
    }

    function textParse(bytes, start, length) {
      var text = "";
      for (var i = 0; i < length; i++) {
        if (bytes[start + i] != 0) {
          text += String.fromCharCode(bytes[start + i]);
        }
      }
      return text;
    }

    function byteToString(receives, start, length, change) {
      var str = "";
      var high = change ? 1 : 0;
      var low = change ? 0 : 1;
      for (var i = 0; i < length / 2; i++) {
        if (
          receives[start + i * 2 + high] != 0 ||
          receives[start + i * 2 + low] != 0
        )
          str += unescape(
            "%u" +
            tenToSisteen(receives[start + i * 2 + high].toString(16)) +
            tenToSisteen(receives[start + i * 2 + low].toString(16))
          );
      }
      return str;
    }

    function tenToSisteen(ten) {
      var sixteen = ten.toString(16);
      return ("00" + sixteen).substr(sixteen.length, 2);
    }

    function HexToSingle(t) {
      // t = t.replace(/\s+/g, "");
      if (t == "") {
        return "";
      }
      parseInt(t);
      if (t == "00000000" || parseInt(t) == 0) {
        return 0;
      }
      if (t.length > 8 || isNaN(parseInt(t, 16))) {
        return "Error";
      }
      if (t.length < 8) {
        t = FillString(t, "0", 8, true);
      }
      t = parseInt(t, 16).toString(2);
      t = FillString(t, "0", 32, true);
      var s = t.substring(0, 1);
      var e = t.substring(1, 9);
      var m = t.substring(9);
      e = parseInt(e, 2) - 127;
      m = "1" + m;
      if (e >= 0) {
        m = m.substr(0, e + 1) + "." + m.substring(e + 1);
      } else {
        m = "0." + FillString(m, "0", m.length - e - 1, true);
      }
      if (m.indexOf(".") == -1) {
        m = m + ".0";
      }
      var a = m.split(".");
      var mi = parseInt(a[0], 2) + "";
      var mf = 0 + "";
      for (var i = 0; i < a[1].length; i++) {
        mf += parseFloat(a[1].charAt(i)) * Math.pow(2, -(i + 1));
      }
      m = parseInt(mi) + parseFloat(mf);
      if (s == 1) {
        m = 0 - m;
      }

      return m;
    }

    function FillString(t, c, n, b) {
      if (t == "" || c.length != 1 || n <= t.length) {
        return t;
      }
      var l = t.length;
      for (var i = 0; i < n - l; i++) {
        if (b == true) {
          t = c + t;
        } else {
          t += c;
        }
      }
      return t;
    }

    function transforReceive(receives) {
      var EMS_ElevatorData = {
        Enumber: "",
        Ename: "",
        Ecollection: "",
        Erecorder: "",
        Emechanism: "",
        Eengine: "",
        Emodel: "",
        Edate: "",
        Efactory: "",
        Eplatform: "",
        Efloor: "",
        Esite: "",
        Espeed: "",
        Eload: "",
        Eaddress: "",
        Etel: "",
        Euser: "",
        Ephone24: "",
        Emaintenance: "",
        Euser2: "",
        Etel2: "",
        Echeckout: "",
        Eweb: "",
        Ephone1: "",
        Ephone2: "",
        Ephone3: "",
        Ephone4: "",
        Elevel1: "",
        Elevel2: "",
        Elevel3: "",
        Elevel4: "",
        Elevel5: "",
        Elevel6: "",
        Elevel7: "",
        Elevel8: "",
        Elevel9: "",
        Elevel10: "",
        Elevel11: "",
        Elevel12: "",
        Elevel13: "",
        Elevel14: "",
        Elevel15: "",
        Elevel16: "",
        EsignalCount: "",
        EsignalLow: "",
        EsignalReset: "",
        EfloorHeight: "",
        F_DeviceType: "0",
        F_0: "0",
        F_1: "0",
        F_2: "0",
        F_3: "0",
        F_4: "0",
        F_5: "0",
        F_6: "0",
        F_7: "0",
        F_8: "0",
        F_9: "0",
        F_10: "0",
        F_11: "0",
        F_12: "0",
        F_13: "0",
        F_14: "0",
        F_15: "0"
      };
      if (!receives) { } else {
        console.log(receives);
        var accumulation = 0;
        if (receives.length == 987) {
          accumulation = 44;
        }

        EMS_ElevatorData.Enumber = textParse(receives, 30, 20 + accumulation);

        EMS_ElevatorData.Ecollection = textParse(
          receives,
          67 + accumulation,
          7
        );

        EMS_ElevatorData.Erecorder = textParse(receives, 50 + accumulation, 10);

        EMS_ElevatorData.Emechanism = textParse(receives, 60 + accumulation, 7);

        EMS_ElevatorData.Eengine = textParse(receives, 74 + accumulation, 15);

        EMS_ElevatorData.Ename = byteToString(
          receives,
          89 + accumulation,
          60,
          false
        );

        EMS_ElevatorData.Emodel = textParse(receives, 149 + accumulation, 20);

        EMS_ElevatorData.Edate =
          String.fromCharCode(receives[169 + accumulation]) +
          String.fromCharCode(receives[170 + accumulation]) +
          String.fromCharCode(receives[171 + accumulation]) +
          String.fromCharCode(receives[172 + accumulation]) +
          "-" +
          String.fromCharCode(receives[173 + accumulation]) +
          String.fromCharCode(receives[174 + accumulation]) +
          "-" +
          String.fromCharCode(receives[175 + accumulation]) +
          String.fromCharCode(receives[176 + accumulation]);

        EMS_ElevatorData.Efactory = byteToString(
          receives,
          177 + accumulation,
          60,
          true
        );

        EMS_ElevatorData.Eplatform = textParse(
          receives,
          237 + accumulation,
          10
        );

        EMS_ElevatorData.Efloor =
          parseInt(
            tenToSisteen(receives[257 + accumulation]) +
            tenToSisteen(receives[258 + accumulation]),
            16
          ) + "";

        EMS_ElevatorData.Esite =
          parseInt(
            tenToSisteen(receives[259 + accumulation]) +
            tenToSisteen(receives[260 + accumulation]),
            16
          ) + "";

        EMS_ElevatorData.Espeed = HexToSingle(
          tenToSisteen(receives[264 + accumulation]) +
          tenToSisteen(receives[263 + accumulation]) +
          tenToSisteen(receives[262 + accumulation]) +
          tenToSisteen(receives[261 + accumulation])
        ).toFixed(2);

        EMS_ElevatorData.Eload = textParse(receives, 265 + accumulation, 5);

        EMS_ElevatorData.Eaddress = byteToString(
          receives,
          270 + accumulation,
          60,
          true
        );

        EMS_ElevatorData.Euser = byteToString(
          receives,
          330 + accumulation,
          10,
          true
        );

        EMS_ElevatorData.Etel = textParse(receives, 340 + accumulation, 15);

        EMS_ElevatorData.Ephone24 = textParse(receives, 355 + accumulation, 15);

        EMS_ElevatorData.Emaintenance = byteToString(
          receives,
          370 + accumulation,
          60,
          true
        );

        EMS_ElevatorData.Euser2 = byteToString(
          receives,
          430 + accumulation,
          10,
          true
        );

        EMS_ElevatorData.Etel2 = textParse(receives, 440 + accumulation, 15);

        EMS_ElevatorData.Echeckout = byteToString(
          receives,
          455 + accumulation,
          60,
          true
        );

        EMS_ElevatorData.Eweb = textParse(receives, 515 + accumulation, 30);

        EMS_ElevatorData.Ephone1 = textParse(receives, 557 + accumulation, 15);
        EMS_ElevatorData.Elevel1 = String(
          ((receives[617 + accumulation] >> 0) & 1) == 1 ? true : false
        );
        EMS_ElevatorData.Elevel2 = String(
          ((receives[617 + accumulation] >> 1) & 1) == 1 ? true : false
        );
        EMS_ElevatorData.Elevel3 = String(
          ((receives[617 + accumulation] >> 2) & 1) == 1 ? true : false
        );
        EMS_ElevatorData.Elevel4 = String(
          ((receives[617 + accumulation] >> 3) & 1) == 1 ? true : false
        );
        EMS_ElevatorData.Elevel5 = String(
          ((receives[617 + accumulation] >> 4) & 1) == 1 ? true : false
        );
        EMS_ElevatorData.Elevel6 = String(
          ((receives[617 + accumulation] >> 5) & 1) == 1 ? true : false
        );
        EMS_ElevatorData.Elevel7 = String(
          ((receives[617 + accumulation] >> 6) & 1) == 1 ? true : false
        );
        EMS_ElevatorData.Elevel8 = String(
          ((receives[617 + accumulation] >> 7) & 1) == 1 ? true : false
        );
        EMS_ElevatorData.Elevel9 = String(
          ((receives[618 + accumulation] >> 0) & 1) == 1 ? true : false
        );
        EMS_ElevatorData.Elevel10 = String(
          ((receives[618 + accumulation] >> 1) & 1) == 1 ? true : false
        );
        EMS_ElevatorData.Elevel11 = String(
          ((receives[618 + accumulation] >> 2) & 1) == 1 ? true : false
        );
        EMS_ElevatorData.Elevel12 = String(
          ((receives[618 + accumulation] >> 3) & 1) == 1 ? true : false
        );
        EMS_ElevatorData.Elevel13 = String(
          ((receives[618 + accumulation] >> 4) & 1) == 1 ? true : false
        );
        EMS_ElevatorData.Elevel14 = String(
          ((receives[618 + accumulation] >> 5) & 1) == 1 ? true : false
        );
        EMS_ElevatorData.Elevel15 = String(
          ((receives[618 + accumulation] >> 6) & 1) == 1 ? true : false
        );
        EMS_ElevatorData.Elevel16 = String(
          ((receives[618 + accumulation] >> 7) & 1) == 1 ? true : false
        );
        EMS_ElevatorData.Ephone2 = textParse(receives, 572 + accumulation, 15);
        EMS_ElevatorData.Ephone3 = textParse(receives, 587 + accumulation, 15);
        EMS_ElevatorData.Ephone4 = textParse(receives, 602 + accumulation, 15);
        EMS_ElevatorData.EsignalCount = receives[619 + accumulation];
        EMS_ElevatorData.EsignalLow = receives[620 + accumulation];
        EMS_ElevatorData.EsignalReset = receives[621 + accumulation];
        EMS_ElevatorData.EfloorHeight = HexToSingle(
          tenToSisteen(receives[922 + accumulation]) +
          tenToSisteen(receives[921 + accumulation]) +
          tenToSisteen(receives[920 + accumulation]) +
          tenToSisteen(receives[919 + accumulation])
        ).toFixed(2);
        EMS_ElevatorData.F_DeviceType = receives[923 + accumulation];

        for (var i = 0; i < 99 + accumulation; i++) {
          var floorText = "";
          if (receives[622 + accumulation + i] != 0)
            floorText += String.fromCharCode(receives[622 + accumulation + i]);
          if (receives[622 + accumulation + i + 99] != 0)
            floorText += String.fromCharCode(
              receives[622 + accumulation + i + 99]
            );
          if (receives[622 + accumulation + i + 198] != 0)
            floorText += String.fromCharCode(
              receives[622 + accumulation + i + 198]
            );
          EMS_ElevatorData["Esignal" + (i + 1)] = floorText;
        }
        downList = EMS_ElevatorData;
      }
    }

    function processArrayBuffer(data) {
      loader.dismiss();
      var result = new Uint8Array(data);
      console.log(result);
      if (result.length == 1) {
        if (result[0] == 1) {
          remote.success = true;
          const m = document.createElement("div");
          m.innerHTML = "网关正忙，请稍后";
          m.style.cssText =
            "max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
          document.body.appendChild(m);
          setTimeout(function () {
            var d = 0.5;
            m.style.webkitTransition =
              "-webkit-transform " +
              d +
              "s ease-in, opacity " +
              d +
              "s ease-in";
            m.style.opacity = "0";
            setTimeout(function () {
              document.body.removeChild(m);
            }, d * 1000);
          }, 2000);
        } else { }
      } else {
        remote.success = true;
        const m = document.createElement("div");
        m.innerHTML = "通讯成功";
        m.style.cssText =
          "max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
        document.body.appendChild(m);
        setTimeout(function () {
          var d = 0.5;
          m.style.webkitTransition =
            "-webkit-transform " + d + "s ease-in, opacity " + d + "s ease-in";
          m.style.opacity = "0";
          setTimeout(function () {
            document.body.removeChild(m);
          }, d * 1000);
        }, 2000);
        if (result.length > 200) transforReceive(result);
      }
    }

    function doSend(bytes, client) {
      var buffer = new ArrayBuffer(bytes.length);
      var view = new DataView(buffer);
      view.setUint8(0, bytes.length);
      for (var i = 0; i < bytes.length; i++) {
        view.setUint8(i, bytes[i]);
      }
      client.send(view);
    }

    var url = this.URL + method;
    this.httpservice
      .post(
        url,
        JSON.stringify({
          data: "{ \"pagination\": { rows: 50, page: 1, sidx: '', sord: 'ASC' }, \"queryJson\": \"{'keyValue':'" +
            this.ecl +
            "'}\" }"
        })
      )
      .then(res => {
        try {
          console.log(res);
          var cmd = [];
          res.data.Cmd.split("-").forEach(function (data, index, arr) {
            cmd.push(parseInt(data, 16));
          });
          sock = new WebSocket("ws://122.228.89.215:16161/echo");
          sock.binaryType = "arraybuffer";
          if ("WebSocket" in window) {
            sock.onopen = () => {
              console.log("1", cmd);
              doSend(cmd, sock);
            };
            sock.onmessage = evt => {
              console.log("2", evt);
              console.log(evt.data instanceof ArrayBuffer);
              if (evt.data instanceof ArrayBuffer) {
                // 处理字节信息
                console.log("3");
                processArrayBuffer(evt.data);
                console.log(downList);
                $("#Enumber").val(downList["Enumber"]);
                $("#EfloorHeight").val(downList["EfloorHeight"]);
                $("#Erecorder").val(downList["Erecorder"]);
                $("#Ename").val(downList["Ename"]);
                $("#Emodel").val(downList["Efactory"]);
                $("#Efloor").val(downList["Efloor"]);
                $("#Espeed").val(downList["Espeed"]);
                $("#Eaddress").val(downList["Eaddress"]);
                $("#Euser").val(downList["Euser"]);
                $("#Emaintenance").val(downList["Emaintenance"]);
                $("#Euser2").val(downList["Euser2"]);
                $("#Etel2").val(downList["Etel2"]);
                $("#EsignalCount").val(downList["EsignalCount"]);
                var newarr = new Array();

                for (var i = 1; i <= downList["EsignalCount"]; i++) {
                  if (downList["Esignal" + i] != "") {
                    var arrs = {
                      lc: downList["Esignal" + i]
                    };
                    newarr.push(arrs);
                  }
                }
                this.arr = newarr;
                console.log(this.arr);
                if (downList["Elevel2"] == "true") {
                  this.mainten = "highLevel";
                } else if (downList["Elevel2"] == "false") {
                  this.mainten = "lowLevel";
                } else {
                  this.mainten = "choose";
                }
                if (downList["Elevel3"] == "true") {
                  this.door1 = "highLevel";
                } else if (downList["Elevel3"] == "false") {
                  this.door1 = "lowLevel";
                } else {
                  this.door1 = "choose";
                }
                if (downList["Elevel4"] == "true") {
                  this.door2 = "highLevel";
                } else if (downList["Elevel4"] == "false") {
                  this.door2 = "lowLevel";
                } else {
                  this.door2 = "choose";
                }
                if (downList["Elevel7"] == "true") {
                  this.flatLayer1 = "highLevel";
                } else if (downList["Elevel7"] == "false") {
                  this.flatLayer1 = "lowLevel";
                } else {
                  this.flatLayer1 = "choose";
                }

                if (downList["Elevel8"] == "true") {
                  this.flatLayer2 = "highLevel";
                } else if (downList["Elevel8"] == "false") {
                  this.flatLayer2 = "lowLevel";
                } else {
                  this.flatLayer2 = "choose";
                }
              } else {
                //  processText(evt.data); // 处理文本信息
              }
              sock.close();
            };
            sock.onclose = function () {
              console.log("websocket closed");
            };
            sock.onerror = function (data) {
              loader.dismiss();
              const m = document.createElement("div");
              m.innerHTML = "数据发送失败！";
              m.style.cssText =
                "max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 90%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
              document.body.appendChild(m);
              setTimeout(function () {
                var d = 0.5;
                m.style.webkitTransition =
                  "-webkit-transform " +
                  d +
                  "s ease-in, opacity " +
                  d +
                  "s ease-in";
                m.style.opacity = "0";
                setTimeout(function () {
                  document.body.removeChild(m);
                }, d * 1000);
              }, 2000);
            };
          } else {
            loader.dismiss();
            super.warningToast(this.toastCtrl,"您的浏览器不支持 WebSocket！无法使用远程上传与下载功能！");
          }
        } catch (e) {
          loader.dismiss();
          super.errorToast(this.toastCtrl,method + "接口异常:" + e);
        }
      });
  }
  restart() {
    if (this.ecl.length != 7) {
    super.warningToast(this.toastCtrl, "操作失败！");
      return;
    }
    var method = "/CheckAndAcceptAPI/elevatorrestart";
    this.remoteRead(method);
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpSerProvider } from '../../app/http-serve';
import { BaseUI } from '../../app/baseui';

/**
 * Generated class for the FaultRecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fault-record',
  templateUrl: 'fault-record.html',
})
export class FaultRecordPage extends BaseUI{
  ecl: any;
  month: string | number;
  start: string;
  end: string;
  list: any;
  putInto: string;
  myInterval: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpservice: HttpSerProvider, public toastCtrl: ToastController, ) {
    super();
    this.ecl = this.navParams.data.ecllotion;
    this.putInto="6";
    const formatDate = ( time: any ) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date( time );
      const year: number = Dates.getFullYear();
     this.month = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      return year + '-' + this.month + '-' + day;
      
    };
 this.start= formatDate( new Date().getTime() ); // 当前时间
 this.end=formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * (-6) ) )
 this.myInterval = setInterval(() => {
 this.search()
}, 5000);
    this.search()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaultRecordPage');
  }
 search(){
   var Etype;
   if(this.putInto=="choose"){
    Etype=""
   }
   else{
    Etype=this.putInto;
   }
  var url = "http://122.228.89.215:8887/CheckAndAcceptAPI/failurelogging";
  this.httpservice.post(url, JSON.stringify({
    "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'Ecollection':'" + this.ecl + "','Etype':'" +Etype+ "','StartDate':'" + this.end + "','EndDate':'" + this.start + "'}\"} "
  })).then(res => {
    try {
      var arr=[];
      var myChar=document.getElementById('delay');
      if(res.data.rows==0){
        myChar.style.display="block";
      }else{
        myChar.style.display="none";
        for(var i=0;i<res.data.rows.length;i++){
          var value = '';
          var number = Number(res.data.rows[i].Etype);
          if (number % 2 == 1) value += '困人';
          if (Math.floor(number % 4 / 2) == 1) value += ' 非平层区域停梯';
          if (Math.floor(number % 8 / 4) == 1) value += ' 冲顶';
          if (Math.floor(number % 16 / 8) == 1) value += ' 蹲底';
          if (Math.floor(number % 32 / 16) == 1) value += ' 运行中开门';
          if (Math.floor(number % 64 / 32) == 1) value += ' 超速';
          if (Math.floor(number % 128 / 64) == 1) value += ' 警铃';
          if (Math.floor(number % 256 / 128) == 1) value += ' 停电';
          if (Math.floor(number % 512 / 256) == 1) value += ' 抖动';
          if (Math.floor(number % 1024 / 512) == 1) value += ' 反复开关门';
          if (Math.floor(number % 2048 / 1024) == 1) value += '开门故障';
          if (Math.floor(number % 4096 / 2048) == 1) value += '轿厢意外移动';
          if (Math.floor(number % 8192 / 4096) == 1) value += '';
          if (Math.floor(number % 16384 / 8192) == 1) value += '';
          if (Math.floor(number % 32768 / 16384) == 1) value += ' 人为反复开关门';
          if (Math.floor(number % 65536 / 32768) == 1) value += ' 人为挡门';
          if (value == '') value = '正常';
          if (number == 1) value = '疑似困人';
          arr.push({Etype:value,Edate:res.data.rows[i].Edate,Ekeepdate:res.data.rows[i].Ekeepdate}) 
        }
      }
      this.list=arr;
      
    } catch (e) {
      
      super.errorToast(this.toastCtrl,'/CheckAndAcceptAPI/failurelogging'+e)
    }
  });
 }
 ionViewWillLeave() {

  // 界面将要离开的时候
  clearInterval(this.myInterval);
            
}
}

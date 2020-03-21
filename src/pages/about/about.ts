import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { HttpSerProvider } from '../../app/http-serve';
import { BaseUI } from '../../app/baseui';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage extends BaseUI{
  inputContent: any;
  jcurl: any;
  ecl: any;
  faultList: any;
  putInto: string;
  month: string | number;
  start: string;
  end: string;
  myInterval: number;

  constructor(public navCtrl: NavController, private httpservice: HttpSerProvider, public toastCtrl: ToastController,public iab:InAppBrowser, public navParams: NavParams,) {
    super()
    this.ecl = this.navParams.data.ecllotion;
    this.putInto="76"
    const formatDate = ( time: any ) => {
      // 格式化日期，获取今天的日期
      const Dates = new Date( time );
      const year: number = Dates.getFullYear();
     this.month = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
      const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
      return year + '-' + this.month + '-' + day;
      
    };
 this.start= formatDate( new Date().getTime() + ( 1000 * 3600 * 24 *1 )); // 当前时间
 this.end=formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * (-6) ) )
 this.myInterval = setInterval(() => {
 this.fault()
}, 30000);
    this.fault()
   }
   fault(){
    var Etype;
    if(this.putInto=="choose"){
     Etype=""
    }
    else{
     Etype=this.putInto;
    }
      var url="http://122.228.89.215:8887/CheckAndAcceptAPI/push96333";
    this.httpservice.post(url, JSON.stringify({
   "data": "{'pagination':{rows:50,page: 1,sidx:'',sord:'ASC'},'queryJson':\"{'StartTime':'" + this.end + "','EndTime':'" +  this.start + "','F_Interface':'FaultEvent','F_FaultInfo':'" + Etype + "','Ecollection':'" + this.ecl + "'}\"} "
      })).then(res=>{
        console.log(res)
        var mychar1 = document.getElementById('default');
        if (res.data.rows.length == 0) {
          mychar1.style.display = "block";
        }
        else{
          mychar1.style.display = "none";
        }
        this.faultList=res.data.rows;
       super.successToast(this.toastCtrl,"查询成功", );
    });
    
   }
   ionViewWillLeave() {

    // 界面将要离开的时候
    clearInterval(this.myInterval);
  
  }
}

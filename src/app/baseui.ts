import { Loading, LoadingController, ToastController, Toast } from 'ionic-angular';

/**
 * UI 层的所有公用方法的抽象类
 * 
 * @export
 * @abstract
 * @class BaseUI
 */
export abstract class BaseUI {
    
//自己定义的三种消息框样式
  errorCss='errorToast'
  generalCss='generalToast'
  successCss='successToast'
  warningCss='warningToast'
    constructor() { }

    /**
     * 通用的展示 loading 的组件
     * 
     * @protected
     * @param {LoadingController} loadingCtrl 
     * @param {string} message 
     * @returns {Loading} 
     * @memberof BaseUI
     */
    protected showLoading(loadingCtrl: LoadingController,
        message: string): Loading {
        let loader = loadingCtrl.create({
            content: message,
            dismissOnPageChange: true //页面变化的时候自动关闭 loading
        });
        loader.present();
        return loader;
    }
/**
   * 错误信息提示框
   * @param message 消息
   */
  errorToast(toastCtrl: ToastController,message:any){
    this.presentToast(toastCtrl,message,this.errorCss);
  }
 
  /**
   * 普通信息提示框
   * @param message 消息
   */
  generalToast(toastCtrl: ToastController,message:any){
    this.presentToast(toastCtrl,message,this.generalCss);
  }
   /**
   * 警告信息提示框
   * @param message 消息
   */
  warningToast(toastCtrl: ToastController,message:any){
    this.presentToast(toastCtrl,message,this.warningCss);
  }
  /**
   * 成功信息提示框
   * @param message
   */
  successToast(toastCtrl: ToastController,message:any){
    this.presentToast(toastCtrl,message,this.successCss);
  }

 /**
   *
   * @param message需要展示的信息
   * @param css 自定义的背景颜色
   */
  presentToast(toastCtrl: ToastController,message:any,css:string) {
    let toast = toastCtrl.create({
      message: message,//提示消息内容
      duration: 2000,//显示时长，单位毫秒
      position: 'bottom',//消息框出现的位置，bottom就是底端的意思，自然就有top和中间了
      showCloseButton:true,//是否有关闭按钮，true就是有
      cssClass:css,//自己给消息框定义的样式，css样式名称
      closeButtonText:'关闭'//关闭按钮上的文字
    });
 
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
 
    toast.present();//出发消息提示框
  }

    /**
     * 通用的展示 toast 的组件
     * 
     * @protected
     * @param {ToastController} toastCtrl 
     * @param {string} message 
     * @returns {Toast} 
     * @memberof BaseUI
     */
    protected showToast(toastCtrl: ToastController, message: string): Toast {
        let toast = toastCtrl.create({
            message: message,
            duration: 3000, //默认展示的时长
            position: 'bottom'
        });
        toast.present();
        return toast;
    }
}
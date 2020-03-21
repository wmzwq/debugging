import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, ModalController, ActionSheetController } from 'ionic-angular';
import * as $ from 'jquery';
import { HttpSerProvider } from '../../app/http-serve';
import { BaseUI } from '../../app/baseui';
import { url1, url2, flag } from '../../app/config';
import { GalleryModal } from 'ionic-gallery-modal';
import { DomSanitizer } from '@angular/platform-browser';
import { FileObj } from '../../model/FileObj';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Observable } from 'rxjs/Rx';
import {
  IMAGE_SIZE,
  QUALITY_SIZE
} from '../../app/Constants';
import { Logger } from '../../app/Logger';
import { PreviewPicturePage } from '../preview-picture/preview-picture';
import { Base64 } from 'js-base64';
/**
 * Generated class for the AcceptancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-acceptance',
  templateUrl: 'acceptance.html',
})
export class AcceptancePage extends BaseUI {

  mainPage: string = "capsules";
  segmentsArray = ['capsules', 'carRoof'];
  segmentModel: string = this.segmentsArray[0];
  path: string;
  ecl: any;
  fileId: any;
  upload: any;
  URL: any;
  phone: string;
  @Input() max = 4; // 最多可选择多少张图片，默认为4张

  @Input() allowAdd = true; // 是否允许新增

  @Input() allowDelete = true; // 是否允许删除

  @Input() fileObjList1: FileObj[] = []; // 图片列表,与fileObjListChange形成双向数据绑定
  @Output() fileObjList1Change = new EventEmitter<any>();
  @Input() fileObjList2: FileObj[] = []; // 图片列表,与fileObjListChange形成双向数据绑定
  @Output() fileObjList2Change = new EventEmitter<any>();
  @Input() fileObjList3: FileObj[] = []; // 图片列表,与fileObjListChange形成双向数据绑定
  @Output() fileObjList3Change = new EventEmitter<any>();
  @Input() fileObjList4: FileObj[] = []; // 图片列表,与fileObjListChange形成双向数据绑定
  @Output() fileObjList4Change = new EventEmitter<any>();
  @Input() fileObjList5: FileObj[] = []; // 图片列表,与fileObjListChange形成双向数据绑定
  @Output() fileObjList5Change = new EventEmitter<any>();
  @Input() fileObjList6: FileObj[] = []; // 图片列表,与fileObjListChange形成双向数据绑定
  @Output() fileObjList6Change = new EventEmitter<any>();
  @Input() fileObjList7: FileObj[] = []; // 图片列表,与fileObjListChange形成双向数据绑定
  @Output() fileObjList7Change = new EventEmitter<any>();
  @Input() fileObjList8: FileObj[] = []; // 图片列表,与fileObjListChange形成双向数据绑定
  @Output() fileObjList8Change = new EventEmitter<any>();
  @Input() fileObjList9: FileObj[] = []; // 图片列表,与fileObjListChange形成双向数据绑定
  @Output() fileObjList9Change = new EventEmitter<any>();
  @Input() fileObjList10: FileObj[] = []; // 图片列表,与fileObjListChange形成双向数据绑定
  @Output() fileObjList10Change = new EventEmitter<any>();
  @Input() fileObjList11: FileObj[] = []; // 图片列表,与fileObjListChange形成双向数据绑定
  @Output() fileObjList11Change = new EventEmitter<any>();

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private httpservice: HttpSerProvider, public toastCtrl: ToastController, private loadingCtrl: LoadingController,
    public modalCtrl: ModalController, private sanitizer: DomSanitizer, private actionSheetCtrl: ActionSheetController,
    private camera: Camera, public logger: Logger, ) {
    super()
    this.ecl = this.navParams.data.ecllotion;
    var m = flag
    if (m == 1) {
      this.URL = url1;
    }
    else {
      this.URL = url2;
    }
  }

  ionViewDidLoad() {

  }
  segmentChanged() {
    if (this.segmentModel == "capsules") {
      $("#capsules").css('display', 'block');
      $("#carRoof").css('display', 'none');
    } else if (this.segmentModel == "carRoof") {
      $("#capsules").css('display', 'none');
      $("#carRoof").css('display', 'block');

    }

  }
  addPicture(e) {// 新增照片
    const that = this;
    that.actionSheetCtrl.create({
      buttons: [
        {
          text: '从相册选择',
          handler: () => {
            // that.getMultiplePicture({// 从相册多选
            //   maximumImagesCount: (that.max - that.fileObjList.length),
            //   destinationType: 1 // 期望返回的图片格式,1图片路径
            // }).subscribe(imgs => {
            //   for (const img of imgs as string[]) {
            //     that.getPictureSuccess(img);
            //   }
            // });
            let m = "PHOTOLIBRARY";
            that.getPicture(m).subscribe(img => {
              that.getPictureSuccess(img, e);
            });
          }
        },
        {
          text: '拍照',
          handler: () => {
            let m = "CAMERA";
            that.getPicture(m, e).subscribe(img => {
              that.getPictureSuccess(img, e);
            });
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    }).present();
  }
  private getPictureSuccess(img, e) {
    const fileObj = { 'origPath': img, 'thumbPath': img };
    switch (e) {
      case 1:
        this.fileObjList1.push(fileObj);
        this.fileObjList1Change.emit(this.fileObjList1);
        break;
      case 2:
        this.fileObjList2.push(fileObj);
        this.fileObjList2Change.emit(this.fileObjList2);
        break;
      case 3:
        this.fileObjList3.push(fileObj);
        this.fileObjList3Change.emit(this.fileObjList3);
        break;
      case 4:
        this.fileObjList4.push(fileObj);
        this.fileObjList4Change.emit(this.fileObjList4);
        break;
      case 5:
        this.fileObjList5.push(fileObj);
        this.fileObjList5Change.emit(this.fileObjList5);
        break;
      case 6:
        this.fileObjList6.push(fileObj);
        this.fileObjList6Change.emit(this.fileObjList6);
        break;
      case 7:
        this.fileObjList7.push(fileObj);
        this.fileObjList7Change.emit(this.fileObjList7);
        break;
      case 8:
        this.fileObjList8.push(fileObj);
        this.fileObjList8Change.emit(this.fileObjList8);
        break;
      case 9:
        this.fileObjList9.push(fileObj);
        this.fileObjList9Change.emit(this.fileObjList9);
        break;
      case 10:
        this.fileObjList10.push(fileObj);
        this.fileObjList10Change.emit(this.fileObjList10);
        break;
      case 11:
        this.fileObjList11.push(fileObj);
        this.fileObjList11Change.emit(this.fileObjList11);
        break;

      default:
        break;
    }

  }

  /**
    * 使用cordova-plugin-camera获取照片
    * @param options
    */
  getPicture(m, options: CameraOptions = {}): Observable<string> {
    var sourceType;
    if (m == "CAMERA") {
      sourceType = this.camera.PictureSourceType.CAMERA;
    } else {
      sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    }
    const ops: CameraOptions = {
      sourceType: sourceType, // 图片来源,CAMERA:1,拍照,PHOTOLIBRARY:2,相册
      destinationType: 0, // 默认返回图片路径：DATA_URL:0,base64字符串，FILE_URI:1,图片路径
      quality: 16, // 图像质量，范围为0 - 100
      allowEdit: false, // 选择图片前是否允许编辑
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: IMAGE_SIZE, // 缩放图像的宽度（像素）
      targetHeight: IMAGE_SIZE, // 缩放图像的高度（像素）
      saveToPhotoAlbum: false, // 是否保存到相册
      correctOrientation: true, ...options
    };
    return Observable.create(observer => {
      this.camera.getPicture(ops).then((imgData: string) => {
        if (ops.destinationType === this.camera.DestinationType.DATA_URL) {
          observer.next('data:image/jpg;base64,' + imgData);
        } else {
          observer.next(imgData);
        }
      }).catch(err => {
        if (err == 20) {
          this.alert('没有权限,请在设置中开启权限');
        } else if (String(err).indexOf('cancel') != -1) {
          console.log('用户点击了取消按钮');
        } else {
          this.logger.log(err, '使用cordova-plugin-camera获取照片失败');
          this.alert('获取照片失败');
        }
        observer.error(false);
      });
    });
  }
  deletePicture(i, e) {// 删除照片
    if (!this.allowDelete) {
      return;
    }
    this.alertCtrl.create({
      title: '确认删除？',
      buttons: [{ text: '取消' },
      {
        text: '确定',
        handler: () => {
          switch (e) {
            case 1:
              const delArr1 = this.fileObjList1.splice(i, 1);
              const delId1 = delArr1[0].id;
              if (delId1) {
                this.deleteById(delId1);
              }
              break;
            case 2:
              const delArr2 = this.fileObjList2.splice(i, 1);
              const delId2 = delArr2[0].id;
              if (delId2) {
                this.deleteById(delId2);
              }
              break;
            case 3:
              const delArr3 = this.fileObjList3.splice(i, 1);
              const delId3 = delArr3[0].id;
              if (delId3) {
                this.deleteById(delId3);
              }
              break;
            case 4:
              const delArr4 = this.fileObjList4.splice(i, 1);
              const delId4 = delArr4[0].id;
              if (delId4) {
                this.deleteById(delId4);
              }
              break;
            case 5:
              const delArr5 = this.fileObjList5.splice(i, 1);
              const delId5 = delArr5[0].id;
              if (delId5) {
                this.deleteById(delId5);
              }
              break;
            case 6:
              const delArr6 = this.fileObjList6.splice(i, 1);
              const delId6 = delArr6[0].id;
              if (delId6) {
                this.deleteById(delId6);
              }
              break;
            case 7:
              const delArr7 = this.fileObjList7.splice(i, 1);
              const delId7 = delArr7[0].id;
              if (delId7) {
                this.deleteById(delId7);
              }
              break;
            case 8:
              const delArr8 = this.fileObjList8.splice(i, 1);
              const delId8 = delArr8[0].id;
              if (delId8) {
                this.deleteById(delId8);
              }
              break;
            case 9:
              const delArr9 = this.fileObjList9.splice(i, 1);
              const delId9 = delArr9[0].id;
              if (delId9) {
                this.deleteById(delId9);
              }
              break;
            case 10:
              const delArr10 = this.fileObjList10.splice(i, 1);
              const delId10 = delArr10[0].id;
              if (delId10) {
                this.deleteById(delId10);
              }
              break;
            case 11:
              const delArr11 = this.fileObjList11.splice(i, 1);
              const delId11 = delArr11[0].id;
              if (delId11) {
                this.deleteById(delId11);
              }
              break;

            default:
              break;
          }

        }
      }
      ]
    }).present();
  }
  /**
 * 根据文件id删除文件信息
 * @param id
 * @returns {FileObj}
 */
  deleteById(id: string): Observable<FileObj> {
    if (!id) {
      return Observable.of({});
    }

  }

  viewerPicture(index, e) { // 照片预览
    const picturePaths = [];
    switch (e) {
      case 1:
        for (const fileObj of this.fileObjList1) {
          picturePaths.push(fileObj.origPath);
        }
        break;
      case 2:
        for (const fileObj of this.fileObjList2) {
          picturePaths.push(fileObj.origPath);
        }
        break;
      case 3:
        for (const fileObj of this.fileObjList3) {
          picturePaths.push(fileObj.origPath);
        }
        break;
      case 4:
        for (const fileObj of this.fileObjList4) {
          picturePaths.push(fileObj.origPath);
        }
        break;
      case 5:
        for (const fileObj of this.fileObjList5) {
          picturePaths.push(fileObj.origPath);
        }
        break;
      case 6:
        for (const fileObj of this.fileObjList6) {
          picturePaths.push(fileObj.origPath);
        }
        break;
      case 7:
        for (const fileObj of this.fileObjList7) {
          picturePaths.push(fileObj.origPath);
        }
        break;

      case 8:
        for (const fileObj of this.fileObjList8) {
          picturePaths.push(fileObj.origPath);
        }
        break;
      case 9:
        for (const fileObj of this.fileObjList9) {
          picturePaths.push(fileObj.origPath);
        }
        break;

      case 10:
        for (const fileObj of this.fileObjList10) {
          picturePaths.push(fileObj.origPath);
        }
        break;
      case 11:
        for (const fileObj of this.fileObjList11) {
          picturePaths.push(fileObj.origPath);
        }
        break;
      default:
        break;
    }
    this.modalCtrl.create(PreviewPicturePage, { 'initialSlide': index, 'picturePaths': picturePaths }).present();
  }

  /**
   * 根据图片路径把图片转化为base64字符串
   * @param path 图片路径，可以是file://  或 http://   或 相对路径
   * @param width 转换后的图片宽度，默认为原图宽度
   * @param height 转换后的图片高度，默认为原图高度
   * @param outputFormat 一般为 'image/jpeg' 'image/png'
   */
  convertImgToBase64(path: string, width = null, height = null, outputFormat = 'image/jpeg'): Observable<string> {
    return Observable.create(observer => {
      let img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        let canvas = document.createElement('canvas');
        canvas.width = width || img.width;
        canvas.height = height || img.height;
        let context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, width, height);
        let imgBase64 = canvas.toDataURL(outputFormat);
        observer.next(imgBase64);
      };
      img.src = path;
    });
  }

  /**
   * 只有一个确定按钮的弹出框.
   * 如果已经打开则不再打开
   */
  alert = (() => {
    let isExist = false;
    return (title: string, message = '', callBackFun = null): void => {
      if (!isExist) {
        isExist = true;
        this.alertCtrl.create({
          title,
          message,
          cssClass: 'alert-zIndex-highest',
          buttons: [{
            text: '确定', handler: () => {
              isExist = false;
              callBackFun && callBackFun();
            }
          }],
          enableBackdropDismiss: false
        }).present();
      }
    };
  })();



  go96333() {
     super.generalToast(this.toastCtrl, "功能开发中");
  }
  uploadForm() {
    super.generalToast(this.toastCtrl, "功能开发中");
    // const prompt = this.alertCtrl.create({
    //   title: '确认提交',
    //   message: "如有问题请在下方填写备注",
    //   inputs: [
    //     {
    //       name: 'title',
    //     },
    //   ],
    //   buttons: [
    //     {
    //       text: '取消',
    //       handler: data => {
    //         console.log('Cancel clicked');
    //       }
    //     },
    //     {
    //       text: '确定',
    //       handler: data => {
    //         this.save(data.title)
    //       }
    //     }
    //   ]
    // });
    // prompt.present();

  }
  save(data) {
    var loader = this.loadingCtrl.create({
      content: "数据通讯中，请稍候！",
      duration: 10000
    });
    loader.present();
    if (window.localStorage.getItem('phone') != null) {
      this.phone = window.localStorage.getItem('phone')
    }
    var len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var pwd = '';
    for (var t = 0; t < len; t++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    var n:any;
    n=1;
    console.log(pwd)
    var FileObj={};
    var fileName = ["轿厢传感器", "摄像头", "有线警铃", "检修", "4G卡", "合同", "网桥", "网桥", "平层传感器", "门开关传感器", "喇叭", "电梯物联设备-网关"];
          for (let f=0; f<this.fileObjList1.length;f++) {
            FileObj["p"+n]=this.fileObjList1[f].origPath;
            n++;
          }
       for (let f=0; f<this.fileObjList2.length;f++) {
            FileObj["p"+n]=this.fileObjList2[f].origPath;
            console.log("p"+n)
             n++;
          }
                 for (let f=0; f<this.fileObjList1.length;f++) {
            FileObj["p"+n]=this.fileObjList1[f].origPath;
            n++
          }
    // for(var i=1;i<=11;i++){
    //   switch (i) {
    //     case 1:
    //       if(this.fileObjList1.length==0){
    //         super.warningToast(this.toastCtrl,"请上传"+fileName[0])
    //         loader.dismiss()
    //         return ;
    //       }
    //       for (let f=0; f<this.fileObjList1.length;f++) {
    //         FileObj["p"+n]=this.fileObjList1[f].origPath;
    //         n++
    //       }
    //       break;
    //     case 2:
    //       if(this.fileObjList2.length==0){
    //         super.warningToast(this.toastCtrl,"请上传"+fileName[1])
    //         loader.dismiss()
    //         return ;
    //       }
    //       for (let f=0; f<this.fileObjList2.length;f++) {
    //         FileObj["p"+n]=this.fileObjList2[f].origPath;
    //         console.log("p"+n)
    //          n++;
    //       }
    //       break;
    //     case 3:
    //       if(this.fileObjList3.length==0){
    //         super.warningToast(this.toastCtrl,"请上传"+fileName[2])
    //         loader.dismiss()
    //         return ;
    //       }
    //       for (let f=0; f<this.fileObjList3.length;f++) {
    //         FileObj["p"+n]=this.fileObjList3[f].origPath;
    //          n++;
    //       }
    //       break;
    //     case 4:
    //       if(this.fileObjList4.length==0){
    //         super.warningToast(this.toastCtrl,"请上传"+fileName[3])
    //         loader.dismiss()
    //         return ;
    //       }
    //       for (let f=0; f<this.fileObjList4.length;f++) {
    //         FileObj["p"+n]=this.fileObjList4[f].origPath;
    //          n++;
    //       }
    //       break;
    //     case 5:
    //       if(this.fileObjList5.length==0){
    //         super.warningToast(this.toastCtrl,"请上传"+fileName[4])
    //         loader.dismiss()
    //         return ;
    //       }
    //       for (let f=0; f<this.fileObjList5.length;f++) {
    //         FileObj["p"+n]=this.fileObjList5[f].origPath;
    //          n++;
    //       }
    //       break;
    //     case 6:
    //       if(this.fileObjList6.length==0){
    //         super.warningToast(this.toastCtrl,"请上传"+fileName[5])
    //         loader.dismiss()
    //         return ;
    //       }
    //       for (let f=0; f<this.fileObjList6.length;f++) {
    //         FileObj["p"+n]=this.fileObjList6[f].origPath;
    //          n++;
    //       }
    //       break;
    //     case 7:
    //       if(this.fileObjList7.length==0){
    //         super.warningToast(this.toastCtrl,"请上传"+fileName[6])
    //         loader.dismiss()
    //         return ;
    //       }
    //       for (let f=0; f<this.fileObjList7.length;f++) {
    //         FileObj["p"+n]=this.fileObjList7[f].origPath;
    //          n++;
    //       }
    //       break;
    //     case 8:
    //       if(this.fileObjList8.length==0){
    //         super.warningToast(this.toastCtrl,"请上传"+fileName[7])
    //         loader.dismiss()
    //         return ;
    //       }
    //       for (let f=0; f<this.fileObjList8.length;f++) {
    //         FileObj["p"+n]=this.fileObjList8[f].origPath;
    //          n++;
    //       }
    //       break;
  
    //     case 9:
    //       if(this.fileObjList9.length==0){
    //         super.warningToast(this.toastCtrl,"请上传"+fileName[8])
    //         loader.dismiss()
    //         return ;
    //       }
    //       for (let f=0; f<this.fileObjList9.length;f++) {
    //         FileObj["p"+n]=this.fileObjList9[f].origPath;
    //          n++;
    //       }
    //       break;
    //     case 10:
    //       if(this.fileObjList10.length==0){
    //         super.warningToast(this.toastCtrl,"请上传"+fileName[9])
    //         loader.dismiss()
    //         return ;
    //       }
    //       for (let f=0; f<this.fileObjList10.length;f++) {
    //         FileObj["p"+n]=this.fileObjList10[f].origPath;
    //          n++;
    //       }
    //       break;
  
    //     case 11:
    //       if(this.fileObjList11.length==0){
    //         super.warningToast(this.toastCtrl,"请上传"+fileName[10])
    //         loader.dismiss()
    //         return ;
    //       }
    //       for (let f=0; f<this.fileObjList11.length;f++) {
    //         FileObj["p"+n]=this.fileObjList11[f].origPath;
    //          n++;
    //       }
    //       break;
    //     default:
    //       break;
    //   }
    // }
     console.log(FileObj)
     console.log(JSON.stringify(FileObj))
     console.log( JSON.stringify({
      "data": "{\"keyValue\":'" + pwd + "',\"ElevatorCoding\":'" + this.ecl + "',\"F_CheckAndAcceptUser\":'" + this.phone + "',\"FileBytes\":" +JSON.stringify(FileObj) + ",\"F_CheckAndAcceptRemarks\":'" + data + "'}"
     }))
    var url = this.URL + "/CheckAndAcceptAPI/ExplorationPicture";
    this.httpservice.post(url, JSON.stringify({
      "data": "{\"keyValue\":'" + pwd + "',\"ElevatorCoding\":'" + this.ecl + "',\"F_CheckAndAcceptUser\":'" + this.phone + "',\"FileBytes\":" +JSON.stringify(FileObj) + ",\"F_CheckAndAcceptRemarks\":'" + data + "'}"
    })).then(res => {
      try {
        console.log(res)
        loader.dismiss()
      } catch (e) {
        const toast = super.showToast(this.toastCtrl, "/CheckAndAcceptAPI/ExplorationPictureo接口异常:" + e);
      }
    });
 
  }

}





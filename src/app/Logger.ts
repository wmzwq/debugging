/**
 * Created by yanxiaojun617@163.com on 07-25.
 */
import { Injectable } from '@angular/core';

/**
 * 添加日志打印、日志上报功能
 * @description
 */
@Injectable()
export class Logger {

  log(err: any, action: string, other = null): void {
    console.log('Logger.log：action-' + action);
    other && console.log(other);
    console.log(err);
  }

  httpLog(err: any, msg: string, other = {}): void {
    console.log('Logger.httpLog：msg-' + msg);
  }

}

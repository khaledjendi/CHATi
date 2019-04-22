import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messages: AngularFireList<Message>;
  //message: Message;
  username: Observable<string>;
  user: firebase.User;

  constructor(private afDB: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth_user => {
      if (auth_user !== undefined && auth_user != null) {
        this.user = auth_user;
        
      }
    });

  }
  
  sendMsg(msg: string): boolean {
    try {
      this.messages = this.getMsgs();
      this.messages.push({
        message: msg,
        time: this.getTimeStamp(),
        username: (this.user !== undefined && this.user != null) ? this.user.displayName : '',
        email: (this.user !== undefined && this.user != null) ? this.user.email : ''
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  getMsgs(): AngularFireList<Message> { //ref => ref.limitToLast(25)
    return this.afDB.list<Message>('messages', ref =>  { return ref.limitToLast(25).orderByKey() });
  }

  getTimeStamp() {
    let now = new Date();
    return (this.getDate(now) + ' ' + this.getTime(now, true));
  }

  private getTime(now: Date, isSeconds: boolean = false) {
    return now.getHours() + ':' + now.getMinutes() + (isSeconds ? (':' + now.getSeconds()) : '');
  }

  private getDate(now: Date) {
    return now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
  }
}

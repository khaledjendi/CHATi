import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable, from } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  userId: string;
  private authState: any;
  errorMsg: string = "";

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.authState = auth;
        this.user.pipe(tap(user => {
          if (user) {
            this.userId = user.uid
            this.updateOnConnect()
            this.updateOnDisconnect()
          }
        })).subscribe();
      }
    });
  }

  private updateStatus(status: string) {
    if (!this.userId) 
    return this.db.object(`users/` + this.userId).update({ status: status })
  }

  private updateOnConnect() {
    return this.db.object('.info/connected').valueChanges().pipe(tap(connected => {
      let status = connected ? 'online' : 'offline'
      this.updateStatus(status)
    })).subscribe();
  }

  authUser() {
    return this.user;
  }

  private updateOnDisconnect() {
    firebase.database().ref().child(`users/${this.userId}`)
            .onDisconnect()
            .update({status: 'offline'})
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.setUserStatus('online');
        this.router.navigate(['home']);
      });
  }
  

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }

  async signUp(email: string, password: string, displayName: string) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      this.authState = result.user;
      const status = 'online';
      this.setUserData(email, displayName, status);
      this.errorMsg = "";
      return true
    }
    catch (error) {
      this.errorMsg = (error !== undefined && error != null && error.message !== undefined && error.message != null) ? error.message : "";
      return false;
    }
  }

  

  setUserData(email: string, displayName: string, status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = {
      email: email,
      displayName: displayName,
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  setUserStatus(status: string): void {
    const path = `users/${this.currentUserId}`;

    const data = {
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }
}

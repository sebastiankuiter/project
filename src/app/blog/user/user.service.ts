import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userRef = this.firestore.collection('user');

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  async saveUserData(userData) {
    // const userUID = this.afAuth.user.uid
    const state = await this.afAuth.authState.pipe(take(1)).toPromise();
    const userUID = state.uid;
    return this.userRef.doc(`${userUID}_${userData.firstName}`)
      .set(userData)
  }

  async getUserData() {
    const state = await this.afAuth.authState.pipe(
      take(1)
    ).toPromise();
    console.log(state.uid);
    return this.firestore.collection('user').doc(state.uid)
      .get().pipe(
        map(userRef => {
          // console.log(userRef.data());
          return userRef.data();
        })
      ).toPromise()
  }

  isAuthenticated(): Observable<boolean> {
    return new Observable((sub) => {
      this.afAuth.authState.subscribe((state) => {
        if (!state) { sub.next(false) }
        else { sub.next(true) }
      })
    })
  }
}

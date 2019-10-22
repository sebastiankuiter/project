import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userRef = this.firestore.collection('user');

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  async saveUserData(userData) {
    // const userUID = this.afAuth.user.uid
    const state = await this.afAuth.authState.pipe(take(1)).toPromise();
    const userUID = state.uid;
    console.log(userUID);
    return this.userRef.doc(`${userUID}_${userData.firstName}`)
      .set(userData)
  }
}

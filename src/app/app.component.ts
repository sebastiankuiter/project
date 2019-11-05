import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'serverless';

  showLogout = false;
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(state => {
      if (!state) { this.showLogout = false; return; }
      this.showLogout = true;
      // console.log(state)
      // this.testSubcollectioQuery();
    })
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}

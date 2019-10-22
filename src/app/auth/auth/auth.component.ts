import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  userRef = this.firestore.collection('user');

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(d => console.log(d));
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  async successCallback($event) {
    let user = await this.userRef.doc($event.authResult.user.uid).get().toPromise();
    if (user.exists) { return; }
    const userData = this.afAuth.auth.currentUser;
    console.log(userData);
    const dialogRef = this.dialog.open(DialogUsername, {
      width: '80%',
      data: { uid: $event.authResult.user.uid }
    })
    dialogRef.afterClosed().subscribe(() => {
      console.log('Sucessfully set username.');
      this.router.navigate(['/']);
    })
  }

  errorCallback($event) {
    console.log($event);
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
    <div class="container">
      <h5>Willkommen bei AppName</h5>
      <p>Wählen Sie nun Ihren Benutzernamen.</p>
      <form [formGroup]="usernameForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="title">Username:</label>
          <input type="text" formControlName="username">
        </div>
        <div *ngIf="displayWarning">Sie können den Dialog erst verlassen, wenn Sie einen gültigen Usernamen gewählt haben.</div>
        <button [disabled]="usernameForm.invalid" class="btn btn-success">Wählen</button>
      </form>
    </div>
  `,
})
export class DialogUsername implements OnInit {

  usernameForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(5)]]
  });
  displayWarning = false;
  userRef = this.firestore.collection('user');

  constructor(
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogUsername>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    // this.formBuilder.group({
    //   username: ['', [Validators.required, Validators.minLength(5)]]
    // })
  }

  async onSubmit() {
    // let checkUser = await this.userRef('username', '==', this.usernameForm.controls.username.value).get().toPromise()
    let checkUser = await this.firestore.collection('user', ref =>
      ref.where('username', '==', this.usernameForm.controls.username.value)
    ).get().toPromise();
    if (checkUser.size > 0) { console.log(`User already exists.`); return; }
    this.userRef.doc(this.data.uid).set(
      { username: this.usernameForm.controls.username.value }
    );
    this.dialogRef.close();
  }

  onNoClick(): void {
    if (this.usernameForm.invalid) {
      this.displayWarning = true;
      return;
    }
    this.dialogRef.close();
  }

}

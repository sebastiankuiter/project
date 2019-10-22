import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseUIModule } from 'firebaseui-angular';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent, DialogUsername } from './auth/auth.component';
import { MatDialogModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

const routes = [
  { path: '', component: AuthComponent }
]

@NgModule({
  declarations: [AuthComponent, DialogUsername],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FirebaseUIModule.forFeature({ tosUrl: 'AUTH_MODULE' }),
    RouterModule.forChild(routes),
    MatDialogModule,
  ],
  entryComponents: [DialogUsername]
})
export class AuthModule { }

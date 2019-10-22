import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user/user.service';
import { BlogsComponent } from './blogs/blogs.component';
import { MatDialogModule } from '@angular/material';

const routes: Routes = [
  {
    path: '', component: LandingComponent, children: [
      { path: '', component: BlogsComponent },
      { path: 'user', component: UserComponent },
      { path: 'blog', component: CreateBlogComponent }
    ]
  }
]

@NgModule({
  declarations: [LandingComponent, UserComponent, CreateBlogComponent, BlogsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatDialogModule,
  ],
  providers: [UserService],
  entryComponents: []
})
export class BlogModule { }

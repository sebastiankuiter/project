import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogsService } from './blogs.service';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit, OnDestroy {

  recentBlogPosts: Observable<any>;
  auth = false;
  lastPost: any;
  authState: any;

  constructor(
    private blogsServerice: BlogsService,
    private userService: UserService
  ) {
    this.recentBlogPosts = this.blogsServerice.getBlogs();
  }

  ngOnInit() {
    this.userService.isAuthenticated().subscribe(
      (auth) => { this.auth = auth }
    )
  }

  getMore() {
    this.recentBlogPosts = this.blogsServerice.getMore();
    this.blogsServerice.testSubcollectioQuery();
  }

  ngOnDestroy() {

  }

}

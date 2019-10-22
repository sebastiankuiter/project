import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogsService } from './blogs.service';
import { Blog } from 'src/app/model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit, OnDestroy {

  $recentBlogs: any;
  snapshot: any;
  recency = 3;
  recentBlogPosts: Promise<any>;

  constructor(private blogsServerice: BlogsService) { }

  async ngOnInit() {
    // better with paginate your data video.
    await this.data(1);
  }

  data(snapshot?) {
    return new Promise((resolve, reject) => {
      this.$recentBlogs = this.blogsServerice.getNextBlogs(snapshot)
        .onSnapshot(
          querySnapshot => {
            this.snapshot = querySnapshot;
            console.log(`Received query snapshot of size ${querySnapshot.size}`);
            console.log(querySnapshot.empty);
            if (!querySnapshot.empty) {
              // this.recentBlogPosts = querySnapshot.docs;
              const array = [];
              querySnapshot.forEach(el => {
                array.push(el.data())
              });
              console.log(array);
              this.recentBlogPosts = of(array).toPromise();
              resolve();
            }
          },
          err => { reject(err); console.error(err) }
        )
    })
  }

  next() {

  }

  ngOnDestroy() {
    this.$recentBlogs();
  }

}

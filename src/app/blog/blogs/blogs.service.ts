import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Blog } from 'src/app/model';
import { map, tap, exhaustMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  blogsCollection = this.firestore.collection('blogs');
  allqueriedBlogs = [];
  lastVisible: any;

  constructor(
    private firestore: AngularFirestore
  ) { }

  createNewBlog(blog: any) {
    return new Observable((sub) => {
      this.blogsCollection.add(blog)
        .then((ref) => { sub.next(ref); sub.complete() })
        .catch((err) => { sub.error(err) })
    });
  }

  getMore() {
    console.log(this.lastVisible);
    const collection = this.firestore.collection('blogs', ref => ref
      .limit(2)
      .orderBy('created', 'desc')
      .startAfter(this.lastVisible)
    )
    const $blogs = collection.get()
      .pipe(
        map((blogs: any) => {
          blogs.forEach(data => this.allqueriedBlogs.push(data.data()));
          console.log(this.allqueriedBlogs);
          this.lastVisible = blogs.docs[blogs.docs.length - 1];
          return this.allqueriedBlogs;
        }),
      )
    return $blogs
  }

  getBlogs() {
    const collection = this.firestore.collection('blogs', ref => ref
      .limit(2)
      .orderBy('created', 'desc')
    )
    const $blogs = collection.valueChanges()
      .pipe(
        map((blogs: any) => {
          this.allqueriedBlogs = [];
          blogs.forEach(data => this.allqueriedBlogs.push(data));
          this.lastVisible = blogs[blogs.length - 1];
          return this.allqueriedBlogs;
        })
      )
    return $blogs;
  }
}

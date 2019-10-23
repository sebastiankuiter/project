import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Blog } from 'src/app/model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  blogsCollection = this.firestore.collection('blogs');
  allqueriedBlogs = [];

  constructor(
    private firestore: AngularFirestore
  ) { }

  createNewBlog(blog: any) {
    return from(
      new Promise((resolve, reject) => {
        this.blogsCollection.add(blog)
          .then((ref) => { resolve(ref) })
          .catch((err) => { reject(err) })
      })
    )
  }

  getMore() {
    const collection = this.firestore.collection('blogs', ref => ref
      .orderBy('created', 'desc')
      .startAfter(this.allqueriedBlogs[this.allqueriedBlogs.length - 1])
      .limit(2)
    )
    const $blogs = collection.get()
      .pipe(
        map(blogs => {
          blogs.forEach(data => this.allqueriedBlogs.push(data.data()));
          console.log(this.allqueriedBlogs);
          return this.allqueriedBlogs;
        })
      )
    return $blogs
  }

  getBlogs() {
    const collection = this.firestore.collection('blogs', ref => ref
      .orderBy('created', 'desc')
      .limit(2)
    )
    const $user = collection.valueChanges()
      .pipe(
        map((blogs: any) => {
          blogs.forEach(data => this.allqueriedBlogs.push(data));
          console.log(this.allqueriedBlogs);
          return this.allqueriedBlogs;
        })
      )
    return $user;
  }
}

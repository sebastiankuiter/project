import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  blogsRef = this.firestore.collection('blogs').ref;
  now = new Date();
  constructor(
    private firestore: AngularFirestore
  ) { }

  createNewBlog(blog: Blog) {
    return new Observable((subscriber) => {
      this.blogsRef.add(blog)
        .catch((err) => { subscriber.error(err) })
        .then((ref: any) => {
          console.log(`Added blog with id: ${ref.id}`);
          subscriber.next(ref);
          subscriber.complete();
        })
    })
  }

  getNextBlogs(snapshot) {
    return this.blogsRef
      // .where('created', '>=', this.now.setMonth(this.now.getMonth() - months))
      .orderBy('created')
      .startAt(snapshot)
      .limit(10);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogsService } from '../blogs/blogs.service';
import { exhaust } from 'rxjs/operators';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {

  blogForm: FormGroup
  constructor(
    private formBuider: FormBuilder,
    private blogService: BlogsService
  ) { }

  ngOnInit() {
    this.blogForm = this.formBuider.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    })
  }

  onSubmit() {
    
    let blog = {
      created: new Date(),
      modified: new Date(),
      userRef: '',
      username: '',
      title: this.blogForm.controls.title.value,
      text: this.blogForm.controls.text.value
    };
    this.blogService.createNewBlog(blog).pipe(exhaust())
      .subscribe(
        (ref) => { 
          // success navigate away or something;
         },
        (error) => console.error(error)
      )
  }
}

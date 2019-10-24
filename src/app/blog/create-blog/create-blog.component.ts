import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogsService } from '../blogs/blogs.service';
import { exhaust } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {
  blogForm: FormGroup;
  user: any;

  constructor(
    private formBuider: FormBuilder,
    private blogService: BlogsService,
    private userService: UserService
  ) { }

  async ngOnInit() {
    this.blogForm = this.formBuider.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    });
    this.user = await this.userService.getUserData();
    console.log(this.user);
  }

  onSubmit() {
    let blog = {
      created: new Date(),
      modified: new Date(),
      username: this.user.username,
      title: this.blogForm.controls.title.value,
      text: this.blogForm.controls.text.value
    };
    this.blogService.createNewBlog(blog)
      .subscribe(
        (ref) => {
          console.log('Sucess');
          this.blogForm.reset();
          // success navigate away or something;
        },
        (error) => console.error(error)
      )
  }
}

import { Component,OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create-component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter<Post>()

  // onAddPost(postInput) {
  //   console.dir(postInput)
  //   this.newPost = postInput.value
  // } this is for the single data blinding
  onAddPost(form: NgForm) {
    if (form.invalid) {
      return
    }
    const post: Post = {
      title: form.value.title,
      content: form.value.content
    };
    this.postCreated.emit(post)
  }

  ngOnInit() {}

}

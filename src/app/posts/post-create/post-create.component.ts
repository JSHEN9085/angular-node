import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create-component.css']
})
export class PostCreateComponent implements OnInit {
  newPost = 'No Content';
  enteredValue = '';

  constructor() { }

  ngOnInit() {
  }
  // onAddPost(postInput) {
  //   console.dir(postInput)
  //   this.newPost = postInput.value
  // } this is for the single data blinding
  onAddPost() {
    this.newPost = this.enteredValue
  }



}

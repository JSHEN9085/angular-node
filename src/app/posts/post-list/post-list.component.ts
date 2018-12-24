import { Component,OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // posts = [
  //   {title: 'First Post', content: "This is the first post"},
  //   {title: 'Second Post', content: "This is the second post"},
  //   {title: 'Third Post', content: "This is the third post"}
  // ];
  ngOnInit() {}

  @Input() posts = [];
}

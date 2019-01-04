import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>()

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http.get<{posts: any}>('http://localhost:3000/api/posts')
    .pipe(map(postData => {
      return postData.posts.map(post => {
        return {
          id: post._id,
          title: post.title,
          content: post.content,
          imagePath: post.imagePath
        }
      })
    }))
    .subscribe((transformedPosts) => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    })
  }

  getPost(id: string) {
    // return {...this.posts.find(post => post.id === id)};
    return this.http.get<{ _id: string, title: string, content: string, images: string}>('http://localhost:3000/api/posts/' + id)
  }

  getPostUpdate() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, image: File) {
    // const post: Post = {id: null, title: title, content: content};  json can't contain file, so we no longer use this format;

    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);

    this.http.post<{message: string; postId: string}>('http://localhost:3000/api/posts', postData)
    .subscribe((response) => {
      const post: Post = {id: response.post.id, title: title, content: content, imagePath: response.post.imagePath};
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    })
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if(typeof image === 'object') {
      const postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      };
    }
    this.http.put('http://localhost:3000/api/posts/' + id, postData)
    .subscribe(response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
      const post: Post = {
        id: id,
        title: title,
        content: content,
        imagePath: ""
      }
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    })
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    })
  }
}

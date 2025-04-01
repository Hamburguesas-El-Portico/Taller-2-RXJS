import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, of } from 'rxjs';
import { User } from './interfaces/user';
import { Post } from './interfaces/post';
import { PostComment } from './interfaces/comment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ROOT_URL = "https://dummyjson.com"
  txtUser: string = "";  // Variable para el username ingresado
  publicaciones: Post[] = [];  // Array para almacenar los posts
  userData: User | null = null; // Para almacenar la información del usuario

  constructor(private http: HttpClient) {}

  // Función para buscar usuario por su username
  searchUser() {
    if (!this.txtUser.trim()) {
      alert("Por favor ingresa un username.");
      return;
    }
    this.getUserAndPost();
  }

  ngOnInit(): void {
    // Esto es solo un ejemplo para obtener un usuario por ID, lo puedes eliminar si no es necesario
    // this.http.get(this.ROOT_URL + '/user/1').subscribe((userInfo: any) => {
    //   this.userData = userInfo;
    // });
  }

  // Obtener datos del usuario y los posts
  getUserAndPost() {
    this.http.get<{ users: User[] }>(`${this.ROOT_URL}/users/filter?key=username&value=${this.txtUser}`).pipe(
      mergeMap((userInfo: any) => {
        if (userInfo.users.length === 1) {
          this.userData = userInfo.users[0];
          return this.http.get<{ posts: Post[] }>(`${this.ROOT_URL}/posts/user/${this.userData?.id}`);
        } else {
          this.userData = null;
          return of({ posts: [] });
        }
      }),
      mergeMap((postInfo: any) => {
        this.publicaciones = postInfo.posts;
        if (this.publicaciones.length > 0) {
          return this.http.get<{ comments: PostComment[] }>(`${this.ROOT_URL}/comments/post/${this.publicaciones[0].id}`);
        }
        return of({ comments: [] });
      })
    ).subscribe((commentInfo: any) => {
      if (this.publicaciones) {
        this.publicaciones.forEach(post => {
          post.comments = commentInfo.comments.filter((comment: PostComment) => comment.postId === post.id);
        });
      }
    });
  }
}

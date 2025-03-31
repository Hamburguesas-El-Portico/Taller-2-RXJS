import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './interfaces/user'; // Asegúrate de tener la interfaz User definida
import { Post } from './interfaces/post';
import { mergeMap, of } from 'rxjs';
import { PostComment } from './interfaces/comment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ROOT_URL = "https://dummyjson.com"

  title = "taller-rxjs"

  txtUser: string = "";  // Variable para el username ingresado

  publicaciones: Post[] = [];

  userData: User | null = null; // Para almacenar la información del usuario

  constructor(private http: HttpClient) {}

  // Función para buscar usuario por su username
  searchUser() {
    if (!this.txtUser.trim()) {
      alert("Por favor ingresa un username.");
      return;
    }
    /*
      this.http.get(`${this.ROOT_URL}/users/filter?key=username&value=${this.txtUser}`)
        .subscribe({
          next: (userInfo: any) => {
             // Si el arreglo tiene algún usuario
             if (userInfo.length == 1) {
              this.userData = userInfo[0];  // Asignar el primer usuario
            } else {
              this.userData = null;  // Si no se encuentra, vaciar userData
            }
          }
        }); */

        this.getUserAndPost();
    }

    ngOnInit(): void{
      this.http.get(this.ROOT_URL + '/user/1').subscribe((userInfo: any) =>{
        this.userData = userInfo
      }
      )
      //this.getPost(this.userData!.id)

    }



    getPost(id: Number){
      this.http.get(`${this.ROOT_URL}/posts/${id}`).subscribe((postInfo: any) =>{
        this.publicaciones=postInfo.posts;
      })
    }

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


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Post } from '../interfaces/post';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://dummyjson.com/';

  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}users`);
  }

  // Buscar un usuario por su username
  getUserByUsername(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}users/filter?key=username&value=${username}`);
  }

  // Obtener los posts de un usuario por ID
  getPostsByUserId(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}posts/user/${userId}`);
  }

  // Obtener los comentarios de un post por ID
  getCommentsByPostId(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}comments/post/${postId}`);
  }

  // Obtener un post por ID
  getPostById(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}posts/${postId}`);
  }
}

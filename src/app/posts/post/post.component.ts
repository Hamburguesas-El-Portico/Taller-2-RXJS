import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post';
import { PostComment } from '../../interfaces/comment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post: Post | null = null;  // Recibimos los datos del post
}

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostService } from '../../shared/services/post/post.service';
import { BehaviorSubject, catchError, Observable, of, switchMap } from 'rxjs';
import { Post } from '../../shared/models/post.model';
import { PaginatedResponse } from '../../shared/models/paginado';
import { Comment } from '../../shared/models/comment.model';
import { FriendlyDatePipe } from '../../shared/pipes/friendly-date.pipe';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RouterModule, FriendlyDatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);

  public post$!: Observable<Post | null>;
  public commentsResponse$!: Observable<PaginatedResponse<Comment> | null>;
  public error: string | null = null;

  private commentsPage$ = new BehaviorSubject<number>(0);

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');

    if (postId) {
      // Stream para el post principal
      this.post$ = this.postService.getPostById(postId).pipe(
        catchError((err) => {
          console.error(err);
          this.error = 'No se pudo encontrar la publicación solicitada.';
          return of(null);
        })
      );

      // 2. Stream para los comentarios, que reacciona a los cambios en commentsPage$
      this.commentsResponse$ = this.commentsPage$.pipe(
        switchMap((page) =>
          this.postService.getCommentsForPost(postId, page, 5)
        ), // Pedimos de a 5 comentarios
        catchError((err) => {
          console.error('Error al cargar comentarios:', err);
          return of(null);
        })
      );
    } else {
      this.error = 'No se proporcionó un ID de publicación.';
    }
  }

  // 3. Método para cambiar la página de comentarios, llamado desde el HTML
  changeCommentPage(newPage: number): void {
    this.commentsPage$.next(newPage);
  }
}

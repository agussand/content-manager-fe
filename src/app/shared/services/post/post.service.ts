import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../models/paginado';
import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/posts';
  constructor() {}

  getPosts(
    page: number = 0,
    size: number = 10
  ): Observable<PaginatedResponse<Post>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PaginatedResponse<Post>>(`${this.apiUrl}`, {
      params,
    });
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

  getCommentsForPost(
    postId: string,
    page: number = 0,
    size: number = 10
  ): Observable<PaginatedResponse<Comment>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PaginatedResponse<Comment>>(
      `${this.apiUrl}/posts/${postId}/comments`,
      { params }
    );
  }
}

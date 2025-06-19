import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AnnualContentReportDTO,
  DashboardDTO,
  PostEngagementDTO,
  TopCommentedPostDTO,
  UserPostCountDTO,
} from '../models/report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor() {}

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/reports'; // URL base para los reportes

  // Reporte 1: Cantidad de publicaciones por usuario
  getTopPosters(): Observable<UserPostCountDTO[]> {
    return this.http.get<UserPostCountDTO[]>(`${this.apiUrl}/posts-by-user`);
  }

  // Reporte 2: Publicaciones con más comentarios
  getTopCommentedPosts(): Observable<TopCommentedPostDTO[]> {
    return this.http.get<TopCommentedPostDTO[]>(
      `${this.apiUrl}/top-commented-posts`
    );
  }

  // Reporte 5: Dashboard general
  getGeneralDashboard(): Observable<DashboardDTO> {
    return this.http.get<DashboardDTO>(`${this.apiUrl}/dashboard`);
  }

  getAnnualContentReport(): Observable<AnnualContentReportDTO> {
    return this.http.get<AnnualContentReportDTO>(
      `${this.apiUrl}/monthly-average`
    );
  }

  getPostEngagementData(): Observable<PostEngagementDTO[]> {
    return this.http.get<PostEngagementDTO[]>(`${this.apiUrl}/post-engagement`);
  }
}

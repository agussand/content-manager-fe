import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReportService } from '../../shared/services/report.service';
import { catchError, forkJoin, Observable, of } from 'rxjs';
import { DashboardData } from '../../shared/models/report.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private reportService = inject(ReportService);

  public dashboardData$!: Observable<DashboardData | null>;
  public error: string | null = null;

  ngOnInit(): void {
    // Usamos forkJoin para esperar a que todas las llamadas a la API terminen
    this.dashboardData$ = forkJoin({
      summary: this.reportService.getGeneralDashboard(),
      topPosters: this.reportService.getTopPosters(),
      topCommentedPosts: this.reportService.getTopCommentedPosts(),
    }).pipe(
      catchError((err) => {
        console.error('Error al cargar los datos del dashboard:', err);
        this.error = 'No se pudieron cargar los reportes. Inténtelo más tarde.';
        return of(null); // Devolvemos null para que la plantilla pueda mostrar el error
      })
    );
  }
}

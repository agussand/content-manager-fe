import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { ReportService } from '../../shared/services/report.service';
import { map, Observable } from 'rxjs';
import {
  AnnualContentReportDTO,
  ChartData,
} from '../../shared/models/report.model';

@Component({
  selector: 'app-annual-report',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, DecimalPipe],
  templateUrl: './annual-report.component.html',
  styleUrl: './annual-report.component.css',
})
export class AnnualReportComponent implements OnInit {
  private reportService = inject(ReportService);

  public report$!: Observable<AnnualContentReportDTO>;

  // Arrays para los datos transformados que usarán los gráficos
  public postsChartData: ChartData[] = [];
  public viewsChartData: ChartData[] = [];

  // --- Opciones de configuración para los gráficos ---
  //public view: [number, number] = [700, 400];
  public colorScheme = {
    name: 'vivid',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#6366F1'],
  };

  ngOnInit() {
    this.report$ = this.reportService.getAnnualContentReport().pipe(
      map((report) => {
        // La API devuelve los meses en orden descendente, los invertimos para el gráfico
        const reversedStats = [...report.monthlyStats].reverse();

        // Transformamos los datos al formato que ngx-charts requiere
        this.postsChartData = reversedStats.map((stat) => ({
          name: stat.period,
          value: stat.postsCount,
        }));

        this.viewsChartData = reversedStats.map((stat) => ({
          name: stat.period,
          value: stat.totalViews,
        }));

        return report;
      })
    );
  }
}

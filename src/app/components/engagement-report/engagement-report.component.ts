import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { ReportService } from '../../shared/services/report.service';
import { map, Observable } from 'rxjs';
import {
  BubbleChartData,
  PostEngagementDTO,
} from '../../shared/models/report.model';

@Component({
  selector: 'app-engagement-report',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './engagement-report.component.html',
  styleUrl: './engagement-report.component.css',
})
export class EngagementReportComponent implements OnInit {
  private reportService = inject(ReportService);

  public engagementChartData$!: Observable<BubbleChartData[]>;

  // Opciones del gráfico
  public view: [number, number] = [700, 400];
  public colorScheme = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5A87C5', '#A2D4EC', '#F2E4A7', '#F2A488', '#D96E7F'],
  };
  public xAxisLabel = 'Me Gusta';
  public yAxisLabel = 'Comentarios';

  ngOnInit() {
    this.engagementChartData$ = this.reportService
      .getPostEngagementData()
      .pipe(map((data) => this.transformDataForChart(data)));
  }

  private transformDataForChart(data: PostEngagementDTO[]): BubbleChartData[] {
    const series = data.map((post) => ({
      name: post.title, // El tooltip mostrará el título
      x: post.likes,
      y: post.comments,
      r: 1, // Radio fijo para todos los puntos
    }));

    // El gráfico necesita un array que contenga un objeto con la serie de datos
    return [
      {
        name: 'Publicaciones',
        series: series,
      },
    ];
  }
}

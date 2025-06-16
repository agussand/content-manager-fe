import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../../shared/models/post.model';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';
import { PostService } from '../../shared/services/post/post.service';
import { PaginatedResponse } from '../../shared/models/paginado';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostCardComponent } from '../../shared/components/post-card/post-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, PostCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private postService = inject(PostService);

  posts: Post[] = []; // Array para acumular todos los posts
  currentPage: number = 0; // Para saber qué página solicitar
  totalPages: number = 1; // Para saber si hay más páginas
  isLoading: boolean = false; // Para mostrar un spinner y evitar clics duplicados

  ngOnInit(): void {
    this.loadMore();
  }

  loadMore(): void {
    // 1. Evitar múltiples llamadas si ya hay una en curso
    if (this.isLoading) {
      return;
    }

    // 2. Prevenir llamadas si ya hemos llegado al final
    if (this.currentPage >= this.totalPages) {
      return;
    }

    // 3. Marcar como "cargando"
    this.isLoading = true;

    // 4. Llamar al servicio para obtener la página siguiente
    this.postService.getPosts(this.currentPage).subscribe({
      next: (response) => {
        // 5. Añadir los nuevos posts al array existente usando el spread operator (...)
        // Esto crea un nuevo array inmutable, que es una buena práctica en Angular.
        this.posts = [...this.posts, ...response.content];

        // 6. Actualizar el estado de la paginación
        this.currentPage++; // Incrementamos para la próxima llamada
        this.totalPages = response.totalPages;

        // 7. Marcar como "carga finalizada"
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar los posts:', err);
        // Asegurarse de quitar el estado de carga incluso si hay un error
        this.isLoading = false;
      },
    });
  }
}

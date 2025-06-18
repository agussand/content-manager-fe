import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user/user.service';
import { CommonModule, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, KeyValuePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  public user$!: Observable<User | null>;
  public error: string | null = null;

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.user$ = this.userService.getUserById(userId).pipe(
        catchError((err) => {
          this.error = 'No se pudo encontrar el perfil del usuario.';
          return of(null);
        })
      );
    }
  }
}

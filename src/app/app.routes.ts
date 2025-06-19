import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PostComponent } from './components/post/post.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Inicio' },
  {
    path: 'user/:id',
    component: UserProfileComponent,
    title: 'Perfil de Usuario',
  },
  {
    path: 'post/:id',
    component: PostComponent,
    title: 'Detalles del Post',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
  },
];

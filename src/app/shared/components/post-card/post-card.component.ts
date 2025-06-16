import { Component, Input } from '@angular/core';
import { Post } from '../../models/post.model';
import { FriendlyDatePipe } from '../../pipes/friendly-date.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [FriendlyDatePipe, RouterModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  @Input({ required: true })
  post!: Post;
}

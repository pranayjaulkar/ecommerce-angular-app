import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { SearchResult, Show } from 'streaming-availability';
import { ShowComponent } from '../components/show/show.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ShowComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomePage {
  shows: Show[] = [];
  constructor(private apiService: ApiService) {
    apiService
      .getShows()
      .then((shows: SearchResult) => (this.shows = shows.shows));
  }
}

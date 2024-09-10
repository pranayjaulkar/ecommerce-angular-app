import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Show } from 'streaming-availability';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
})
export class ShowPage implements OnInit {
  public show!: Show;
  public showSkeleton: boolean = true;
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.apiService.getShow(id || '').then((show) => {
      this.show = show;
      this.showSkeleton = false;
    });
  }
}

import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Show } from 'streaming-availability';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
})
export class ShowComponent {
  @Input() show!: Show;
}

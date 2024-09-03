import { Component, Input } from '@angular/core';
import { Show } from 'streaming-availability';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
})
export class ShowComponent {
  @Input() show!: Show;
}

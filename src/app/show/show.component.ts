import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Country, Show } from 'streaming-availability';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
})
export class ShowPage implements OnInit {
  public show!: Show;
  public isLoading: boolean = true;
  public recommendedShows!: Show[];
  public countries!: Map<string, string>;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  counter(count: number) {
    return new Array(count);
  }

  getGenres() {
    return this.show.genres.map((gn) => gn.name).join(' / ');
  }

  async getAvailableCountries() {
    const countries = await this.apiService.getCountries();
    const countriesMap = new Map(
      Object.keys(this.show.streamingOptions).map((country) => [country, ''])
    );

    for (let country of Object.keys(countries)) {
      if (countriesMap.has(country)) {
        countriesMap.set(country, countries[country].name);
      }
    }
    this.countries = countriesMap;
  }

  async getRecommendedShows() {
    try {
      const data = await this.apiService.getShows({
        country: 'gb',
        showType: this.show.showType,
        genres: this.show.genres.map((g) => g.name),
        ratingMin: 5,
      });
      this.recommendedShows = data.shows;
    } catch (error) {
      alert('Something went wrong');
      this.isLoading = false;
      console.log(error);
    }
  }

  async getShow() {
    try {
      const id = this.route.snapshot.paramMap.get('id');
      const show = await this.apiService.getShow(id || '');
      this.show = show;
      this.isLoading = false;
      this.getRecommendedShows();
      this.getAvailableCountries();
    } catch (error) {
      alert('Something went wrong');
      this.isLoading = false;
      console.log(error);
    }
  }

  ngOnInit(): void {
    this.getShow();
  }
}

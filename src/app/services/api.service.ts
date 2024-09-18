import { Injectable } from '@angular/core';
import * as streamingAvailability from 'streaming-availability';
import { environment } from '../../environments/environment';
import {
  SearchResult,
  SearchShowsByFiltersRequest,
} from 'streaming-availability';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private streamingAvailability: streamingAvailability.Client;

  constructor() {
    this.streamingAvailability = new streamingAvailability.Client(
      new streamingAvailability.Configuration({ apiKey: environment.apiKey })
    );
  }

  getShow(id: string) {
    return this.streamingAvailability.showsApi.getShow({ id });
  }

  getShows({
    country,
    showType,
    genres,
    ratingMin,
    ratingMax,
  }: Omit<SearchShowsByFiltersRequest, 'country'> & {
    country?: string;
  } = {}): Promise<SearchResult> {
    return this.streamingAvailability.showsApi.searchShowsByFilters({
      country: country || 'gb',
      ratingMin: ratingMin || 80,
      ratingMax: ratingMax,
      genres,
      showType,
    });
  }

  getCountries() {
    return this.streamingAvailability.countriesApi.getCountries();
  }
}

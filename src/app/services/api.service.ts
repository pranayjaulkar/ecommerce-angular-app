import { Injectable } from '@angular/core';
import * as streamingAvailability from 'streaming-availability';
import { environment } from '../../environments/environment';

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

  getShows(): Promise<streamingAvailability.SearchResult> {
    return this.streamingAvailability.showsApi.searchShowsByFilters({
      country: 'in',
      catalogs: ['netflix'],
    });
  }
}

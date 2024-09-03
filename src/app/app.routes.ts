import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShowPageComponent } from './show-page/show-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'show', component: ShowPageComponent },
];

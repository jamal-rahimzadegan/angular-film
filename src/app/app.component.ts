import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './core/services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  providers: [ApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'film-test';

  constructor(private apiService: ApiService) {}

  fetchData() {
    this.apiService.get<any>('/posts').subscribe({
      // this.apiService.get<any>('&t=Inception').subscribe({
      next: (data) => console.log('Data:', data),
      error: (err) => console.error('Error:', err),
    });
  }
}

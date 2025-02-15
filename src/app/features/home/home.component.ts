import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule],
  providers: [ApiService],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  isLoadingPosts = false;
  subscription: Subscription = new Subscription();

  constructor(private apiService: ApiService) {}

  getPosts() {
    this.isLoadingPosts = true;
    this.apiService.get<any>('/posts').subscribe({
      next: (data) => {
        this.isLoadingPosts = false;
        console.log('Data:', data);
      },
      error: (err) => {
        this.isLoadingPosts = false;
        console.error('Error:', err);
      },
    });
  }

  getTodos() {
    this.apiService.get<any>('/todos').subscribe({
      next: (data) => console.log('Data:', data),
      error: (err) => console.error('Error:', err),
    });
  }
}

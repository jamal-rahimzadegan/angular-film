import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';
  private loadingSubject = new Subject<boolean>();
  loadingPosts = this.loadingSubject.asObservable();

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API error:', error);
    return throwError(() => new Error(error.message));
  }

  get<T>(endpoint: string, params?: any): Observable<T> {
    this.loadingSubject.next(true);
    return this.http
      .get<T>(`${this.baseUrl}${endpoint}`, {
        headers: this.getHeaders(),
        params,
      })
      .pipe(
        tap(() => this.loadingSubject.next(false)),
        catchError((error) => {
          this.loadingSubject.next(false);
          return this.handleError(error);
        })
      );
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}/${endpoint}`, body, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}/${endpoint}`, body, {
        headers: this.getHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}/${endpoint}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
}

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new Subject<boolean>();
  loading$ = this.loadingSubject.asObservable();

  startLoading() {
    this.loadingSubject.next(true);
  }

  stopLoading() {
    this.loadingSubject.next(false);
  }
}

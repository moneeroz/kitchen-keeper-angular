import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iuser } from '../interfaces/iuser';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL: string = 'http://localhost:2828/api';

  constructor(private http: HttpClient) {}

  recoverLoginDetails(email: string): Observable<void> {
    return new Observable<void>((observer) => {
      setTimeout(() => {
        if (email == 'error@error.com') {
          observer.error('Email not found');
        }
        observer.next();
        observer.complete();
      }, 2500);
    });
  }
  login(email: string, password: string): Observable<Iuser> {
    return new Observable<Iuser>((observer) => {
      this.http
        .post<Iuser>(this.apiURL + '/login', { email, password })
        .subscribe({
          next: (user) => {
            observer.next(user);
            observer.complete();
          },
          error: (error) => {
            observer.error(error.error);
            observer.complete();
          },
        });
    });
  }

  register(userData: Iuser): Observable<void> {
    return new Observable<void>((observer) => {
      this.http.post<Iuser>(this.apiURL + '/register', userData).subscribe({
        next: () => {
          observer.next();
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
          observer.complete();
        },
      });
    });
  }
}

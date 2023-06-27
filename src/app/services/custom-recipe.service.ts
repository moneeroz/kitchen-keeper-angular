import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomRecipeService {
  constructor(private http: HttpClient) {}

  private apiURL: string = 'http://localhost:5050/create-recipe';

  createRecipe(prompt: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.http.post(this.apiURL, { prompt }).subscribe({
        next: (recipe) => {
          observer.next(recipe);
          observer.complete();
        },
        error: (error) => {
          observer.error(error.error);
          observer.complete();
        },
      });
    });
  }
}

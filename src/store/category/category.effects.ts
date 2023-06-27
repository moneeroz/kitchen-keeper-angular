import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { CategoryActions } from './category.actions';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private recipeService: RecipeService,
  ) {}

  getCartItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.getRecipesByCategoryRequest),
      exhaustMap(({ category }) => {
        return this.recipeService.getRecipesByCategory(category).pipe(
          map((items) =>
            CategoryActions.getRecipesByCategorySuccess({ items: items }),
          ),
          catchError((error) =>
            of(CategoryActions.getRecipesByCategoryFailure({ error })),
          ),
        );
      }),
    );
  });
}

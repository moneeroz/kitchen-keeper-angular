import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { selectUser } from '../auth/auth.selectors';
import { IappState } from '../iapp-state';
import { FavouriteService } from 'src/app/services/favourite.service';
import { FavouriteApiActions } from './favourites.actions';
import { ToastrService } from 'ngx-toastr';
// import { ToastService } from 'src/app/services/toast.service';

@Injectable()
export class FavouritesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IappState>,
    private favouritesService: FavouriteService,
    private toastr: ToastrService,
  ) {}

  getFavouriteItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavouriteApiActions.getFavouritesRequest),
      concatLatestFrom(() => this.store.select(selectUser)),
      exhaustMap(([action, user]) => {
        const userId = user?.id ?? '';
        return this.favouritesService.getFavourites(userId).pipe(
          map((items) =>
            FavouriteApiActions.getFavouritesSuccess({ items: items }),
          ),
          catchError((error) =>
            of(FavouriteApiActions.getFavouriteFailure({ error })).pipe(
              tap(async () =>
                this.toastr.error('Failed to load items!', '', {
                  timeOut: 3000,
                }),
              ),
            ),
          ),
        );
      }),
    );
  });

  addToFavourites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavouriteApiActions.addToFavouritesRequest),
      concatLatestFrom(() => this.store.select(selectUser)),
      exhaustMap(([action, user]) => {
        const userId = user?.id ?? '';
        return this.favouritesService
          .addToFavourites(userId, action.recipeId)
          .pipe(
            map((item) =>
              FavouriteApiActions.addToFavouritesSuccess({ recipe: item }),
            ),
            tap(async () =>
              this.toastr.success('Added to Favourites!', '', {
                timeOut: 3000,
              }),
            ),
            catchError((error) => {
              return of(
                FavouriteApiActions.addToFavouritesFailure({ error }),
              ).pipe(
                tap(async () => {
                  this.toastr.error('Recipe already in favourites!', '', {
                    timeOut: 3000,
                  });
                }),
              );
            }),
          );
      }),
    );
  });

  removeFromFavourites = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavouriteApiActions.removeFromFavouritesRequest),
      concatLatestFrom(() => this.store.select(selectUser)),
      exhaustMap(([action, user]) => {
        const userId = user?.id ?? '';
        return this.favouritesService
          .deleteFromFavourites(userId, action.recipeId)
          .pipe(
            map(() => FavouriteApiActions.removeFromFavouritesSuccess()),
            tap(async () =>
              this.toastr.warning('Removed from favourites!', '', {
                timeOut: 3000,
              }),
            ),
            catchError((error) =>
              of(
                FavouriteApiActions.removeFromFavouritesFailure({ error }),
              ).pipe(
                tap(async () => {
                  this.toastr.error('Failed to remove from favourites!', '', {
                    timeOut: 3000,
                  });
                }),
              ),
            ),
          );
      }),
    );
  });
}

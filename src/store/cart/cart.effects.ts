import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CartService } from 'src/app/services/cart.service';
import { CartApiActions } from './cart.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { selectUser } from '../auth/auth.selectors';
import { IappState } from '../iapp-state';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IappState>,
    private cartService: CartService,
    private toastr: ToastrService,
  ) {}

  getCartItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartApiActions.getCartRequest),
      concatLatestFrom(() => this.store.select(selectUser)),
      exhaustMap(([action, user]) => {
        const userId = user?.id ?? '';
        return this.cartService.getCartItems(userId).pipe(
          map((items) => CartApiActions.getCartSuccess({ items: items })),

          catchError((error) =>
            of(CartApiActions.getCartFailure({ error })).pipe(
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

  addToCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartApiActions.addToCartRequest),
      concatLatestFrom(() => this.store.select(selectUser)),
      exhaustMap(([action, user]) => {
        const userId = user?.id ?? '';
        return this.cartService.addToCart(userId, action.recipeId).pipe(
          map((item) => CartApiActions.addToCartSuccess({ recipe: item })),
          tap(async () =>
            this.toastr.success('Added to shopping list!', '', {
              timeOut: 3000,
            }),
          ),
          catchError((error) =>
            of(CartApiActions.addToCartFailure({ error })).pipe(
              tap(async () => {
                this.toastr.error('Recipe already in list!', '', {
                  timeOut: 3000,
                });
              }),
            ),
          ),
        );
      }),
    );
  });

  removeFromCart = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartApiActions.removeFromCartRequest),
      concatLatestFrom(() => this.store.select(selectUser)),
      exhaustMap(([action, user]) => {
        const userId = user?.id ?? '';
        return this.cartService.deleteFromCart(userId, action.recipeId).pipe(
          map(() => CartApiActions.removeFromCartSuccess()),
          tap(async () =>
            this.toastr.success('Recipe removed from list!', '', {
              timeOut: 3000,
            }),
          ),
          catchError((error) =>
            of(CartApiActions.removeFromCartFailure({ error })).pipe(
              tap(async (error) =>
                this.toastr.error(error.error, '', {
                  timeOut: 3000,
                }),
              ),
            ),
          ),
        );
      }),
    );
  });

  emptyCart = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartApiActions.emptyCartRequest),
      concatLatestFrom(() => this.store.select(selectUser)),
      exhaustMap(([action, user]) => {
        const userId = user?.id ?? '';
        return this.cartService.clearCart(userId).pipe(
          map(() => CartApiActions.emptyCartSuccess()),
          tap(async () =>
            this.toastr.success('Shopping list is now empty!', '', {
              timeOut: 3000,
            }),
          ),
          catchError((error) => {
            return of(CartApiActions.emptyCartFailure({ error }));
          }),
        );
      }),
    );
  });
}

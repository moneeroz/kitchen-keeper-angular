import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
// import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { selectUser } from './auth.selectors';
import { Store } from '@ngrx/store';
import { IappState } from '../iapp-state';
// import { ToastController } from '@ionic/angular';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((action) =>
        this.userService
          .login(action.credentials.email, action.credentials.password)
          .pipe(
            map((user) => AuthActions.loginSuccess({ user: user })),
            catchError((error) => of(AuthActions.loginFailure({ error }))),
          ),
      ),
    );
  });

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        switchMap(async (action) =>
          this.toastr.success(`Logged in as ${action.user.username}!`, '', {
            timeOut: 3000,
          }),
        ),
        tap(() => this.router.navigateByUrl('recipes')),
      );
    },
    { dispatch: false },
  );

  logoutSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => localStorage.removeItem('currentUser')),
        switchMap(async () => {
          this.toastr.success(`Logged out successfully!`, '', {
            timeOut: 2500,
          });
        }),
        tap(() => this.router.navigateByUrl('recipes')),
      );
    },
    { dispatch: false },
  );

  recoverPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.recoverPassword),
      exhaustMap((action: { email: string }) =>
        this.userService.recoverLoginDetails(action.email).pipe(
          map(() => AuthActions.recoverPasswordSuccess()),
          tap(async () =>
            this.toastr.success(`Recovery email sent!`, '', {
              timeOut: 3000,
            }),
          ),
          catchError((error) =>
            of(AuthActions.recoverPasswordFailure({ error })).pipe(
              tap(async () => {
                this.toastr.error(`Email does not exist!`, '', {
                  timeOut: 2500,
                });
              }),
            ),
          ),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private store: Store<IappState>, // private toastController: ToastController,
  ) {}
}

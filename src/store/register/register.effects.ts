import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, of } from 'rxjs';
import { RegisterActions } from './register.actions';
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class RegisterEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegisterActions.registerRequest),
      exhaustMap((action) =>
        this.userService.register(action.credentials).pipe(
          map(() => RegisterActions.registerSuccess()),
          catchError((error) => of(RegisterActions.registerFailure({ error }))),
        ),
      ),
    );
  });
}

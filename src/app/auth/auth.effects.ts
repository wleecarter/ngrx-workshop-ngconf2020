import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthApiActions, AuthUserActions } from "./actions";
import { catchError, concatMap, exhaustMap, map, tap } from "rxjs/operators";

import { AuthService } from "../shared/services/auth.service";
import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable()
export class AuthEffects {
  constructor(private authService: AuthService, private actions$: Actions) {}

  getAuthStatus$ = createEffect(() =>
    this.authService
      .getStatus()
      .pipe(
        map((userOrNull) => AuthApiActions.getAuthStatusSuccess(userOrNull))
      )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthUserActions.login),
      concatMap((action) => {
        return this.authService.login(action.username, action.password).pipe(
          map((user) => AuthApiActions.loginSuccess(user)),
          catchError((reason) => of(AuthApiActions.loginFailure(reason)))
        );
      })
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthUserActions.logout),
        tap(() => this.authService.logout())
      ),
    { dispatch: false }
  );
}

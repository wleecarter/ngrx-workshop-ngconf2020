import {
  State,
  selectAuthError,
  selectAuthUser,
  selectGettingAuthStatus,
} from "src/app/shared/state";

import { AuthUserActions } from "../../actions";
import { Component } from "@angular/core";
import { LoginEvent } from "../login-form";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { UserModel } from "src/app/shared/models";
import { selectError } from "src/app/shared/state/auth.reducer";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent {
  gettingStatus$: Observable<boolean>;
  user$: Observable<UserModel | null>;
  error$: Observable<string | null>;

  constructor(private store: Store<State>) {}

  onLogin($event: LoginEvent) {
    this.store.dispatch(
      AuthUserActions.login($event.username, $event.password)
    );
    this.gettingStatus$ = this.store.select(selectGettingAuthStatus);
    this.user$ = this.store.select(selectAuthUser);
    this.error$ = this.store.select(selectAuthError);
  }
}

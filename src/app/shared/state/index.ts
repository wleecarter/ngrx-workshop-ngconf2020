import * as fromAuth from "./auth.reducer";
import * as fromBooks from "./books.reducer";

import { ActionReducerMap, MetaReducer, createSelector } from "@ngrx/store";

export interface State {
  books: fromBooks.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  books: fromBooks.reducer,
  auth: fromAuth.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];

/**
 * Books Selectors
 */
export const selectBooksState = (state: State) => state.books;
export const selectAllBooks = createSelector(
  selectBooksState,
  fromBooks.selectAll
);
export const selectActiveBook = createSelector(
  selectBooksState,
  fromBooks.selectActiveBook
);
export const selectBooksEarningsTotals = createSelector(
  selectBooksState,
  fromBooks.selectEarningsTotals
);

/**
 * Auth Selectors
 */
export const selectAuthState = (state: State) => state.auth;
export const selectGettingAuthStatus = createSelector(
  selectAuthState,
  fromAuth.selectGettingStatus
);
export const selectAuthUser = createSelector(
  selectAuthState,
  fromAuth.selectUser
);
export const selectAuthError = createSelector(
  selectAuthState,
  fromAuth.selectError
);

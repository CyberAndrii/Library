import {createSelector, createFeatureSelector} from '@ngrx/store';
import {BookState} from './book.reducer';
import {BookRootState} from './book-root.state';

const selectBooksRoot = (state: BookRootState) => state.book;

export const selectBooks = createSelector(
  selectBooksRoot,
  (state: BookState) => state.books,
);

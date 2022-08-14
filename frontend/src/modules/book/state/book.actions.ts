import {createAction, props} from '@ngrx/store';
import {Book} from '../models/book.model';
import {BooksOrderBy} from '../models/books-order-by.model';

export const getBooks = createAction(
  '[Book] Get Books',
  props<{ orderBy: BooksOrderBy }>()
);

export const getBooksSuccess = createAction(
  '[Book] Get Books Success',
  props<{ books: Book[] }>()
);

export const getBooksFailure = createAction(
  '[Book] Get Books Failure',
  props<{ error: string }>()
);

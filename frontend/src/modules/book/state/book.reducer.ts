import {createReducer, on} from '@ngrx/store';
import {Book} from '../models/book.model';
import {BooksOrderBy} from '../models/books-order-by.model';
import {getBooks, getBooksSuccess, getBooksFailure} from './book.actions';

export interface BookState {
  books: Book[];
  orderBy: BooksOrderBy,
  error: string | null;
  status: 'pending' | 'loading' | 'success' | 'error';
}

export const initialState: BookState = {
  books: [],
  orderBy: BooksOrderBy.Title,
  error: null,
  status: 'pending',
}

export const bookReducer = createReducer(
  initialState,
  on(getBooks, state => ({
    ...state,
    error: null,
    status: 'loading',
  })),
  on(getBooksSuccess, (state, {books}) => ({
    ...state,
    books: books,
    error: null,
    status: 'success',
  })),
  on(getBooksFailure, (state, {error}) => ({
    ...state,
    books: [],
    error: error,
    status: 'error',
  })),
);

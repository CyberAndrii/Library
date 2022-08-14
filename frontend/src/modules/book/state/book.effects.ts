import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {getBooks, getBooksSuccess, getBooksFailure} from './book.actions';
import {BooksService} from '../services/books.service';
import {of, from} from 'rxjs';
import {switchMap, map, catchError, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {selectBooks} from './book.selectors';
import {BookRootState} from './book-root.state';

@Injectable()
export class BookEffects {

  constructor(
    private actions$: Actions,
    private store: Store<BookRootState>,
    private booksService: BooksService
  ) {
  }

  getBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getBooks),
      switchMap((action) =>
        from(this.booksService.getBooks(action.orderBy)).pipe(
          map((books) => getBooksSuccess({books: books})),
          catchError((error) => of(getBooksFailure({error})))
        )
      )
    )
  );

}

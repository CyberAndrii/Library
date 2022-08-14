import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';

import {bookReducer} from './state/book.reducer';
import {environment} from '../../environments/environment';
import {BookEffects} from './state/book.effects';

import {AddBookCardComponent} from './components/add-book-card/add-book-card.component';
import {BookListComponent} from './components/book-list/book-list.component';
import {BookListItemComponent} from './components/book-list-item/book-list-item.component';
import {BooksPageComponent} from './pages/books-page/books-page.component';
import {BookDetailsModalComponent} from './components/book-details-modal/book-details-modal.component';

@NgModule({
  declarations: [
    AddBookCardComponent,
    BookListComponent,
    BookListItemComponent,
    BooksPageComponent,
    BookDetailsModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    StoreModule.forRoot({book: bookReducer}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([BookEffects]),
  ],
  exports: [
    AddBookCardComponent,
    BookListComponent,
    BookListItemComponent,
    BooksPageComponent,
  ],
  providers: [
    BrowserModule,
    NgbModule,
  ],
})
export class BookModule {
}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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

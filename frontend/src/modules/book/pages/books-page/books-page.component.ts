import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {GetBooksResponse} from '../../dto/responses/get-books-response';
import {GetRecommendedBooksResponse} from '../../dto/responses/get-recommended-books-response';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'books-page',
  templateUrl: './books-page.component.html',
})
export class BooksPageComponent {

  activeTab = 0;
  books: Observable<GetBooksResponse[]>;
  recommendedBooks: Observable<GetRecommendedBooksResponse[]>;
  genreToSearch: string = '';

  constructor(private booksService: BooksService) {
    this.books = booksService.getBooks();
    this.recommendedBooks = booksService.getRecommendedBooks();
  }

  search() {
    this.recommendedBooks = this.booksService.getRecommendedBooks(this.genreToSearch);
  }

}

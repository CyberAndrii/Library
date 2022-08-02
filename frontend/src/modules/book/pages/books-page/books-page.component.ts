import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {GetBooksResponse} from '../../dto/responses/get-books-response';
import {GetRecommendedBooksResponse} from '../../dto/responses/get-recommended-books-response';
import {BooksOrderBy} from '../../models/books-order-by.model';
import {BooksService} from '../../services/books.service';
import {BookDetailsModalComponent} from '../../components/book-details-modal/book-details-modal.component';

@Component({
  selector: 'books-page',
  templateUrl: './books-page.component.html',
})
export class BooksPageComponent {

  activeTab = 0;
  genreToSearch: string = '';
  orderBy: BooksOrderBy = BooksOrderBy.Title;

  books: Observable<GetBooksResponse[]>;
  recommendedBooks: Observable<GetRecommendedBooksResponse[]>;

  constructor(private readonly booksService: BooksService,
              private readonly modalService: NgbModal) {
    this.books = booksService.getBooks();
    this.recommendedBooks = booksService.getRecommendedBooks();
  }

  reloadBooks() {
    this.books = this.booksService.getBooks(this.orderBy);
    this.recommendedBooks = this.booksService.getRecommendedBooks(this.genreToSearch);
  }

  openModal(id: number) {
    const modalRef = this.modalService.open(BookDetailsModalComponent, {size: 'xl'});
    modalRef.componentInstance.id = id;
  }

}

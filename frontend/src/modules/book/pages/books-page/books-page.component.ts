import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {GetBooksResponse} from '../../dto/responses/get-books-response';
import {GetRecommendedBooksResponse} from '../../dto/responses/get-recommended-books-response';
import {BooksOrderBy} from '../../models/books-order-by.model';
import {BooksService} from '../../services/books.service';
import {BookDetailsModalComponent} from '../../components/book-details-modal/book-details-modal.component';
import {Store} from '@ngrx/store';
import {getBooks} from '../../state/book.actions';
import {selectBooks} from '../../state/book.selectors';
import {BookRootState} from '../../state/book-root.state';

@Component({
  selector: 'books-page',
  templateUrl: './books-page.component.html',
})
export class BooksPageComponent implements OnInit {

  activeTab = 0;
  genreToSearch = '';
  orderBy: BooksOrderBy = BooksOrderBy.Title;

  books$ = this.store.select(selectBooks);
  recommendedBooks$: Observable<GetRecommendedBooksResponse[]>;

  constructor(private readonly store: Store<BookRootState>,
              private readonly booksService: BooksService,
              private readonly modalService: NgbModal) {

    this.recommendedBooks$ = this.booksService.getRecommendedBooks(this.genreToSearch);
  }

  ngOnInit() {
    this.reloadBooks();
  }

  reloadBooks() {
    this.store.dispatch(getBooks({orderBy: this.orderBy}));
    this.recommendedBooks$ = this.booksService.getRecommendedBooks(this.genreToSearch);
  }

  openModal(id: number) {
    const modalRef = this.modalService.open(BookDetailsModalComponent, {size: 'xl'});
    modalRef.componentInstance.id = id;
  }

}

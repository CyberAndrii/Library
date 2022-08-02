import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AbstractControlDirective} from "@angular/forms";
import {BooksService} from '../../services/books.service';
import {SaveBookRequest} from '../../dto/requests/save-book-request';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {GetBookWithReviewsResponse} from '../../dto/responses/get-book-with-reviews-response';

@Component({
  selector: 'book-details-modal[id]',
  templateUrl: './book-details-modal.component.html',
})
export class BookDetailsModalComponent implements OnInit {

  @Input() readonly id: number = 0;

  book: GetBookWithReviewsResponse | undefined;

  constructor(private readonly booksService: BooksService,
              public readonly activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.booksService.getBookWithReviews(this.id)
      .toPromise()
      .then(book => this.book = book);
  }

}

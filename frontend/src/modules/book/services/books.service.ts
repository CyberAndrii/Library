import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {SaveBookRequest} from '../dto/requests/save-book-request';
import {GetBooksResponse} from '../dto/responses/get-books-response';
import {GetRecommendedBooksResponse} from '../dto/responses/get-recommended-books-response';
import {GetBookWithReviewsResponse} from '../dto/responses/get-book-with-reviews-response';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private baseUrl = 'https://localhost:7086/';

  constructor(private httpClient: HttpClient) {
  }

  saveBook(book: SaveBookRequest): Observable<Object> {
    return this.httpClient.post(this.baseUrl + 'api/books/save', book);
  }

  getBooks(): Observable<GetBooksResponse[]> {
    return this.httpClient.get<GetBooksResponse[]>(this.baseUrl + 'api/books');
  }

  getRecommendedBooks(): Observable<GetRecommendedBooksResponse[]> {
    return this.httpClient.get<GetRecommendedBooksResponse[]>(this.baseUrl + 'api/recommended');
  }

  getBookWithReviews(id: number): Observable<GetBookWithReviewsResponse> {
    return this.httpClient.get<GetBookWithReviewsResponse>(this.baseUrl + 'api/books/' + id);
  }

}

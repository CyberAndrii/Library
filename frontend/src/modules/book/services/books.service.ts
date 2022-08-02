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
    let url = this.baseUrl + 'api/books/save';
    return this.httpClient.post(url, book);
  }

  getBooks(): Observable<GetBooksResponse[]> {
    let url = this.baseUrl + 'api/books';
    return this.httpClient.get<GetBooksResponse[]>(url);
  }

  getRecommendedBooks(genre: string = ''): Observable<GetRecommendedBooksResponse[]> {
    let url = this.baseUrl + 'api/books/recommended?genre=' + genre;
    return this.httpClient.get<GetRecommendedBooksResponse[]>(url);
  }

  getBookWithReviews(id: number): Observable<GetBookWithReviewsResponse> {
    let url = this.baseUrl + 'api/books/' + id;
    return this.httpClient.get<GetBookWithReviewsResponse>(url);
  }

}

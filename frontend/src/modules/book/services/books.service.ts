import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {SaveBookRequest} from '../dto/requests/save-book-request';
import {GetBooksResponse} from '../dto/responses/get-books-response';
import {GetRecommendedBooksResponse} from '../dto/responses/get-recommended-books-response';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private baseUrl = 'https://localhost:7086/';

  constructor(private httpClient: HttpClient) {
  }

  saveBook(book: SaveBookRequest): void {
    this.httpClient.post(this.baseUrl + 'api/books/save', book)
      .subscribe();
  }

  getBooks(): Observable<GetBooksResponse[]> {
    return this.httpClient.get<GetBooksResponse[]>(this.baseUrl + 'api/books');
  }

  getRecommendedBooks(): Observable<GetRecommendedBooksResponse[]> {
    return this.httpClient.get<GetRecommendedBooksResponse[]>(this.baseUrl + 'api/recommended');
  }

}

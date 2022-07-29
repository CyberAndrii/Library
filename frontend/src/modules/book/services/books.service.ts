import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SaveBookRequest} from '../dto/requests/save-book-request';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private baseUrl = 'https://localhost:7086/';

  constructor(private httpClient: HttpClient) {
  }

  saveBook(book: SaveBookRequest) {
    return this.httpClient.post(this.baseUrl + 'api/books/save', book)
      .subscribe(value => console.log(value));
  }

}
